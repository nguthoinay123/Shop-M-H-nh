<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->text('image')->nullable();
            $table->string('description')->nullable();
            $table->integer('price');
            $table->integer('instock')->default(0);
            $table->integer('sold')->default(0)->nullable();
            $table->enum('status',['unhide','hide'])->default('unhide');
            $table->unsignedBigInteger('category_id');
            $table->timestamps();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('restrict')->onUpdate('restrict');





        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
