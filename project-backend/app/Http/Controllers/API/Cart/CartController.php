<?php

namespace App\Http\Controllers\API\Cart;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use App\Models\Voucher;
use App\Models\VoucherHistory;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class CartController extends Controller
{
   

public function cart(Request $request)
{
    try {
        // Lấy token từ header Authorization
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json([
                'EM' => 'Unauthorized: Token không được cung cấp',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        $token = str_replace('Bearer ', '', $authHeader);

        // Giải mã token
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

        // Lấy thông tin user từ payload
        $userId = $decoded->sub;
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'EM' => 'Unauthorized: Người dùng không hợp lệ',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Lấy giỏ hàng của người dùng
        $myCart = Cart::where('user_id', $user->id)->get();

        if ($myCart->isEmpty()) {
            return response()->json([
                'EM' => 'Giỏ hàng trống',
                'EC' => 0,
                'DT' => [
                    'myCart' => $myCart,
                    'subTotal' => 0,
                    'total' => 0,
                ]
            ], 200);
        }

        foreach ($myCart as $item) {
            $product = $item->product;
            if ($product && $product->instock <= 0) {
                $item->quantity = 0;
            }
        }

        $subtotal = $myCart->sum(function ($item) {
            return $item->product ? $item->product->price * $item->quantity : 0;
        });

        $voucher = session('voucher', default: 0);
        $total = $this->total($subtotal, $voucher);

        return response()->json([
            'EM' => 'Giỏ hàng Success',
            'DT' => [
                'myCart' => $myCart,
                'subTotal' => $subtotal,
                'total' => $total,
            ],
            'EC' => 0
        ], 200);

    } catch (\Firebase\JWT\ExpiredException $e) {
        return response()->json([
            'EM' => 'Token đã hết hạn, vui lòng đăng nhập lại',
            'EC' => 1,
            'DT' => ''
        ], 401);
    } catch (\Throwable $th) {
        return response()->json([
            'EM' => 'Unauthorized: Token không hợp lệ',
            'EC' => 1,
            'DT' => ''
        ], 401);
    }
}

    public function total($subtotal, $voucher){
        if ($voucher != 0) {
                    $money = $subtotal * ($voucher / 100);
                    $total = $subtotal - $money;
                }else{
                    $total = $subtotal;
                }
                return $total;
    }
public function addToCart(Request $request)
{
    try {
        // Lấy token từ header Authorization
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json([
                'EM' => 'Unauthorized: Token không được cung cấp',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        $token = str_replace('Bearer ', '', $authHeader);

        // Giải mã token
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userId = $decoded->sub; // Lấy user_id từ token payload

        // Lấy thông tin sản phẩm và số lượng từ request
        $product_id = $request->input('product_id');
        $product_quantity = $request->input('quantity', 1);

        // Kiểm tra tính hợp lệ của product_id
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json([
                'EM' => 'Sản phẩm không tồn tại',
                'EC' => 1,
                'DT' => ''
            ], 404);
        }

        // Kiểm tra trạng thái tồn kho
        if ($product->instock <= 0) {
            return response()->json([
                'EM' => 'Sản phẩm đã hết hàng',
                'EC' => 1,
                'DT' => ''
            ], 400);
        }

        // Kiểm tra số lượng sản phẩm yêu cầu
        if ($product_quantity <= 0 || $product_quantity > $product->instock) {
            return response()->json([
                'EM' => 'Số lượng sản phẩm không hợp lệ',
                'EC' => 1,
                'DT' => ''
            ], 400);
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
        $cartItem = Cart::where('user_id', $userId)
                        ->where('product_id', $product_id)
                        ->first();

        if ($cartItem) {
            // Cập nhật số lượng nếu đã có trong giỏ hàng
            $newQuantity = $cartItem->quantity + $product_quantity;

            // Kiểm tra số lượng mới có vượt quá tồn kho hay không
            if ($newQuantity > $product->instock) {
                return response()->json([
                    'EM' => 'Số lượng sản phẩm vượt quá tồn kho',
                    'EC' => 1,
                    'DT' => ''
                ], 400);
            }

            $cartItem->quantity = $newQuantity;
            $cartItem->save();

            return response()->json([
                'EM' => 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công!',
                'EC' => 0,
                'DT' => $cartItem
            ], 200);
        } else {
            // Thêm sản phẩm mới vào giỏ hàng nếu chưa có
            $cartItem = Cart::create([
                'user_id' => $userId,
                'product_id' => $product_id,
                'quantity' => $product_quantity
            ]);

            return response()->json([
                'EM' => 'Thêm sản phẩm vào giỏ hàng thành công!',
                'EC' => 0,
                'DT' => $cartItem
            ], 200);
        }
    } catch (\Firebase\JWT\ExpiredException $e) {
        return response()->json([
            'EM' => 'Token đã hết hạn, vui lòng đăng nhập lại',
            'EC' => 1,
            'DT' => ''
        ], 401);
    } catch (\Throwable $th) {
        // Xử lý lỗi
        return response()->json([
            'EM' => 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng',
            'EC' => 1,
            'DT' => ''
        ], 500);
    }
}


  public function cartupdate(Request $request, $id)
{
    try {
        // Lấy token từ header Authorization
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json([
                'EM' => 'Unauthorized: Token không được cung cấp',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Lấy token và giải mã
        $token = str_replace('Bearer ', '', $authHeader);
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

        // Lấy thông tin user từ payload
        $userId = $decoded->sub;
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'EM' => 'Unauthorized: Người dùng không hợp lệ',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Tìm sản phẩm trong giỏ hàng của người dùng
        $cartItem = Cart::where('user_id', $user->id)
                        ->where('product_id', $id)
                        ->first();

        if ($cartItem) {
            $quantity = $request->input('quantity');
            if ($quantity > 0) {
                $cartItem->quantity = $quantity;
                $cartItem->save();
                return response()->json([
                    'EM' => 'Cập nhật số lượng thành công!',
                    'EC' => 0
                ], 200);
            } else {
                return response()->json([
                    'EM' => 'Số lượng sản phẩm phải lớn hơn 0!',
                    'EC' => 1
                ], 400);
            }
        }

        return response()->json([
            'EM' => 'Không tìm thấy sản phẩm trong giỏ hàng!',
            'EC' => 1
        ], 404);

    } catch (\Firebase\JWT\ExpiredException $e) {
        return response()->json([
            'EM' => 'Token đã hết hạn, vui lòng đăng nhập lại',
            'EC' => 1,
            'DT' => ''
        ], 401);
    } catch (\Throwable $th) {
        return response()->json([
            'EM' => 'Unauthorized: Token không hợp lệ',
            'EC' => 1,
            'DT' => ''
        ], 401);
    }
}

    public function removefromcart(Request $request, $id)
{
    try {
        // Lấy token từ header Authorization
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json([
                'EM' => 'Unauthorized: Token không được cung cấp',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Lấy token và giải mã
        $token = str_replace('Bearer ', '', $authHeader);
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

        // Lấy thông tin user từ payload
        $userId = $decoded->sub;
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'EM' => 'Unauthorized: Người dùng không hợp lệ',
                'EC' => 1,
                'DT' => ''
            ], 401);
        }

        // Tìm sản phẩm trong giỏ hàng của người dùng và xóa
        $cartItem = Cart::where('user_id', $user->id)
                        ->where('product_id', $id)
                        ->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json([
                'EM' => 'Sản phẩm đã được xóa khỏi giỏ hàng!',
                'EC' => 0
            ], 200);
        } else {
            return response()->json([
                'EM' => 'Không tìm thấy sản phẩm trong giỏ hàng!',
                'EC' => 1
            ], 404);
        }

    } catch (\Firebase\JWT\ExpiredException $e) {
        return response()->json([
            'EM' => 'Token đã hết hạn, vui lòng đăng nhập lại',
            'EC' => 1,
            'DT' => ''
        ], 401);
    } catch (\Throwable $th) {
        return response()->json([
            'EM' => 'Unauthorized: Token không hợp lệ',
            'EC' => 1,
            'DT' => ''
        ], 401);
    }
}

    // public function applyVoucher(Request $request)
    // {
    //     $voucherCode = $request->input('voucher');

    //     $voucher = Voucher::where('code', $voucherCode)
    //         ->where('start_date', '<=', now())
    //         ->where('end_date', '>=', now())
    //         ->first();
        
    //     if (!$voucher) {
    //         return redirect()->back()->with('error', 'Mã giảm giá không tồn tại hoặc đã hết hạn!');
    //     }
        
    //     $isUsed = VoucherHistory::where('user_id', Auth::id())
    //         ->where('voucher_id', $voucher->id)
    //         ->exists();
        
    //     if ($isUsed) {
    //         return redirect()->back()->with('error', 'Bạn đã hết lượt sử dụng mã giảm giá này!');
    //     }
        
    //     if ($voucher->quantity <= 0) {
    //         return redirect()->back()->with('error', 'Mã giảm giá đã hết lượt sử dụng!');
    //     }
        
    //     $subtotal = session('subtotal', 0);
        
    //     if ($subtotal < $voucher->condition) {
    //         return redirect()->back()->with('error', 'Đơn hàng không đủ điều kiện!');
    //     }
        
    //     session(['voucher' => $voucher->discount, 'voucher_code' => $voucher->code]);
    //      return response([
    //             'EM'=>'Áp dụng mã giảm giá thành công!',
    //             'EC'=>0,
    //             'DT'=>''
    //         ],200);
       
    // }
    // public function removeVoucher(){
    //         session()->forget('voucher');
    //         session()->forget('voucher_code');
    //         return response([
    //             'EM'=>'Đã hủy áp dụng mã giảm giá!',
    //             'EC'=>0,
    //             'DT'=>''
    //         ],200);
           
    // }
}
