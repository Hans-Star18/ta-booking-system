<?php

namespace App\Models;

use App\Traits\WithUploadFile;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
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

    protected $with = ['amenities', 'beds', 'photos'];

    const FILE_PATH = 'rooms';

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($room) {
            $room->amenities()->detach();
            $room->beds()->detach();
            $room->allotments()->delete();

            // You could add validation here
            // if ($room->hasActiveBookings()) {
            //     throw new \Exception('Cannot delete room with active bookings');
            // }
        });
    }

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
        return $this->belongsToMany(Bed::class, 'bed_configs');
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'amenity_configs');
    }

    public function allotments()
    {
        return $this->hasMany(Allotment::class);
    }

    public function photos()
    {
        return $this->hasMany(PhotoRoom::class);
    }
}
