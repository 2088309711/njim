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
            $this->assign('staff', $staff);
            $this->assign('menu', 'index');
            return view();
        }
    }

    public function welcome()
    {
        return view();
    }

    public function faq()
    {
        return view();
    }
}

