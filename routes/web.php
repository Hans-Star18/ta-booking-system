<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Customer\HomeController;
use App\Http\Controllers\Organizer\OrganizerController;
use App\Http\Controllers\Organizer\RoomController;

Route::group(["as" => "customer."], function () {
    Route::get("/", [HomeController::class, "index"])->name("home");
    Route::get("/reservation", [HomeController::class, "reservation"])->name("reservation");
    Route::get("/reservation/confirm", [HomeController::class, "confirmReservation"])->name("reservation.confirm");
    Route::get("/reservation/finish", [HomeController::class, "finishReservation"])->name("reservation.finish");
});

Route::group(["middleware" => "auth"], function () {
    Route::group(['as' => 'organizer.', 'prefix' => 'manage'], function () {
        Route::get("/", [OrganizerController::class, "index"])->name("dashboard");

        Route::get("/rooms", [RoomController::class, "index"])->name("rooms.index");
        Route::get("/rooms/add", [RoomController::class, "add"])->name("rooms.add");
        Route::post("/rooms/add", [RoomController::class, "store"])->name("rooms.store");
        Route::get("/rooms/{room}", [RoomController::class, "show"])->name("rooms.show");
    });

    Route::get("/logout", [LogoutController::class, "logout"])->name("logout");
});

Route::group(["as" => "auth."], function () {
    Route::get("/login", [LoginController::class, "showLoginForm"])->name("show-login-form")->middleware("guest");
    Route::post("/login", [LoginController::class, "login"])->name("login");
});
