<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Allotment extends Model
{
    protected $fillable = [
        'room_id',
        'date',
        'allotment'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
