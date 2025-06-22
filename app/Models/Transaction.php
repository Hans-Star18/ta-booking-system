<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'reservation_id',
        'transaction_id',
        'redirect_url',
        'invoice_number',
        'payment_method',
        'payment_status',
        'payment_type',
        'subtotal',
        'discount',
        'tax_amount',
        'total_price',
        'pay_now',
        'balance_to_be_paid',
        'promotion_code',
    ];

    protected $casts = [
        'subtotal'           => 'float',
        'discount'           => 'float',
        'tax_amount'         => 'float',
        'total_price'        => 'float',
        'pay_now'            => 'float',
        'balance_to_be_paid' => 'float',
    ];

    public static function booted()
    {
        static::creating(function ($transaction) {
            $transaction->invoice_number = 'INV-'.strtoupper(uniqid());
        });
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
