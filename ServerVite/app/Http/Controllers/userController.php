<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class userController extends Controller
{
    public function index (){
        $user_list = [
            (object)[
                'id'   => 1,
                'name' =>  'Anoop Joy',
                'Age'  =>  29
            ],
            (object)[
                'id'   => 2,
                'name' => 'Ankitha Joy',
                'Age'  => 25
            ]
        ];
        return ($user_list);
    }
}
