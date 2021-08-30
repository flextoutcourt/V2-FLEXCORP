<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact;
use App\Models\Home;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function home()
    {
        return view('pages.home');
    }

    public function mts()
    {
        return view('pages.mentions_legales');
    }

    public function partenaires()
    {
        return view('pages.partenaires');
    }

    public function contact(Contact $request)
    {
        // verifier si la requete contient des erreurs
            //return back()->withErrors($errors);
        
        //envoyer le mail si la validation a réussie
    }

}
