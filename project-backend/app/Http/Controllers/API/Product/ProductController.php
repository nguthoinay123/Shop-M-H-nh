<?php

namespace App\Http\Controllers\API\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product; 
use App\Models\Category;
class ProductController extends Controller
{
    //
    public function products(){
        try{
            $productAll=Product::all();
            return response()->json(
            [
            'EM' => 'Get data product success',
            'DT' => $productAll,
            'EC' => 0
            ],200);
        }catch(\Throwable $th){

        }
       
    }
  public function getProductsByCategory(Request $request, $slug)
{
    try {
        $category = Category::where("slug", $slug)->firstOrFail();
        
        $products = Product::where("category_id", $category->id)
                           ->where('status', 'unhide')
                           ->get(); 
        
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found in this category.'], 404);
        }

        return response()->json([
            'EM' => 'Get products by category success',
            'DT' => $products,
            'EC' => 0
        ], 200);
        
   
    } catch (\Throwable $th) {
      
       
    }
}
public function product_detail($slug){
    $product = Product::where('slug', $slug)->where('status', 'unhide')->first();
    $related_products = Product::where('category_id', $product->category_id)
                                ->where('status', 'unhide')
                                ->where('id', '!=', $product->id)
                                ->limit(4)
                                ->get();
    if (!$product) {
        return response()->json([
            'EM' => 'Product not found or hidden',
            'EC' => 1,
            'DT' => null
        ], 404);
    }
    return response()->json([
        'EM' => 'Get product detail success',
        'EC' => 0,
        'DT' => [
            'PDT'=>$product,
            'RLP'=>$related_products,
        ]

    ], 200);
}

}
