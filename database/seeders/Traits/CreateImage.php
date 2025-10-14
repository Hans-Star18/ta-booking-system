<?php

namespace Database\Seeders\Traits;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait CreateImage
{
    public function createImage(?string $directory = null, ?string $filename = null)
    {
        try {
            // $image    = collect(File::files(database_path('seeders/image/')))->first();
            $basePath = database_path('seeders/image');
            $filePath = $basePath.'/'.$filename;

            if ($filename && File::exists($filePath)) {
                $image = new \SplFileInfo($filePath);
            } else {
                $files = collect(File::files($basePath));
                $image = $files->first();
            }

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
