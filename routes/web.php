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
Route::get('/profile/sync', 'ProfileController@sync')->name('profile.sync');

Route::any('{query}', function() { return redirect('/'); })->where('query', '.*');
