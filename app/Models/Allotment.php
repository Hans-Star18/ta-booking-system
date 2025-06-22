<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Allotment extends Model
{
    protected $fillable = [
        'room_id',
        'date',
        'allotment',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
