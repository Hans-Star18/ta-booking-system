<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'hotel_id',
        'midtrans_client_key',
        'midtrans_server_key',
        'dp_percentage',
        'tax_percentage',
        'extra_bed_price',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
