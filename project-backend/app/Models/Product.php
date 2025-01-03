<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
class Product extends Model
{
    use HasFactory;
    protected $fillable=['name', 'slug', 'image', 'description', 'price', 'instock', 'sold', 'status', 'category_id','updated_at', 'created_at'];
    public function category(){
        return $this->belongsTo(Category::class, 'category_id');
    }
}
