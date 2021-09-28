<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AvatarRequest extends FormRequest
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
            'picture' => 'image|mimes:jpg,jpeg,gif,png'
        ];
    }

    public function messages()
    {
        return [
            'picture.image' => ':attribute doit etre une photo',
            'picture.mimes' => ':attribute n\'est pas au bon format (jpg, jpeg, gif, png)'
        ];
    }

    public function attributes()
    {
        return [
            'picture' => 'Le fichier'
        ];
    }
}
