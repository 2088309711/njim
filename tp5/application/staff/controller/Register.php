<?php

namespace app\staff\controller;

use app\common\model\Staff;
use app\common\util\DateUtil;
use PHPMailer\Email;
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
        $data = input('post.');
        $result = $this->validate($data, 'Staff.regist');
        if (true !== $result) {
            $this->error($result);
        }
        
        //检查邮箱验证码
        Session::startSession();
        if ($data['email_captcha'] != $_SESSION['e_mail']) {
            $this->error('邮箱验证码错误');
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


    public function sendCaptchaMail()
    {
        $data = input('post.');

        $result = $this->validate($data, 'Staff.scene2');
        if (true !== $result) {
            $this->outJsonResult(false, $result);
        }

        //检查邮箱是否被注册
        $staff = Staff::get(['e_mail' => $data['e_mail']]);
        if ($staff != null) {
            $this->outJsonResult(false, '邮箱已被注册，请直接登录');
        }

        Session::startSession();
        $_SESSION['e_mail'] = rand(100000, 999999);
        //发送验证码邮件
        $title = '欢迎您注册柠吉IM，请验证邮箱';
        $content = '<div style="background: #f4f4f4; border: 1px solid #20b4ff; width: 100%;max-width: 600px; margin: 0 auto; font-size: 18px;"><div style="padding: 15px;background: #20b4ff; color: #fff;">欢迎您注册柠吉IM，请验证邮箱</div><div style="padding:30px; line-height: 1.8;"><P style="">尊敬的用户：<br>您好，感谢您注册柠吉IM！<br>验证码：<strong style="color: #0063ff;">' .
            $_SESSION['e_mail'] . '</strong></P><p style="color: #666;">如您未做出此操作，可能是他人误填，请忽略此邮件。<br>本邮件为系统发送，请勿回复。</p><p style="text-align: right;">柠吉IM（柠吉在线客服系统）</p></div></div>';
        $result = Email::SendEmail($title, $content, $data['e_mail']);
        if ($result === true) {
            $this->outJsonResult(true, '验证码已发送到你的邮箱，请查收');
        } else {
            $this->outJsonResult(false, '邮件发送失败，请重试');
        }
    }

    private function outJsonResult($state, $msg)
    {
        echo json_encode(['state' => $state ? 1 : 0, 'msg' => $msg]);
        die;
    }

}

