<?php

namespace app\staff\controller;


use app\common\model\Staff;
use think\Controller;
use think\Session;

class Login extends Controller
{

    public function index()
    {
        if (request()->isPost()) {
            $data = input('post.');

            //验证数据
            $result = $this->validate($data, 'Staff.login');
            if (true !== $result) {
                $this->error($result);
            }

            $staff = new Staff();
            $user = $staff->where('user_name', $data['user_name'])
                ->where('password', password_encryption($data['password']))->find();

            if ($user != null && $user->user_name != null) {
                // 登录成功
                Session::set('user_name', $user->user_name, 'login');
                $this->redirect('staff/index/index');
            } else {
                // 登录失败
                $this->error('用户名或密码输入错误');
            }
        } else {

            return view('index');
        }
    }

    /**
     * 获取用户名
     * @param bool $skip 没登录的情况是否需要跳转，默认false
     * @return bool 已登录返回用户名，否则返回false
     */
    public function getUserName($skip = true)
    {
        $data = ['user_name' => Session::get('user_name', 'login')];
        $result = $this->validate($data, 'Staff.ck_user_name');
        if (true === $result) {
            return $data['user_name'];
        }

        if ($skip) {
            $this->redirect('staff/login/index');
        }
    }


    /**
     * 获取登录用户数据
     * @return null|static
     * @throws \think\exception\DbException
     */
    public function getUserData()
    {
        $userName = $this->getUserName();
        if ($userName) {
            return Staff::get(['user_name' => $userName]);
        }
        return null;
    }


    /**
     * 判断是否为管理用户
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


    /**
     * 退出登录
     */
    public function logout()
    {
        Session::clear('login');
        $this->redirect('/');
    }

    public function resetPassword()
    {

        if (request()->isPost()) {


            $data = input('post.');

            $result = $this->validate($data, 'Staff.resetPass');
            if (true !== $result) {
                $this->error($result);
            }

            //邮箱和验证码必须同时对应
            Session::prefix('rest_pass');
            if ($data['email_captcha'] != Session::pull('e_mail_captcha') ||
                $data['e_mail'] != Session::pull('e_mail')) {
                $this->error('邮箱验证码错误');
            }

            //重置密码
            $staff = new Staff();
            $result = !!$staff->save([
                'password' => password_encryption($data['password'])
            ], [
                'e_mail' => $data['e_mail']
            ]);

            if ($result) {
                $this->success('重置成功，请使用新密码登录', 'staff/Login/index');
            } else {
                $this->error('重置失败，请重试');
            }


        } else {

            return view('reset_password');
        }

    }


    public function resetPasswordCaptchaMail()
    {
        $data = input('post.');

        $result = $this->validate($data, 'Staff.scene2');
        if (true !== $result) {
            $this->outJsonResult(false, $result);
        }

        //检查邮箱是否被注册
        $staff = Staff::get(['e_mail' => $data['e_mail']]);
        if ($staff == null) {
            $this->outJsonResult(false, '邮箱未注册');
        }

        Session::prefix('rest_pass');
        Session::set('e_mail', $data['e_mail']);
        Session::set('e_mail_captcha', rand(100000, 999999));

        //发送验证码邮件
        $title = '您正在重置密码，请验证邮箱';
        $content = '<div style="background: #f4f4f4; border: 1px solid #20b4ff; width: 100%;max-width: 600px; margin: 0 auto; font-size: 18px;"><div style="padding: 15px;background: #20b4ff; color: #fff;">您正在重置密码，请验证邮箱</div><div style="padding:30px; line-height: 1.8;"><P style="">尊敬的用户：<br>您好，感谢您使用柠吉IM！<br>您正在重置密码，验证码：<strong style="color: #0063ff;">' .
            Session::get('e_mail') . '</strong></P><p style="color: #666;">如您未做出此操作，可能是他人误填，请忽略此邮件。<br>本邮件为系统发送，请勿回复。</p><p style="text-align: right;">柠吉IM（柠吉在线客服系统）</p></div></div>';
        $result = Email::SendEmail($title, $content, $data['e_mail']);
        if ($result === true) {
            $this->outJsonResult(true, '验证码已发送到你的邮箱，请查收');
        } else {
            $this->outJsonResult(false, '邮件发送失败，请重试');
        }
    }

}

