<?php

namespace App\Http\Requests\Organizer;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->isOrganizer();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'          => ['required', 'string', 'max:255'],
            'max_occupancy' => ['required', 'integer', 'min:1'],
            'cover_image'   => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'price'         => ['required', 'numeric', 'min:0'],
            'description'   => ['required', 'string'],
            'bed_config'    => ['required', 'array'],
            'bed_config.*'  => ['required', 'exists:beds,id'],
            'amenity_config' => ['nullable', 'array'],
            'amenity_config.*' => ['nullable', 'exists:amenities,id'],
        ];
    }
}
