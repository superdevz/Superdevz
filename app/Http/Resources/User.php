<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'apiToken' => $this->api_token,
            'name' => $this->name,
            'email' => $this->email,
            'avatarSm' => 'https://www.gravatar.com/avatar/' . md5($this->email) . '?d=identicon&s=60',
            'avatarMd' => 'https://www.gravatar.com/avatar/' . md5($this->email) . '?d=identicon&s=500',
            'joinDate' => $this->created_at->diffForHumans()
        ];
    }
}
