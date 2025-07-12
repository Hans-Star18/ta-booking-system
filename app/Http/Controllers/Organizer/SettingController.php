<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\UpdateSettingRequest;
use App\Models\Setting;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    public function index()
    {
        $hotel   = auth()->guard('web')->user()->hotel;
        $setting = $hotel->setting;

        return inertia('organizers/settings/index', [
            'hotel'   => $hotel,
            'setting' => $setting,
        ]);
    }

    public function edit(Setting $setting)
    {
        return inertia('organizers/settings/edit', [
            'setting' => $setting,
        ]);
    }

    public function update(UpdateSettingRequest $request, Setting $setting)
    {
        DB::beginTransaction();
        try {
            $setting->update($request->validated());

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            logger()->error('Error updating setting: ' . $e->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update setting',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Setting updated successfully',
            'type'    => 'success',
        ]);
    }
}
