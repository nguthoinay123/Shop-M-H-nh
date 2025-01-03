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
        // Tìm danh mục theo slug
        $category = Category::where("slug", $slug)->firstOrFail();
        
        // Lấy sản phẩm thuộc danh mục và có trạng thái 'unhide'
        $products = Product::where("category_id", $category->id)
                           ->where('status', 'unhide')
                           ->get(); // Phải gọi .get() để thực thi truy vấn
        
        // Kiểm tra nếu không có sản phẩm
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found in this category.'], 404);
        }

        // Trả về sản phẩm
        return response()->json([
            'EM' => 'Get products by category success',
            'DT' => $products,
            'EC' => 0
        ], 200);
        
   
    } catch (\Throwable $th) {
      
       
    }
}

}
