<?php

namespace App;

use Illuminate\Notifications\Notifiable;
// use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\MailResetPasswordToken;

class User extends Authenticatable
{
    // use HasApiTokens, Notifiable;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Send a password reset email to the user
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new MailResetPasswordToken($token));
    }

    public function categories()
    {
        return $this->hasMany('App\Category');
    }

    public function pages()
    {
        return $this->hasMany('App\Page');
    }

    protected static function boot() {
        parent::boot();

        static::deleting(function($user) {
            $user->categories()->delete();
            $user->pages()->delete();
        });
    }
}
