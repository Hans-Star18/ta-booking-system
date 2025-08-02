<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\StorePromotionCodeRequest;
use App\Http\Requests\Organizer\UpdatePromotionCodeRequest;
use App\Models\PromotionCode;
use Illuminate\Support\Facades\DB;

class PromotionCodeController extends Controller
{
    protected $hotel;

    public function __construct()
    {
        $this->hotel = auth()->guard('web')->user()->hotel;
    }

    public function index()
    {
        return inertia('organizers/promotion-codes/index', [
            'promotionCodes' => $this->hotel->promotionCodes,
        ]);
    }

    public function create()
    {
        return inertia('organizers/promotion-codes/add');
    }

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

        return to_route('organizer.promotion-codes.index')->with('alert', [
            'message' => 'Promotion code created successfully',
            'type'    => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PromotionCode $promotionCode)
    {
        if ($promotionCode->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Promotion code not found',
                'type'    => 'error',
            ]);
        }

        return inertia('organizers/promotion-codes/edit', [
            'promotionCode' => $promotionCode,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePromotionCodeRequest $request, PromotionCode $promotionCode)
    {
        if ($promotionCode->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Promotion code not found',
                'type'    => 'error',
            ]);
        }

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
        if ($promotionCode->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Promotion code not found',
                'type'    => 'error',
            ]);
        }

        $promotionCode->delete();

        return back()->with('alert', [
            'message' => 'Promotion code deleted successfully',
            'type'    => 'success',
        ]);
    }
}
