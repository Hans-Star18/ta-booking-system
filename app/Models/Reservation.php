<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'hotel_id',
        'reservation_number',
        'check_in',
        'check_out',
        'allotment',
        'total_nights',
        'status',
        'reservation_data',
    ];

    const PENDING = 'pending';

    const CONFIRMED = 'confirmed';

    const CANCELLED = 'cancelled';

    protected $casts = [
        'reservation_data' => 'array',
        'check_in'         => 'date',
        'check_out'        => 'date',
    ];

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($reservation) {
            $reservation->reservationRooms()->delete();
            $reservation->reservationCustomer()->delete();
            $reservation->transaction()->delete();
        });
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function reservationRooms()
    {
        return $this->hasMany(ReservationRoom::class);
    }

    public function reservationCustomer()
    {
        return $this->hasOne(ReservationCustomer::class);
    }

    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }
}
