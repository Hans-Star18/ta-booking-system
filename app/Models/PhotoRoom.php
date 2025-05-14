<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

class PhotoRoom extends Model
{
    protected $fillable = ['room_id', 'photo'];

    const FILE_PATH = 'rooms/photos';

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function photo(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Storage::url($value),
        );
    }
}
