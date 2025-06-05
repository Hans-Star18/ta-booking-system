<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Services\MidtransService;

class MidtransController extends Controller
{
    public function notification(MidtransService $midtransService)
    {
        return $midtransService->handleNotification();
    }
}
