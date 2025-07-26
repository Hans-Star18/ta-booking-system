<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    protected static function bootHasSlug()
    {
        static::creating(function ($model) {
            $sourceSlug = $model->getSlugSource();

            $model->slug = $model->generateSlug($sourceSlug);
        });

        static::updating(function ($model) {
            $sourceSlug = $model->getSlugSource();

            $model->slug = $model->generateSlug($sourceSlug);
        });
    }

    public function getSlugSource()
    {
        $column = property_exists($this, 'slugable') ? $this->slugable : 'title';

        return $this->{$column};
    }

    public function generateSlug($sourceSlug)
    {
        return Str::slug($sourceSlug).'-'.Str::random(5);
    }
}
