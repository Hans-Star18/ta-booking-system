<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Customer\HomeController;
use Illuminate\Support\Facades\Route;

Route::group(["middleware" => "auth"], function () {
    Route::group(["as" => "customer."], function () {
        Route::get("/", [HomeController::class, "index"])->name("home");
        Route::get("/reservation", [HomeController::class, "reservation"])->name("reservation");
        Route::get("/reservation/confirm", [HomeController::class, "confirmReservation"])->name("reservation.confirm");
        Route::get("/reservation/finish", [HomeController::class, "finishReservation"])->name("reservation.finish");
    });

    Route::get("/logout", function () {
        auth()->guard("web")->logout();
        return to_route("auth.show-login-form");
    })->name("logout");
});

Route::group(["as" => "auth."], function () {
    Route::get("/login", [LoginController::class, "showLoginForm"])->name("show-login-form")->middleware("guest");
    Route::post("/login", [LoginController::class, "login"])->name("login");
});
