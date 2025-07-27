<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AmenityController;
use App\Http\Controllers\Admin\BedController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\PolicyController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Customer\CheckPromotionCodeController;
use App\Http\Controllers\Customer\HomeController;
use App\Http\Controllers\Customer\ReservationController;
use App\Http\Controllers\Customer\TransactionController;
use App\Http\Controllers\Organizer\HotelController;
use App\Http\Controllers\Organizer\OrganizerController;
use App\Http\Controllers\Organizer\PromotionCodeController;
use App\Http\Controllers\Organizer\RoomController;
use App\Http\Controllers\Organizer\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('/testtttt', function () {
    return view('mails.approval-mail');
});

Route::group(['middleware' => ['auth']], function () {
    Route::group(['as' => 'organizer.', 'prefix' => 'manage', 'middleware' => 'isOrganizerLogin'], function () {
        Route::get('/', [OrganizerController::class, 'index'])->name('dashboard');
        Route::resource('reservations', OrganizerController::class)->only(['show', 'edit', 'update']);

        Route::resource('rooms', RoomController::class);
        Route::post('rooms/{room}/allotment', [RoomController::class, 'allotment'])->name('rooms.allotment');
        Route::post('rooms/{room}/allotment/batch', [RoomController::class, 'batchAllotment'])->name('rooms.allotment.batch');
        Route::get('rooms/{room}/photos/create', [RoomController::class, 'createPhoto'])->name('rooms.photos.create');
        Route::post('rooms/{room}/photos', [RoomController::class, 'storePhoto'])->name('rooms.photos.store');
        Route::delete('rooms/photos/{photo}', [RoomController::class, 'destroyPhoto'])->name('rooms.photos.destroy');

        Route::resource('promotion-codes', PromotionCodeController::class)->except('show');
        Route::resource('hotels', HotelController::class)->except(['create', 'store', 'destroy', 'show']);
        Route::resource('settings', SettingController::class)->except(['create', 'store', 'destroy', 'show']);
    });

    Route::group(['as' => 'admin.', 'prefix' => 'manage/admin', 'middleware' => 'isAdminLogin'], function () {
        Route::get('/', [AdminController::class, 'index'])->name('dashboard');

        Route::resource('companies', CompanyController::class)->parameters([
            'companies' => 'hotel',
        ]);
        Route::resource('users', UserController::class);
        Route::put('users/{user}/password', [UserController::class, 'updatePassword'])->name('users.update-password');
        Route::resource('beds', BedController::class)->except(['show']);
        Route::resource('amenities', AmenityController::class)->except(['show']);
        Route::resource('policies', PolicyController::class)->except(['show']);
    });

    Route::post('/logout', [LogoutController::class, 'logout'])->name('logout');
});

Route::group(['as' => 'auth.'], function () {
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('show-login-form')->middleware('guest');
    Route::post('/login', [LoginController::class, 'login'])->name('login');

    Route::get('/request-demo-account', [RegisterController::class, 'requestDemoAccount'])->name('request-demo-account');
    Route::post('/register', [RegisterController::class, 'register'])->name('register');
});

Route::group(['as' => 'customer.'], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::post('/send-inquiry', [HomeController::class, 'sendInquiry'])->name('send-inquiry');
    Route::get('/check-promotion', [CheckPromotionCodeController::class, 'check'])->name('promotion-code.check');
    Route::get('/transaction/check', [TransactionController::class, 'check'])->name('transaction.check');

    Route::get('/{hotel:uuid}', [ReservationController::class, 'index'])->name('reservation.index');
    Route::get('/{hotel:uuid}/check-availability', [ReservationController::class, 'checkAvailability'])->name('reservation.check-availability');
    Route::match(['get', 'post'], '/{hotel:uuid}/reservation-detail/{room}', [ReservationController::class, 'detail'])->name('reservation.detail');
    Route::match(['get', 'post'], '/{hotel:uuid}/reservation-confirm', [ReservationController::class, 'confirm'])->name('reservation.confirm');
    Route::post('/{hotel:uuid}/reservation-store', [ReservationController::class, 'storeReservation'])->name('reservation.store');
    Route::get('/{hotel:uuid}/reservation-finish', [ReservationController::class, 'finish'])->name('reservation.finish');
    Route::post('/{hotel:uuid}/check-promotion', CheckPromotionCodeController::class)->name('reservation.check-promotion');
});
