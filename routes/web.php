<?php

Route::view('/', 'app');

Route::post('signin', 'Auth\LoginController@login')->name('signin');
Route::post('signout', 'Auth\LoginController@logout')->name('signout');
Route::post('signup', 'Auth\RegisterController@register')->name('signup');

Route::post('forgot', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('forgot');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('reset');

Route::patch('profile', 'ProfileController@updateProfile')->name('profile');
Route::patch('password', 'ProfileController@updatePassword')->name('password');
Route::delete('purge/{account_password?}', 'ProfileController@removeAccount')->name('purge');
Route::get('profile/sync', 'ProfileController@sync')->name('profile.sync');

Route::middleware(['auth'])->group(function () {
    Route::name('category.')->group(function () {
        Route::get('categories', 'CategoryController@all')->name('all');
        Route::patch('categories/drag', 'CategoryController@drag')->name('drag');
        Route::post('category', 'CategoryController@store')->name('store');
        Route::patch('category/{category}', 'CategoryController@update')->name('update');
        Route::delete('category/{category}', 'CategoryController@destroy')->name('destroy');
    });

    Route::name('page.')->group(function () {
        Route::get('pages', 'PageController@all')->name('all');
        Route::patch('pages/drag', 'PageController@drag')->name('drag');
        Route::post('page/category/{category}', 'PageController@store')->name('store');
        Route::patch('page/{page}', 'PageController@update')->name('update');
        Route::patch('page/{page}/markdown', 'PageController@markdown')->name('markdown');
        Route::delete('page/{page}', 'PageController@destroy')->name('destroy');
    });
});

Route::any('{query}', function() { return redirect('/'); })->where('query', '.*');
