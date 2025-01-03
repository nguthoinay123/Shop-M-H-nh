<?php

namespace App\Http\Controllers\API\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function Category(){
        try{
            $category = Category::all();

        return response()->json([
            'EM'=>"Get data Category succses",
            'DT' => $category,
            'EC' => 0
        ],200);
        }catch(\Throwable $th){
            
        }
    }
        
}
