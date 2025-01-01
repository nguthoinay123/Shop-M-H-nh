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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('user_name');
            $table->string('user_phone');
            $table->unsignedBigInteger('address_id'); // Thêm cột address_id
            $table->string('description')->nullable();
            $table->integer('total_price');
            $table->enum('status', ['pending','shiping','success','cancle'])->default('pending');
            $table->date('expected_date');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('voucher_id')->nullable();
            $table->unsignedBigInteger('payment_method_id');
            $table->unsignedBigInteger('shipping_method_id');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign( 'address_id')->references('id')->on('addresses')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('voucher_id')->references('id')->on('vouchers')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('payment_method_id')->references('id')->on('payment_method')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('shipping_method_id')->references('id')->on('shipping_method')->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
