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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('province');  // Tỉnh/Thành phố
            $table->string('district');  // Quận/Huyện
            $table->string('ward');      // Xã/Phường
            $table->string('street');    // Số nhà, đường
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            // Mối quan hệ với bảng users
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
