<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\Odd;

class XyzRequest extends FormRequest
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
            'input' => 'regex:/^[XYZ]*$/',
            'direction' => 'string|in:horizontal,vertical',
            'size' => ['numeric', 'min:3', 'max:99', new Odd]
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'input' => $this->route('input'),
            'dir' => strtolower($this->dir)
        ]);
    }

    public function messages()
    {
        return [
            'input.regex' => 'The :attribute must only include letters X, Y, and Z',
            'direction.in' => 'The :attribute must be either horizontal or vertical'
        ];
    }
}
