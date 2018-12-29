<?php

namespace app\staff\controller;

use think\Controller;

class Admin extends Controller
{
    
    public function index()
    {
        $login = new Login();
        $staff = $login->getUserData();
        if ($staff != null) {
            return view('index', ['staff' => $staff, 'menu' => 'index']);
        }
    }

    public function welcome()
    {
        return view('welcome');
    }

    public function robot()
    {
        echo '机器人，敬请期待...';
    }

    public function faq()
    {
        return view('faq');
    }
}

