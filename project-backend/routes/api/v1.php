<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Category\CategoryController;
use App\Http\Controllers\API\Product\ProductController;
use App\Http\Controllers\API\Cart\CartController;
use App\Http\Controllers\API\Payment\PaymentController;

use App\Http\Middleware\CheckLoginMiddleware;
use App\Http\Middleware\JwtAuthMiddleware;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
Route::get('products', [ProductController::class, 'products']);
Route::get('product/detail/{slug}', [ProductController::class, 'product_detail']);
Route::get('/category/{slug}', [ProductController::class, 'getProductsByCategory']);
Route::get('category', [CategoryController::class, 'category']);


// Route::prefix('cart')->group(function() {
//         Route::get('/', [CartController::class, 'cart']);
//         Route::post('/add', [CartController::class, 'addtocart']);
//         Route::patch('/update/{id}', [CartController::class, 'cartupdate']);
//         Route::delete('/remove/{id}', [CartController::class, 'removefromcart']);
//         Route::post('/apply-voucher', [CartController::class, 'applyVoucher']);
//         Route::post('/remove-voucher', [CartController::class, 'removeVoucher']);
//     });
Route::middleware([CheckLoginMiddleware::class])->group(function() {
  
     
});
Route::middleware([JwtAuthMiddleware::class])->group(function () {
      Route::prefix('user')->group(function() {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/update', [AuthController::class, 'updateprofile']);

    });
    Route::prefix('cart')->group(function() {
        Route::get('/', [CartController::class, 'cart']);
        Route::post('/add-to-cart', [CartController::class, 'addtocart']);
        Route::patch('/update/{id}', [CartController::class, 'cartupdate']);
        Route::delete('/remove/{id}', [CartController::class, 'removefromcart']);
    });
    Route::prefix('payment')->group(function() {
            Route::get('/', [PaymentController::class, 'payment']);
            Route::post('/process', [PaymentController::class, 'processPayment']);
            Route::get('/done', [PaymentController::class, 'payment_done']);
        });
});

