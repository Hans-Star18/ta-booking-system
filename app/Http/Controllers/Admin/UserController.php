<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ChangePasswordRequest;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $roles;

    public function __construct()
    {
        $this->roles = Role::all()->map(function ($role) {
            return [
                'value' => $role->id,
                'label' => $role->name,
            ];
        });
    }

    public function index()
    {
        $users = User::with(['role', 'hotel'])->get();

        return inertia('admins/users/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return inertia('admins/users/add', [
            'roles' => $this->roles,
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();
        try {
            User::create([
                ...$request->safe()->except('password'),
                'password' => Hash::make($request->password),
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error creating user: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to create user',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.users.index')->with('alert', [
            'message' => 'User created successfully',
            'type'    => 'success',
        ]);
    }

    public function show(User $user)
    {
        return inertia('admins/users/show', [
            'user' => $user->load(['hotel']),
        ]);
    }

    public function edit(User $user)
    {
        return inertia('admins/users/edit', [
            'user' => $user->load(['hotel']),
            'roles' => $this->roles,
        ]);
    }

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

    public function destroy(User $user)
    {
        DB::beginTransaction();
        try {
            $user->hotel()->delete();
            $user->delete();

            DB::commit();
        } catch (\Throwable $th) {
            logger()->error('Error deleting user: ' . $th->getMessage());
            DB::rollBack();

            return back()->with('alert', [
                'message' => 'Failed to delete user',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.users.index')->with('alert', [
            'message' => 'User deleted successfully',
            'type'    => 'success',
        ]);
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
