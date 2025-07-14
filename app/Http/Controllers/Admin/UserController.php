<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['role', 'hotel'])->get();

        return inertia('admins/users/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(User $user)
    {
        return inertia('admins/users/show', [
            'user' => $user->load(['hotel']),
        ]);
    }

    public function edit(Request $request, User $user)
    {
        $roles = Role::all()->map(function ($role) {
            return [
                'value' => $role->id,
                'label' => $role->name,
            ];
        });

        return inertia('admins/users/edit', [
            'user' => $user->load(['hotel']),
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
