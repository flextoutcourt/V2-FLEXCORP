<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact;
use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function home()
    {
        return Inertia::render('Home');
    }

    public function mts()
    {
        return Inertia::render('Mentions');
        // return view('pages.mentions_legales');
    }

    public function partenaires()
    {
        return Inertia::render('Partenaires');
        return view('pages.partenaires');
    }

    public function contact(Contact $request)
    {
        // verifier si la requete contient des erreurs
            //return back()->withErrors($errors);
        
        //envoyer le mail si la validation a réussie
    }

}
