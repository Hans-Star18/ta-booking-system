<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait WithUploadFile
{
    public function storeFile(UploadedFile $file, String $path): String | null
    {
        try {
            $filename = time() . '-' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            Storage::disk('public')->putFileAs($path, $file, $filename);
        } catch (\Exception $e) {
            logger()->error('Error storing file: ' . $e->getMessage());

            return null;
        }

        return $path . '/' . $filename;
    }

    public function deleteFile(String $path): Bool
    {
        try {
            Storage::disk('public')->delete($path);

            return true;
        } catch (\Exception $e) {
            logger()->error('Error deleting file: ' . $e->getMessage());

            return false;
        }
    }
}
