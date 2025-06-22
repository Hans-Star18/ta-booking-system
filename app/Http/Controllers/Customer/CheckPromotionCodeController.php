<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;

class CheckPromotionCodeController extends Controller
{
    public function __invoke(Request $request, Hotel $hotel)
    {
        $promotionCode = $request->promotion_code;

        if (blank($promotionCode)) {
            return back()->with('alert', [
                'type'    => 'error',
                'message' => 'Promotion code is required',
            ]);
        }

        $promotionCode = $hotel->promotionCodes()->where('code', $promotionCode)->first();

        if (blank($promotionCode)) {
            return back()->with('alert', [
                'type'    => 'error',
                'message' => 'Promotion code is not found',
            ]);
        }

        if (! $promotionCode->is_active) {
            return back()->with('alert', [
                'type'    => 'error',
                'message' => 'Promotion code is invalid',
            ]);
        }

        if ($promotionCode->valid_until < now()) {
            return back()->with('alert', [
                'type'    => 'error',
                'message' => 'Promotion code is expired',
            ]);
        }

        session()->flash('promotion_code', $promotionCode);

        return back()->with(
            'alert',
            [
                'type'    => 'success',
                'message' => 'Congratulations! You have successfully applied the promotion code',
            ]
        );
    }
}
