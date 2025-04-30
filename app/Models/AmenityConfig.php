<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AmenityConfig extends Model
{
    protected $fillable = [
        'amenity_id',
        'room_id',
    ];

    public function amenity()
    {
        return $this->belongsTo(Amenity::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
