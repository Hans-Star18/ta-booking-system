<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Bed extends Model
{
    use HasSlug;

    protected $slugable = 'name';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'capacity',
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($bed) {
            $bed->reservationRooms()->update([
                'bed_id' => null,
            ]);
            $bed->rooms()->detach();
        });
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'bed_configs');
    }

    public function reservationRooms()
    {
        return $this->hasMany(ReservationRoom::class);
    }
}
