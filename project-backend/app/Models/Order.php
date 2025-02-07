<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'user_name',
        'user_phone',
        'user_address',
        'description',
        'total_price',
        'expected_date',
        'user_id',
        'voucher_id',
        'payment_method_id',
        'shipping_method_id'
    ];
    public function paymentMethod() {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }
    
    public function shippingMethod() {
        return $this->belongsTo(ShippingMethod::class, 'shipping_method_id');
    }

    public function voucher() {
        return $this->belongsTo(Voucher::class, 'voucher_id');
    }

    public function orderDetail(){
        return $this->hasMany(OrderDetail::class, 'order_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
