<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return inertia('auth/login');
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->safe()->only('email', 'password');
        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            if ($request->user()->isOrganizer()) {
                if (! $request->user()->hotel) {
                    Auth::logout();

                    return back()->with('alert', [
                        'type'    => 'warning',
                        'message' => 'You are not authorized to access this page.',
                    ]);
                }

                if (! $request->user()->hotel->is_active) {
                    Auth::logout();

                    return back()->with('alert', [
                        'type'    => 'warning',
                        'message' => 'Your hotel is not active, please contact the administrator',
                    ]);
                }

                return to_route('organizer.dashboard')->with('alert', [
                    'type'    => 'success',
                    'message' => 'You are logged in as an organizer.',
                ]);
            }

            if ($request->user()->isAdmin()) {
                return to_route('admin.dashboard')->with('alert', [
                    'type'    => 'success',
                    'message' => 'You are logged in as an admin.',
                ]);
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
