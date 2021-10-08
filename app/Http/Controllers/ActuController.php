<?php

namespace App\Http\Controllers;

use App\Models\Actu;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Drafts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Actus/Index');
    }

    public function get()
    {
        $data = [];
        $data['actus'] = Actu::all();
        $data['categories'] = Category::all();
        return $data;
    }

    public function new()
    {
        return Inertia::render('Actus/New');
    }

    public function draft(string $draft)
    {
        // dd($draft);
        $draft = Drafts::find($draft);
        return Inertia::render('Actus/Draft', ['draft' => $draft]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Actu  $actu
     * @return \Illuminate\Http\Response
     */
    public function show(Actu $actu)
    {
        return Inertia::render('Actus/Show', ['actu' => $actu]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Actu  $actu
     * @return \Illuminate\Http\Response
     */
    public function edit(Actu $actu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Actu  $actu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Actu $actu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Actu  $actu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Actu $actu)
    {
        //
    }

    public function comments($id)
    {
        $comments = Actu::find($id)->comments()->where('belongs_to', null)->get();
        foreach($comments as $key => $item){
            $comments[$key]['user'] = $item->user()->get()->first();
            $comments[$key]['sub_comments'] = Comment::where('belongs_to', $item->id)->get();
            foreach($comments[$key]['sub_comments'] as $k => $sub_comment){
                $comments[$key]['sub_comments'][$k]['user'] = $sub_comment->user->get()->first();
            }
        }
        return $comments;
    }
}
