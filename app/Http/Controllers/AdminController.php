<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Index');
    }

    public function realisation_add()
    {
        return Inertia::render('Admin/Realisations/Add');
    }

    public function realisation_store()
    {

    }

    public function project_add()
    {
        return Inertia::render('Admin/Projects/Add');
    }

    public function project_store()
    {

    }

    public function user_list()
    {
        return Inertia::render('Admin/Users/Index');
    }

    public function user_edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', ['user' => $user]);
    }
}
