<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Auth;

class ProfileChanged implements Rule
{
    protected $name;
    protected $email;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($name, $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if($this->name == Auth::user()->name && $this->email == Auth::user()->email)
        {
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Nothing has been changed on your profile.';
    }
}
