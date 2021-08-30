<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Contact extends FormRequest
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
            'email' => "required|email",
            'subject' => 'required',
            'message' => 'required|min:10|alpha_num',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Vous devez fournir une adresse email afin que nous puissions vous recontacter.',
            'email.email' => "Veuillez fournir une adresse mail valide.",
            'subject.required' => 'Veuillez préciser un sujet.',
            'message.required' => 'Pourquoi nous contacter si vous ne laissez pas de message ?',
            'message.min' => 'Votre message doit faire un minimum de 10 caractères.',
            "message.alpha_num" => 'Votre message ne peut pas contenir de caractères spéciaux.',
        ];
    }

    public function attributes()
    {
        return [

        ];
    }
}
