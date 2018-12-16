<?php

namespace app\staff\controller;

class Index
{

    public function __construct()
    {
        $login = new Login();
        $login->getUserName(true);
    }

    /**
     * @return \think\response\View
     */
    public function index()
    {
        $login = new Login();
        $staff = $login->getUserData();
        if ($staff != null) {
            return view('index', ['staff' => $staff]);
        }
    }
}

