<?php

use App\Http\Controllers\Customer\MidtransController;
use App\Http\Controllers\Customer\ReservationController;
use Illuminate\Support\Facades\Route;

Route::post('/midtrans/notification', [MidtransController::class, 'notification'])->name('midtrans.notification');
