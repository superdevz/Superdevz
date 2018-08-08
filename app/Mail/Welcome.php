<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Welcome extends Mailable
{
    use Queueable, SerializesModels;

    public $firstname;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        list($firstname, $lastname) = explode(" ", $user->name);
        $this->firstname = $firstname;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('email.welcome')->subject('Welcome to Codolog');
    }
}
