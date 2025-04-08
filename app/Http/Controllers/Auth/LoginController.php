<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;

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
            return to_route('customer.home');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
