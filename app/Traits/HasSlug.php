<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $sourceSlug = $model->getSlugSource();

            $model->slug = Str::slug($sourceSlug).'-'.Str::random(5);
        });

        static::updating(function ($model) {
            $sourceSlug = $model->getSlugSource();

            $model->slug = Str::slug($sourceSlug).'-'.Str::random(5);
        });
    }

    public function getSlugSource()
    {
        $column = property_exists($this, 'slugable') ? $this->slugable : 'title';

        return $this->{$column};
    }
}
