<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * @var \App\Models\User
     */
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function index()
    {
        if (! $this->user->isOrganizer()) {
            return back()->with('alert', [
                'type'    => 'error',
                'message' => 'You are not authorized to access this page',
            ]);
        }

        return inertia('auth/profile', [
            'user' => $this->user,
        ]);
    }

    public function update(UpdateProfileRequest $request)
    {
        $this->user->update($request->validated());

        return back()->with('alert', [
            'type'    => 'success',
            'message' => 'Profile updated successfully',
        ]);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        if (! Hash::check($request->current_password, $this->user->password)) {
            return back()->withErrors([
                'current_password' => 'Current password is incorrect',
            ]);
        }

        $this->user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return back()->with('alert', [
            'type'    => 'success',
            'message' => 'Password updated successfully',
        ]);
    }
}
