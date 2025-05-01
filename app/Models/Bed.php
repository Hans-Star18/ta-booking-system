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
        'icon',
        'description',
        'capacity',
    ];

    public function rooms()
    {
        return $this->belongsToMany(Room::class);
    }
}
