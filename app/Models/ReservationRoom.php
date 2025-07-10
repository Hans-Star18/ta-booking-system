<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationRoom extends Model
{
    protected $fillable = [
        'reservation_id',
        'room_id',
        'bed_id',
        'extra_bed_count',
        'extra_bed_price',
        'adult_guest',
        'child_guest',
    ];

    protected $casts = [
        'extra_bed_count' => 'integer',
        'extra_bed_price' => 'float',
        'adult_guest'     => 'integer',
        'child_guest'     => 'integer',
    ];

    protected $with = ['room', 'bed'];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function bed()
    {
        return $this->belongsTo(Bed::class);
    }
}
