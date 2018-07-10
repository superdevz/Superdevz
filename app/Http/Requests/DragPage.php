<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DragPage extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pages' => 'required|array',
            'pages.*' => 'required|integer|distinct|min:1',
        ];
    }
}
