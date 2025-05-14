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

    public function deleteFile(?String $path): Bool
    {
        try {
            // Return false if path is null or empty
            if (empty($path)) {
                logger()->warning('Cannot delete file: Path is empty or null');
                return false;
            }

            // If the path is a full URL (from Storage::url()), extract the relative path
            if (Str::startsWith($path, ['http://', 'https://'])) {
                // Remove the domain and /storage prefix from the URL
                $path = Str::after($path, '/storage/');
            }

            // If the path starts with /storage, remove it
            if (Str::startsWith($path, '/storage/')) {
                $path = Str::after($path, '/storage/');
            }

            // Ensure the path doesn't start with a slash
            $path = ltrim($path, '/');

            // Validate the final path
            if (empty($path)) {
                logger()->warning('Cannot delete file: Invalid path after processing');
                return false;
            }

            // Check if file exists before attempting to delete
            if (!Storage::disk('public')->exists($path)) {
                logger()->warning('File not found for deletion: ' . $path);
                return false;
            }

            Storage::disk('public')->delete($path);

            return true;
        } catch (\Exception $e) {
            logger()->error('Error deleting file: ' . $e->getMessage(), [
                'path' => $path,
                'exception' => $e
            ]);

            return false;
        }
    }
}
