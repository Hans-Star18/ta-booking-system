<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
