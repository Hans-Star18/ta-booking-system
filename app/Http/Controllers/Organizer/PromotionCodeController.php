<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\StorePromotionCodeRequest;
use App\Http\Requests\Organizer\UpdatePromotionCodeRequest;
use App\Models\PromotionCode;
use Illuminate\Support\Facades\DB;

class PromotionCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promotionCodes = PromotionCode::all();

        return inertia('organizers/promotion-codes/index', [
            'promotionCodes' => $promotionCodes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('organizers/promotion-codes/add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePromotionCodeRequest $request)
    {
        DB::beginTransaction();
        try {
            PromotionCode::create($request->all());

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            logger()->error('Error creating promotion code: ' . $e->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to create promotion code',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Promotion code created successfully',
            'type'    => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PromotionCode $promotionCode)
    {
        return inertia('organizers/promotion-codes/edit', [
            'promotionCode' => $promotionCode,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePromotionCodeRequest $request, PromotionCode $promotionCode)
    {
        DB::beginTransaction();
        try {
            $promotionCode->update($request->all());

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            logger()->error('Error updating promotion code: ' . $e->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update promotion code',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Promotion code updated successfully',
            'type'    => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PromotionCode $promotionCode)
    {
        $promotionCode->delete();

        return back()->with('alert', [
            'message' => 'Promotion code deleted successfully',
            'type'    => 'success',
        ]);
    }
}
