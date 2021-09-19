<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            'title' => 'required|min:2',
            'description' => 'required|min:4',
            'illustration' => 'required|file|mimes:jpeg,gif,png,svg'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => ':attribute est requis',
            'title.min' => ':attribute doit faire au minimum :min caractères',
            'description.required' => ':attribute est requise',
            'description.min' => ':attribute doit fait au minimum :min caractères',
            'illustration.required' => ':attribute est requise',
            'illustration.file' => ':attribute doit être une image valide',
            'illustration.mimes' => "L'extension de :attribute doit être valide",
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'Le titre',
            'description' => 'La description',
            'illustration' => "L'illustration"
        ];
    }
}
