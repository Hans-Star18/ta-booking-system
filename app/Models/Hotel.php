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
}
