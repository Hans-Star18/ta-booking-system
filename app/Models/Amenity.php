<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    use HasSlug;

    protected $slugable = 'name';

    protected $fillable = [
        'name',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($amenity) {
            $amenity->rooms()->detach();
        });
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'amenity_configs');
    }
}
