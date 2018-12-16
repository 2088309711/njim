<?php

namespace app\staff\controller;


use app\common\model\Staff;
use app\common\util\SundryUtil;
use think\Controller;
use think\Request;

class Login extends Controller
{

    public function index()
    {
        return view('index');
    }

    /**
     * 获取用户名
     * @param bool $skip 没登录的情况是否需要跳转，默认false
     * @return bool 已登录返回用户名，否则返回false
     */
    public function getUserName($skip = false)
    {
        Session::startSession();

        if (isset($_SESSION['user_name'])) {
            $data = ['user_name' => $_SESSION['user_name']];
            $result = $this->validate($data, 'Staff.ck_user_name');
            if (true === $result) {
                return $data['user_name'];
            }
        }

        if ($skip) {
            $this->error('请登录', 'staff/login/index');
        }

        return false;
    }


    /**
     * 获取登录用户数据
     * @return null|static
     * @throws \think\exception\DbException
     */
    public function getUserData()
    {
        $userName = $this->getUserName(true);
        if ($userName) {
            return Staff::get(['user_name' => $userName]);
        }
        return null;
    }


    /**
     * 判断是否为超级用户
     * @param bool $skip 如果没有超级权限，是否要跳转到普通客服操作界面，默认false
     * @return bool
     * @throws \think\exception\DbException
     */
    public function isAdmin($skip = false)
    {
        $userData = $this->getUserData();
        if ($userData != null && $userData->power == 1) {
            return true;
        }

        if ($skip) {
            $this->error('您没有操作权限哦！', 'staff/index/index');
        }

        return false;
    }

    public function loginCheck()
    {

        Session::startSession();
        $data = [
            '__token__' => Request::instance()->post('__token__'),
            'user_name' => Request::instance()->post('user_name'),
            'password' => Request::instance()->post('password')
        ];

        //验证数据
        $result = $this->validate($data, 'Staff.login');
        if (true !== $result) {
            $this->error($result);
        }

        $strUtil = new SundryUtil();
        $staff = new Staff();
        $user = $staff->where('user_name', $data['user_name'])
            ->where('password', $strUtil->pwdConfusion($data['password']))->find();

        if ($user != null && $user->user_name != null) {
            // 登录成功
            $_SESSION['user_name'] = $user->user_name;
            $this->success('登录成功', 'staff/index/index');
        } else {
            // 登录失败
            $this->error('用户名或密码输入错误');
        }
    }

    /**
     * 退出登录
     */
    public function logout()
    {
        Session::destroySession();
        $this->success('退出成功', '/');
    }

}

