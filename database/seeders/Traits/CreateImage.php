<?php

namespace Database\Seeders\Traits;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait CreateImage
{
    public function createImage(?string $directory = null)
    {
        try {
            $image    = collect(File::files(database_path('seeders/image/')))->first();
            $file     = file_get_contents($image->getPathname());
            $fileName = $directory.'/'.Str::lower(Str::ulid()).'.png';
            Storage::disk('public')->put($fileName, $file);
        } catch (\Throwable $th) {
            logger()->error($th);

            throw $th;
        }

        return $fileName;
    }
}
