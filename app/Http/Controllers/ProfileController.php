<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateProfile;
use App\Http\Requests\UpdatePassword;
use App\Http\Resources\User as UserRescourse;
use App\User;
use Auth;
use Hash;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function sync()
    {
        $user = Auth::user();
        
        return new UserRescourse($user);
    }

    public function updateProfile(UpdateProfile $request)
    {
        $user = Auth::user();

        $user->name = $request->name;
        $user->email = $request->email;

        $user->save();

        return response()->json([
            'flash' => 'Your profile has been updated.',
            'timeout' => 10000
        ], 200);
    }

    public function updatePassword(UpdatePassword $request)
    {
        $user = Auth::user();

        $user->password = Hash::make($request->new_password);

        $user->save();

        return response()->json([
            'flash' => 'Your password has been changed.',
            'timeout' => 10000
        ], 200);
    }

    public function removeAccount($account_password = null)
    {
        if(!isset($account_password) || trim($account_password) == '') {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => [
                    'account_password' => [ 'The current password field is required.' ]
                ]
            ], 422);
        }
        if (Hash::check($account_password, Auth::user()->password) == false) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => [
                    'account_password' => [ 'Your current password is not correct.' ]
                ]
            ], 422);
        }

        $user = Auth::user();

        $user->delete();

        return response()->json([
            'flash' => 'Your account has removed. Sorry to see you go.',
            'timeout' => 10000,
            'redirect' => url('/#/auth'),
            'auth' => false
        ], 200);
    }
}
