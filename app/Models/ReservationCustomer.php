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

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
