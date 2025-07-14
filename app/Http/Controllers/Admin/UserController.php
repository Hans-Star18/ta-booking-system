<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ChangePasswordRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

    public function edit(User $user)
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
    public function update(UpdateUserRequest $request, User $user)
    {
        DB::beginTransaction();
        try {
            $user->update($request->validated());

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error updating user: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update user',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'User updated successfully',
            'type'    => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function updatePassword(ChangePasswordRequest $request, User $user)
    {
        DB::beginTransaction();
        try {
            $user->update([
                'password' => Hash::make($request->password),
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            logger()->error('Error updating password: ' . $th->getMessage());
            DB::rollBack();

            return back()->with('alert', [
                'message' => 'Failed to update password',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Password updated successfully',
            'type'    => 'success',
        ]);
    }
}
