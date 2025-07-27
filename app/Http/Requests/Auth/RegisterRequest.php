<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'hotel_name'    => ['required', 'string', 'max:100'],
            'hotel_address' => ['nullable', 'string'],
            'hotel_phone'   => ['required', 'string', 'max:20'],
            'hotel_website' => ['nullable', 'string', 'max:100'],
            'name'          => ['required', 'string', 'max:100'],
            'email'         => ['required', 'email', 'max:100'],
        ];
    }
}
