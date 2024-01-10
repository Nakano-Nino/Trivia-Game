<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AvatarController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    });

Route::controller(AvatarController::class)->group(function () {
    Route::get('avatars', 'findAll');
    Route::post('avatars', 'create');
    // Route::get('avatars/{id}', 'findOne');
    Route::put('avatars/{id}', 'update');
    Route::delete('avatars/{id}', 'delete');
});