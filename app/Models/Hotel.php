<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Hotel extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'phone',
        'mobile',
        'email',
        'website',
        'term_and_condition',
        'uuid',
        'is_active',
        'approved_at',
    ];

    protected $casts = [
        'is_active'   => 'boolean',
        'approved_at' => 'datetime',
    ];

    protected $with = [
        'setting',
    ];

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($hotel) {
            $hotel->rooms()->delete();
            $hotel->promotionCodes()->delete();
            $hotel->reservations()->delete();
            $hotel->setting()->delete();
        });

        static::creating(function ($hotel) {
            $hotel->uuid = Str::uuid7();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function setting()
    {
        return $this->hasOne(Setting::class);
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    public function promotionCodes()
    {
        return $this->hasMany(PromotionCode::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
