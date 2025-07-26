<?php

namespace App\Http\Requests\Organizer;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHotelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var \App\Models\User $user */
        $user = auth()->guard('web')->user();

        return $user && $user->isOrganizer() && $user->hotel->id === $this->hotel->id || $user->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'               => ['required', 'string', 'max:100'],
            'address'            => ['required', 'string'],
            'phone'              => ['required', 'string', 'max:20'],
            'mobile'             => ['required', 'string', 'max:20'],
            'email'              => ['required', 'string', 'email', 'max:50', 'unique:hotels,email,'.$this->hotel->id],
            'website'            => ['required', 'string', 'max:100'],
            'term_and_condition' => ['required', 'string'],
            'is_active'          => ['sometimes', 'boolean'],
            'user_id'            => ['sometimes', 'required', 'exists:users,id'],
        ];
    }
}
