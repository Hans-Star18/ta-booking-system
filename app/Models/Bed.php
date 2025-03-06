<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bed extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon'
    ];

    public function bedConfigs()
    {
        return $this->hasMany(BedConfig::class);
    }
}
