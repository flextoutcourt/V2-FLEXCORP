<?php

use App\Http\Controllers\ActuController;
use App\Http\Controllers\Home;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RealisationController;
use App\Http\Controllers\TchatController;
use Illuminate\Foundation\Application;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('auth', 'verified')->group(function () {
    Route::get('/discuss', [TchatController::class, 'index'])->name('tchat');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [HomeController::class, "home"])->name('home');

Route::get('/projects', [ProjectController::class, "list"])->name('projects');
Route::post('/projects/add', [ProjectController::class, 'store'])->name('projects.store');

Route::get('/actus', [ActuController::class, 'list'])->name('actus');
Route::post('/actu/add', [ActuController::class, "store"])->name('actus.post');


Route::get('/contact', [HomeController::class, "contact"])->name('contact');
Route::get('/mentions-legales', [HomeController::class, "mts"])->name('mts');
Route::get('/partenaires', [HomeController::class, "partenaires"])->name('partenaires');

Route::get('/realisations', [RealisationController::class, "list"])->name('realisations');

require __DIR__.'/auth.php';
