<?php

namespace App\Http\Controllers\API\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\Cart;
use App\Models\User;
use App\Models\Product;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function payment(Request $request)
{
    try {
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['EM' => 'Unauthorized: Token không được cung cấp', 'EC' => 1, 'DT' => ''], 401);
        }

        $token = str_replace('Bearer ', '', $authHeader);
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userId = $decoded->sub;
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['EM' => 'Unauthorized: Người dùng không hợp lệ', 'EC' => 1, 'DT' => ''], 401);
        }

        $myCart = Cart::with('product')->where('user_id', $user->id)->get();
        if ($myCart->isEmpty()) {
            return response()->json(['EM' => 'Giỏ hàng không có sản phẩm!', 'EC' => 1, 'DT' => ''], 200);
        }

        // Tính tổng giá trị giỏ hàng
        $total = $myCart->reduce(function ($carry, $item) {
            return $carry + ($item->quantity * $item->product->price);
        }, 0);

        $cartData = $myCart->map(function ($item) {
            return [
                'product_id' => $item->product->id,
                'product_name' => $item->product->name,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
                'total_price' => $item->quantity * $item->product->price,
            ];
        });

        return response()->json([
            'EM' => 'Lấy giỏ hàng thành công',
            'EC' => 0,
            'DT' => [
                'cart' => $cartData,
                'total' => $total // Trả về giá trị tổng
            ]
        ], 200);

    } catch (\Exception $e) {
        return response()->json(['EM' => 'Đã xảy ra lỗi trong quá trình xử lý', 'EC' => 1, 'DT' => $e->getMessage()], 500);
    }
}


public function processPayment(Request $request)
{
    try {
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['EM' => 'Unauthorized: Token không được cung cấp', 'EC' => 1, 'DT' => ''], 401);
        }
        $token = str_replace('Bearer ', '', $authHeader);
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userId = $decoded->sub;
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['EM' => 'Unauthorized: Người dùng không hợp lệ', 'EC' => 1, 'DT' => ''], 401);
        }

        $paymentMethod = $request->input('paymentMethod'); // phương thức thanh toán
        $price = $request->input('amount');

        // Lưu thông tin thanh toán vào session
        session([
            'payment_info' => [
                'name' => $request->input('name'),
                'phone' => $request->input('phone'),
                'address' => $request->input('address'),
                'note' => $request->input('note'),
            ],
        ]);

        // Lấy giỏ hàng của người dùng
        $myCart = Cart::where('user_id', $user->id)->get();

        if ($myCart->isEmpty()) {
            return response()->json([
                'EC' => -1,
                'EM' => 'Giỏ hàng không có sản phẩm!',
            ], 400);
        }

        // Xử lý phương thức thanh toán
       if ($paymentMethod === 'cod') {
            $order = app(CodPaymentController::class)->createOrder($request, $price, $userId);
            app(CodPaymentController::class)->processCart($userId, $order->id);
            return response()->json(['EC' => 0, 'EM' => 'Thanh toán thành công.'], 200);
        }    elseif ($paymentMethod === 'vnpay') {
            // $response = app(VNPayPaymentController::class)->createPayment($request, $price);
            $response = 'VNPAY method not implemented yet'; // Placeholder
        } elseif ($paymentMethod === 'momo') {
            // $response = app(MomoPaymentController::class)->createPayment($request, $price);
            $response = 'MOMO method not implemented yet'; // Placeholder
        } else {
            return response()->json([
                'EC' => -1,
                'EM' => 'Phương thức thanh toán không hợp lệ.',
            ], 400);
        }

        return response()->json([
            'EC' => 0,
            'EM' => 'Thanh toán thành công.',
            'data' => $response, // Trả về thông tin nếu cần thiết
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'EC' => -1,
            'EM' => 'Đã xảy ra lỗi trong quá trình xử lý.',
            'error' => $e->getMessage(),
        ], 500);
    }
}




    public function payment_done()
    {
        try {
            $products_best_seller = Product::where('instock', '>', 0)
                ->orderBy('sold', 'desc')
                ->limit(4)
                ->get();

            return response()->json(['EM' => 'Thanh toán thành công.', 'EC' => 0, 'DT' => $products_best_seller], 200);

        } catch (\Exception $e) {
            return response()->json(['EM' => 'Đã xảy ra lỗi khi lấy danh sách sản phẩm bán chạy.', 'EC' => 1, 'DT' => $e->getMessage()], 500);
        }
    }
}
