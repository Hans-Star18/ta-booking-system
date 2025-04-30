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
        'icon',
    ];

    public function amenitiesConfigs()
    {
        return $this->hasMany(AmenityConfig::class);
    }
}
