<?php

namespace app\staff\controller;

use app\common\model\Staff;
use app\common\util\DateUtil;
use think\Controller;
use think\Request;

class Register extends Controller
{

    public function index()
    {
        return view('index');
    }

    /**
     * AJAX 检查用户名是否可用
     * @throws \think\exception\DbException
     */
    public function ckUserName()
    {
        $data = input();
        $result = $this->validate($data, 'Staff.ck_user_name');
        if (true === $result) {
            echo json_encode(["no_exist" => $this->userNameNotExist($data['user_name'])]);
        }
    }

    /**
     * 检查用户名是否存在
     * @param $userName
     * @return bool 不存在返回true
     * @throws \think\exception\DbException
     */
    public function userNameNotExist($userName)
    {
        return Staff::get(['user_name' => $userName]) === null;
    }

    /**
     * 保存注册用户
     * @throws \think\exception\DbException
     */
    public function save()
    {
        Session::startSession();
        $data = input('post.');
        $result = $this->validate($data, 'Staff.regist');
        if (true !== $result) {
            $this->error($result);
        }

        if (!$this->userNameNotExist($data['user_name'])) {
            $this->error('用户名已存在，请更换');
            return;
        }

        // 保存客服
        $staff = new Staff();
        $data['power'] = 1;
        if ($staff->regist($data)) {
            // 注册成功，同时登录
            $_SESSION['user_name'] = $data['user_name'];
            $this->success('恭喜，注册成功！', '/index.php/staff/admin');
        } else {
            $this->error('注册失败，请重试');
        }
    }
}

