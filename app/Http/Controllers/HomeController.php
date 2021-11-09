<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact;
use App\Mail\ContactMail;
use App\Models\Home;
use DG\Twitter\Twitter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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
        return Inertia::render('Home.jsx');
    }

    public function mts()
    {
        return Inertia::render('Mentions');
        // return view('pages.mentions_legales');
    }

    public function partenaires()
    {
        return Inertia::render('Partenaires');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function contact_store(Contact $request)
    {
        Mail::to('contact@dev.quentinleclerc.fr')->send(new ContactMail($request));
        // Mail::to($request->email)->send(new ContactMail($request));
    }

    public function get_tweets()
    {
        $twitter = new Twitter("2fd2noDAroC0L6EefQWbhyhJ4","k6zCNYUzoz5U71EM8htIB9eOfdg5iTU2ovHIgWNwIyniGnr0L4", "3225592469-rdk60Q8AsWXguVbg8AvYQYMtGofVU6McKJzlVA2", "PjKdtFJcK8MDpGbs5q03VUWtNw56OO4wKcRMEmFxJlIao");
        $statuses = $twitter->load(Twitter::ME, 3);
        return $statuses;
    }

}
