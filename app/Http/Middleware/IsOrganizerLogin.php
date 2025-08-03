<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsOrganizerLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->isAdmin()) {
            return to_route('admin.dashboard');
        }

        if (! $request->user()?->isOrganizer()) {

            if ($request->user()) {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }
            session()->flash('alert', [
                'type'    => 'error',
                'message' => 'You must be logged in as an organizer to access this page.',
            ]);

            return back();
        }

        return $next($request);
    }
}
