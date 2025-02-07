<?php
namespace App\Http\Controllers\API\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Address;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Str;

class CodPaymentController extends Controller
{
   // Order creation logic
public function createOrder(Request $request, $price, $userId)
{
    $orderCode = Str::upper('ORDER-' . time() . '-' . Str::random(6));
    $expectedDate = now()->addDays(3)->toDateString();
    
    $order = Order::create([
        'code' => $orderCode,
        'user_name' => $request->input('name'),
        'user_phone' => $request->input('phone'),
        'user_address' => $request->input('address'),
        'description' => $request->input('note'),
        'total_price' => $price,
        'status' => 'pending',
        'expected_date' => $expectedDate,
        'user_id' => $userId,
        'payment_method_id' => 1, // assuming COD is payment method 1
        'shipping_method_id' => 1,
    ]);
    
    return $order;
}

// Cart handling logic
public function processCart($userId, $orderId)
{
    $cartItems = Cart::where('user_id', $userId)->with('product')->get();
    foreach ($cartItems as $item) {
        OrderDetail::create([
            'quantity' => $item->quantity,
            'price' => $item->product->price,
            'product_id' => $item->product_id,
            'order_id' => $orderId,
        ]);

        $product = $item->product;
        $product->instock -= $item->quantity;
        $product->save();
    }

    // Clear cart
    Cart::where('user_id', $userId)->delete();
}
}