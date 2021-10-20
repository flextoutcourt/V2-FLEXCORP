<?php

use App\Http\Controllers\ActuController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Ascenseur301Controller;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RealisationController;
use App\Http\Controllers\TchatController;
use App\Http\Controllers\UserController;
use App\Models\User;
use App\Notifications\MessageSent;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
    Route::get('/user/edit/{user}', [UserController::class, 'edit'])->name('user.edit');
    Route::get('/user/edit/{user}/avatar', [UserController::class, "edit_picture"])->name('user.edit_photo');
    Route::post('/user/update/picture', [UserController::class, "update_picture"])->name('user.update_photo');
    Route::post('/user/update', [UserController::class, 'update'])->name('user.update');

    Route::get('/user/{name}', [UserController::class, "show"])->name('user.show');

    Route::get('/parlez-moi', [TchatController::class, 'index'])->name('tchat');
    Route::get('/parlez-moi/messages', [TchatController::class, "list"])->name('tchat.list');
    Route::post('/parlez-moi/messages', [TchatController::class, "message"])->name('tchat.send');
    Route::post('/parlez-moi/add_media', [TchatController::class, 'add_media'])->name('tchat.media_add');
    Route::post('/parlez-moi/delete_media', [TchatController::class, "delete_media"])->name('tchat.delete_media');

    Route::get('/les-actus-de-flex/new', [ActuController::class, "new"])->name('actus.new');
    Route::get('/les-actus-de-flex/draft/{draft_id}/edit', [ActuController::class, "draft"])->name('actus.draft.edit');
    Route::get('/user/mes-brouillons', [UserController::class, "drafts"])->name('user.draft');

    Route::post('/notify/users/{type}', function($type){
        return Notification::sendNow(User::all(), new MessageSent($type));
    })->name('notify.user');
    
    //trouver une librairie de tchat laravel
});

/** HOME RELATED CONTENT */

Route::get('/', [HomeController::class, "home"])->name('home');
Route::get('/nous-contacter', [HomeController::class, "contact"])->name('contact');
Route::get('/mentions-legales', [HomeController::class, "mts"])->name('mts');
Route::get('/mes-partenaires', [HomeController::class, "partenaires"])->name('partenaires');

/** //HOME RELATED CONTENT */

/** PROJECTS */

Route::get('/mes-projets', [ProjectController::class, "index"])->name('projects');
Route::get('/mes-projets/ascenseur-301', [ProjectController::class, 'asc301'])->name('projects.asc301');
Route::get('/mes-projets/projets-personnels', [ProjectController::class, 'perso'])->name('projects.perso');
Route::get('/mes-projets/projets-professionels', [ProjectController::class, "pro"])->name('projects.pro');

Route::get('/mes-projets/{project}', [ProjectController::class, 'show'])->name('project.show');

Route::post('/mes-projets/add', [ProjectController::class, 'store'])->name('projects.store');
Route::get('/mes-projets/edit', [ProjectController::class, 'store'])->name('projects.edit');
Route::post('/mes-projects/update/{actu}-{slug?}', [ActuController::class, "udpate"])->name('actu.update');
/** FIN PROJECTS */

/** REALISATIONS */

Route::get('/mes-realisations', [RealisationController::class, "index"])->name('realisations');
Route::get('/mes-realisations/{realisation}-{slug?}', [RealisationController::class, 'show'])->name('realisation.show');

Route::post('/mes-realisations/add', [RealisationsController::class, 'store'])->name('realisations.store');
Route::get('/mes-realisations/edit/{realisation}', [RealisationsController::class, 'edit'])->name('realisation.edit');
Route::post('/mes-realisations/update', [RealisationsController::class, 'update'])->name('realisation.udpate');

/** FIN REALISATIONS */

/** ACTUS */

Route::get('/les-actus-de-flex', [ActuController::class, 'index'])->name('actus');
Route::get('/les-actus-de-flex/{actu}', [ActuController::class, "show"])->name('actu.show');

/** FIN ACTUS */

Route::prefix('admin')->middleware(['admin'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');
    Route::get('/realisation/add', [AdminController::class, 'realisation_add'])->name('admin.realisation.add');
    Route::post('/realisation/add', [AdminController::class, 'realisation_store'])->name('admin.realisation.store');
    Route::get('/project/add', [AdminController::class, 'project_add'])->name('admin.project.add');
    Route::post('/project/add', [AdminController::class, 'project_store'])->name('admin.project.store');
    Route::get('/user/edit/{user}', [AdminController::class, "user_edit"])->name('admin.user.edit');
    Route::get('/users/list', [AdminController::class, 'user_list'])->name('admin.user.list');
});

Route::get('/verify-card', [Ascenseur301Controller::class, 'verify_card'])->name('ascenseur.verify_card');

Route::middleware(['cors'])->group(function () {
    Route::post('/hogehoge', 'Controller@hogehoge');
});

Route::get('/offline', function() {
    return 'test';
})->name('offline');

require __DIR__.'/auth.php';


