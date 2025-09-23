<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationCustomer extends Model
{
    protected $fillable = [
        'reservation_id',
        'first_name',
        'last_name',
        'email',
        'address',
        'phone',
        'city',
        'postal_code',
        'country_code',
        'request',
    ];

    protected $appends = [
        'full_name',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
