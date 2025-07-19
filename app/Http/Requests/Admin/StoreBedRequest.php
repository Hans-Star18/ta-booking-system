<?php

namespace App\Http\Requests\Admin;

use App\Traits\HasSlug;
use Illuminate\Foundation\Http\FormRequest;

class StoreBedRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'name'        => ['required', 'string', 'max:50'],
            'capacity'    => ['required', 'integer', 'min:1'],
            'description' => ['required', 'string'],
        ];
    }
}
