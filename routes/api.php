<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:api', 'auth'])->group(function () {
    Route::name('category.')->group(function () {
        Route::get('/categories', 'CategoryController@all')->name('all');
        Route::patch('/categories/drag', 'CategoryController@drag')->name('drag');
        Route::post('/category', 'CategoryController@store')->name('store');
        Route::patch('/category/{category}', 'CategoryController@update')->name('update');
        Route::delete('/category/{category}', 'CategoryController@destroy')->name('destroy');
    });

    Route::name('page.')->group(function () {
        Route::get('/pages', 'PageController@all')->name('all');
        Route::patch('/pages/drag', 'PageController@drag')->name('drag');
        Route::post('/page/category/{category}', 'PageController@store')->name('store');
        Route::patch('/page/{page}', 'PageController@update')->name('update');
        Route::delete('/page/{page}', 'PageController@destroy')->name('destroy');
    });
});
