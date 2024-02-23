<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\userController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\subCategoryController;
use App\Http\Controllers\sliderController;
use App\Http\Controllers\PageController;

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
Route::get('/user', [userController::class, 'index']);
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});
Route::controller(TodoController::class)->group(function () {
    Route::get('todos', 'index');
    Route::post('todo', 'store');
    Route::get('todo/{id}', 'show');
    Route::put('todo/{id}', 'update');
    Route::delete('todo/{id}', 'destroy');
});
Route::controller(categoryController::class)->group(function () {
    Route::get('categories', 'index');
});
Route::controller(subCategoryController::class)->group(function () {
    Route::get('sub-categories', 'index');
    Route::post('sub-category', 'store');
    Route::get('sub-category/{id}', 'show');
    Route::put('sub-category/{id}', 'update');
    Route::delete('sub-category/{id}', 'destroy');
});
Route::controller(sliderController::class)->group(function () {
    Route::get('sliders', 'index');
    Route::post('slider', 'store');
    Route::get('slider/{id}', 'show');
    Route::put('slider/{id}', 'update');
    Route::delete('slider/{id}', 'destroy');
    Route::post('add-slider-image', 'addSliderImage');
    Route::delete('slider-image/{id}', 'destroySliderImage');
});
Route::controller(pageController::class)->group(function () {
    Route::get('pages', 'index');
    Route::post('page', 'store');
    Route::get('page/{id}', 'show');
    Route::put('page/{id}', 'update');
    Route::delete('page/{id}', 'destroyPage');
});
