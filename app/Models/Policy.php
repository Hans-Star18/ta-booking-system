<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Policy extends Model
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

        static::deleting(function ($policy) {
            $policy->rooms()->detach();
        });
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'policy_configs');
    }
}
