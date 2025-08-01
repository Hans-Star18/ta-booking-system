<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreHotelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
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
            'email'              => ['required', 'string', 'email', 'max:50', 'unique:hotels,email'],
            'website'            => ['required', 'string', 'max:100'],
            'term_and_condition' => ['required', 'string'],
            'is_active'          => ['required', 'boolean'],
            'user_id'            => ['required', 'exists:users,id', 'unique:hotels,user_id'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.unique' => 'The user has already been assigned to a hotel.',
        ];
    }
}
