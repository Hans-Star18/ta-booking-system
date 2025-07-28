<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cursomer\SendInquiryRequest;
use App\Mail\InquiryMail;
use App\Models\Hotel;
use Illuminate\Support\Facades\Mail;

class HomeController extends Controller
{
    public function index()
    {
        $hotels  = Hotel::active()->get();
        $clients = $hotels->map(function ($hotel) {
            return [
                'name' => $hotel->name,
                'url'  => url($hotel->uuid),
            ];
        });

        return inertia('customers/home', [
            'clients' => $clients,
        ]);
    }

    public function sendInquiry(SendInquiryRequest $request)
    {
        try {
            try {
                Mail::send(new InquiryMail($request->validated()));
            } catch (\Throwable $th) {
                logger()->error('Error sending inquiry email: '.$th->getMessage());
            }

            return back()->with('alert', [
                'type'    => 'success',
                'message' => 'Inquiry sent successfully',
            ]);
        } catch (\Throwable $th) {
            logger()->error('Error sending inquiry: '.$th->getMessage());

            return back()->with('alert', [
                'type'    => 'error',
                'message' => 'Error sending inquiry, please try again later',
            ]);
        }
    }
}
