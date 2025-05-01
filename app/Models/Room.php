<?php

namespace App\Models;

use App\Traits\WithUploadFile;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Room extends Model
{
    use WithUploadFile;

    protected $fillable = [
        'hotel_id',
        'name',
        'description',
        'max_occupancy',
        'price',
        'cover_image',
    ];

    const FILE_PATH = 'rooms';

    public function coverImage(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Storage::url($value),
        );
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function beds()
    {
        return $this->belongsToMany(Bed::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class);
    }

    public function allotments()
    {
        return $this->hasMany(Allotment::class);
    }
}
