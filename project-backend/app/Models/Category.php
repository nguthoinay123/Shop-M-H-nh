<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
        protected $fillable = ['name','slug', 'description', 'status', 'updated_at', 'created_at'];
    public function products()
        {
            return $this->hasMany(Product::class, 'category_id'); 
        }
    }
