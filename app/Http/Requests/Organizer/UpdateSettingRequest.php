<?php

namespace App\Http\Requests\Organizer;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var \App\Models\User $user */
        $user = auth()->guard('web')->user();

        return $user && $user->isOrganizer() && $user->hotel->id === $this->setting->hotel_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'midtrans_client_key' => ['required', 'string', 'max:255'],
            'midtrans_server_key' => ['required', 'string', 'max:255'],
            'dp_percentage'       => ['required', 'numeric', 'min:0', 'max:100'],
            'tax_percentage'      => ['required', 'numeric', 'min:0', 'max:100'],
            'extra_bed_price'     => ['required', 'numeric', 'min:0'],
        ];
    }
}
