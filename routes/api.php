<?php

use App\Http\Controllers\Api\KategorisampahController;
use App\Http\Controllers\Api\SampahController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('/sampah', SampahController::class);


Route::get('/kategori', [KategorisampahController::class, 'index'])->name('index');
Route::get('/kategori/{id}', [KategorisampahController::class, 'show'])->name('show');
Route::post('/kategori', [KategorisampahController::class, 'store'])->name('store');
Route::patch('/kategori/{id}', [KategorisampahController::class, 'update'])->name('update');
Route::put('/kategori/{id}', [KategorisampahController::class, 'update'])->name('update');
Route::delete('/kategori/{id}', [KategorisampahController::class, 'destroy'])->name('destroy');
