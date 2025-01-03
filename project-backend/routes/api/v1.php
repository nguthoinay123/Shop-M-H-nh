<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Category\CategoryController;
use App\Http\Controllers\API\Product\ProductController;
use App\Http\Middleware\CheckLoginMiddleware;
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
Route::get('/category/{slug}', [ProductController::class, 'getProductsByCategory']);
Route::get('category', [CategoryController::class, 'category']);

Route::middleware([CheckLoginMiddleware::class])->group(function() {
    Route::prefix('user')->group(function() {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});