<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PolicyConfig extends Model
{
    protected $fillable = [
        'policy_id',
        'room_id',
    ];

    public function policy()
    {
        return $this->belongsTo(Policy::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
