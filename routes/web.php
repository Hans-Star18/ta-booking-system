<?php

use App\Http\Controllers\Customer\HomeController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'customer.'], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
});
