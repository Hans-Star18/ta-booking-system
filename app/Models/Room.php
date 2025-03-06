<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'hotel_id',
        'name',
        'description',
        'capacity',
        'price',
        'photo',
        'extra_bed',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function bedConfigs()
    {
        return $this->hasMany(BedConfig::class);
    }

    public function allotments()
    {
        return $this->hasMany(Allotment::class);
    }
}
