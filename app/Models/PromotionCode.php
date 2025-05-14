<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromotionCode extends Model
{
    protected $fillable = [
        "hotel_id",
        "code",
        "discount",
        "valid_until",
        "is_active",
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
