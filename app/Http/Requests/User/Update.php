<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class Update extends FormRequest
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
            'name' => 'required|min:2',
            'email' => ['required', 'email', Rule::unique('users')->ignore(Auth::user()->id, 'id')],
            'password' => ['required', Rules\Password::defaults()],
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Vous devez renseigner un email',
            'email.email' => 'Votre adresse email semble invalide',
            'name.required' => 'Vous devez renseigner votre nom',
            'name.min' => 'Votre nom doit faire au minimum :min caractères'
        ];
    }

    public function attributes()
    {
        return [
            //
        ];
    }
}
