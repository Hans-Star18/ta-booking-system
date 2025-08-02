<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Services\MidtransService;
use Illuminate\Http\Request;

class MidtransController extends Controller
{
    public function notification(MidtransService $midtransService, Request $request)
    {
        return $midtransService->handleNotification($request);
    }
}
