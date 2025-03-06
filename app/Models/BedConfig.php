<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BedConfig extends Model
{
    protected $fillable = [
        'bed_id',
        'room_id'
    ];

    public function bed()
    {
        return $this->belongsTo(Bed::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
