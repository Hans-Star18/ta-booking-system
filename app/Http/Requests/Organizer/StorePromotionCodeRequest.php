<?php

namespace App\Http\Requests\Organizer;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StorePromotionCodeRequest extends FormRequest
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
            'code'       => ['required', 'string', 'max:10'],
            'discount'   => ['required', 'integer', 'min:1', 'max:100'],
            'valid_until' => ['required', 'date'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $this->merge(['hotel_id' => $this->user()->hotel->id]);
            $this->merge(['is_active' => true]);
            $this->merge(['valid_until' => Carbon::parse($this->valid_until)->timezone('Asia/Makassar')]);
        });
    }
}
