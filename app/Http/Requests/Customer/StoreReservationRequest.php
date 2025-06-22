<?php

namespace App\Http\Requests\Customer;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name'   => ['required', 'string', 'max:50'],
            'last_name'    => ['required', 'string', 'max:50'],
            'email'        => ['required', 'string', 'email', 'max:100'],
            'address'      => ['required', 'string'],
            'phone'        => ['required', 'string', 'max:20'],
            'city'         => ['required', 'string', 'max:50'],
            'postal_code'  => ['required', 'string', 'max:10'],
            'country_code' => ['required', 'string', 'max:5'],
            'request'      => ['nullable', 'string'],
            'terms'        => ['required', 'boolean', 'accepted'],
        ];
    }
}
