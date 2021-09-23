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
            'message' => 'required|min:10|string',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Vous devez fournir une :attribute afin que nous puissions vous recontacter.',
            'email.email' => "Veuillez fournir une :attribute valide.",
            'subject.required' => 'Veuillez préciser un :attribute.',
            'message.required' => 'Pourquoi nous contacter si vous ne laissez pas de :attribute ?',
            'message.min' => 'Votre :attribute doit faire un minimum de 10 caractères.',
            "message.string" => 'Votre :attribute ne peut pas contenir de caractères spéciaux.',
        ];
    }

    public function attributes()
    {
        return [
            'email' => 'adresse email',
            'message' => 'message',
            'subject' => 'sujet'
        ];
    }
}
