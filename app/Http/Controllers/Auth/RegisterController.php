<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Mail\NewRegistrationToAdminMail;
use App\Mail\NewRegistrationToCustMail;
use App\Models\Hotel;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    public function requestDemoAccount()
    {
        return inertia('auth/register');
    }

    public function register(RegisterRequest $request)
    {
        DB::beginTransaction();
        try {
            $password           = $this->generateRandomPassword();
            $additionalUserData = [
                'password' => Hash::make($password),
                'role_id'  => Role::HOTEL_ORGANIZER,
            ];
            $user  = User::create(array_merge($request->safe(['name', 'email']), $additionalUserData));
            $hotel = Hotel::create([
                'name'      => $request->hotel_name,
                'address'   => $request->hotel_address,
                'phone'     => $request->hotel_phone,
                'website'   => $request->hotel_website,
                'email'     => $user->email,
                'is_active' => false,
                'user_id'   => $user->id,
            ]);
            $hotel->setting()->create([
                'dp_percentage'       => 50,
                'tax_percentage'      => 10,
                'extra_bed_price'     => 60000,
            ]);

            try {
                Mail::send(new NewRegistrationToAdminMail($user, $hotel, $password));
                Mail::send(new NewRegistrationToCustMail($user, $hotel, $password));
            } catch (\Throwable $th) {
                logger()->error('Error sending new registration emails: '.$th->getMessage());
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            logger()->error('Error registering demo account: '.$th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to register demo account',
                'type'    => 'error',
            ]);
        }

        return redirect()->route('auth.show-login-form')->with('alert', [
            'message' => 'Request has been sent. Please wait for admin to activate your account',
            'type'    => 'success',
        ]);
    }

    protected function generateRandomPassword()
    {
        return Str::random(10);
    }
}
