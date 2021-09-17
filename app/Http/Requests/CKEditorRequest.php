<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CKEditorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'illustration' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'title' => "required|string",
            'content' => 'required|min:150'
        ];
    }

    public function messages()
    {
        return [
            'illustration.required' => ":attribute est obligatoire",
            'illustration.image' => ":attribute ne peut pas être un fichier",
            'illustration.mimes' => ":attribute n'est pas au bon format (autorisés : png, jpeg, jpg, gif, svg)",
            'title.required' => ':attribute est obligatoire',
            'title.string' => ':attribute ne peut pas contenir de caractères spéciaux',
            'content.required' => ":attribute ne peut pas être vide",
            'content.min' => ":attribute doit faire au minimum :min caractères"
        ];
    }

    public function attributes()
    {
        return [
            'illustration' => "L'illustration",
            'title' => "Le titre",
            'content' => "L'article"
        ];
    }
}
