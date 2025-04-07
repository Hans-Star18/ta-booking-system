<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasSlug;

    protected $slugable = 'name';

    protected $fillable = [
        'slug',
        'name',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
