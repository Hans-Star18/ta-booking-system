<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePolicyRequest;
use App\Http\Requests\Admin\UpdatePolicyRequest;
use App\Models\Policy;
use Illuminate\Support\Facades\DB;

class PolicyController extends Controller
{
    public function index()
    {
        $policies = Policy::all();

        return inertia('admins/policies/index', [
            'policies' => $policies,
        ]);
    }

    public function create()
    {
        return inertia('admins/policies/add');
    }

    public function store(StorePolicyRequest $request)
    {
        DB::beginTransaction();
        try {
            Policy::create($request->validated());

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error add policy: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to add policy',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.policies.index')->with('alert', [
            'message' => 'Policy add successfully',
            'type'    => 'success',
        ]);
    }

    public function edit(Policy $policy)
    {
        return inertia('admins/policies/edit', [
            'policy' => $policy,
        ]);
    }

    public function update(UpdatePolicyRequest $request, Policy $policy)
    {
        DB::beginTransaction();
        try {
            $policy->update($request->validated());

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error updating policy: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update policy',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Policy updated successfully',
            'type'    => 'success',
        ]);
    }

    public function destroy(Policy $policy)
    {
        DB::beginTransaction();
        try {
            $policy->delete();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error deleting policy: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to delete policy',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.policies.index')->with('alert', [
            'message' => 'Policy deleted successfully',
            'type'    => 'success',
        ]);
    }
}
