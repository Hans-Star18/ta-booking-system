<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Customer\HomeController;
use Illuminate\Support\Facades\Route;

Route::group(["as" => "customer."], function () {
    Route::get("/", [HomeController::class, "index"])->name("home");
    Route::get("/checkout", [HomeController::class, "checkout"])->name("checkout");
    Route::get("/checkout/confirm", [HomeController::class, "confirmCheckout"])->name("confirm-checkout");
});

Route::group(["as" => "auth."], function () {
    Route::get("/login", [LoginController::class, "showLoginForm"])->name(
        "show-login-form"
    );
});
