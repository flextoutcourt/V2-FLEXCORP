<?php

namespace App\Http\Controllers;

use App\Models\Drafts;
use Illuminate\Http\Request;

class DraftsController extends Controller
{

    public function get(int $user_id)
    {
        $drafts = Drafts::where('user_id', $user_id)->get();
        // dd($drafts);
        return $drafts;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Models\Drafts  $drafts
     * @return \Illuminate\Http\Response
     */
    public function show(Drafts $drafts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Drafts  $drafts
     * @return \Illuminate\Http\Response
     */
    public function edit(Drafts $drafts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Drafts  $drafts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Drafts $drafts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Drafts  $drafts
     * @return \Illuminate\Http\Response
     */
    public function destroy(Drafts $drafts)
    {
        //
    }
}
