<?php

namespace app\staff\controller;

class Index
{

    /**
     * @return \think\response\View
     */
    public function index()
    {
        $login = new Login();
        $staff = $login->getUserData();
        if ($staff != null) {
            return view('index', ['staff' => $staff, 'menu' => 'index']);
        }
    }
}

