<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/11/16 0016
 * Time: 9:40
 */

namespace app\staff\controller;


use app\common\model\Staff;
use think\Controller;

class StaffManage extends Controller
{

    public function index()
    {
        $login = new Login();
        $staff = $login->getUserData();
        $data = ['user_name' => $staff->user_name];

        $s = new Staff();
        $list = $s->where('account', $data['user_name'])->select();

        return view('', [
            'staff' => $staff,
            'menu' => 'staff_manage',
            'list' => $list
        ]);
    }

    public function create()
    {
        if (request()->isPost()) {
            $data = input('post.');
            $login = new Login();
            $data['account'] = $login->getUserName();

            $data['state'] = isset($data['state']) ? $data['state'] : 0;

            $result = $this->validate($data, 'Staff.add');
            if (true !== $result) {
                $this->error($result);
            }

            //检查重复
            $register = new Register();
            if (!$register->userNameNotExist($data['user_name'])) {
                $this->error('用户名已被注册，请更换');
            }

            $data['power'] = 0;

            //保存数据
            $staff = new Staff();
            if ($staff->add($data)) {
                $this->success('添加成功', 'staff/StaffManage/index');
            } else {
                $this->error('添加失败');
            }
        } else {
            $login = new Login();
            $staff = $login->getUserData();
            return view('', [
                'staff' => $staff,
                'menu' => 'staff_manage'
            ]);
        }
    }

    /**
     * 删除一个
     * @throws \think\exception\DbException
     */
    public function delete()
    {
        $data = input();
        $login = new Login();
        $data['user_name'] = $login->getUserName();

        //验证数据
        $result = $this->validate($data, 'Staff.scene1');
        if (true !== $result) {
            $this->error($result);
        }

        $staff = Staff::get($data['id']);
        if ($data['user_name'] === $staff->account && $staff->user_name != $staff->account) {
            $staff->delete();
        }
        $this->redirect('staff/StaffManage/index');
    }


    /**
     * 修改
     * @return \think\response\View|void
     * @throws \think\exception\DbException
     */
    public function update()
    {

        if (request()->isPost()) {

            $data = input('post.');
            $login = new Login();
            $data['user_name'] = $login->getUserName();

            //选择验证场景
            $data['scene'] = $data['password'] == '' ? 'save1' : 'save2';

            //open赋初始值
            $data['state'] = isset($data['state']) ? $data['state'] : 0;

            //验证数据
            $result = $this->validate($data, 'Staff.' . $data['scene']);
            if (true !== $result) {
                $this->error($result);
            }

            //保存数据
            $staff = new Staff();
            if ($staff->updateStaff($data)) {
                $this->success('修改成功', 'staff/StaffManage/index');
            } else {
                $this->error('修改失败');
            }

        } else {


            $data = input();
            $login = new Login();
            $data['user_name'] = $login->getUserName();

            //验证数据
            $result = $this->validate($data, 'Staff.scene1');
            if (true !== $result) {
                $this->error($result);
            }

            $staff = Staff::get([
                'id' => $data['id'],
                'account' => $data['user_name']
            ]);

            return view('', [
                'staff' => $staff,
                'menu' => 'staff_manage'
            ]);
        }
    }


    /**
     * 修改当前登录的客服
     * @return \think\response\View|void
     * @throws \think\exception\DbException
     */
    public function updateStaffByLogin()
    {

        if (request()->isPost()) {
            $data = input('post.');
            $login = new Login();
            $data['user_name'] = $login->getUserName();

            //验证数据
            $result = $this->validate($data, 'Staff.save3');
            if (true !== $result) {
                $this->error($result);
            }

            //保存数据
            $staff = new Staff();
            if ($staff->updateStaffByLogin($data)) {
                $this->success('修改成功', 'staff/admin/welcome');
            } else {
                $this->error('修改失败');
            }
        } else {

            $login = new Login();
            $data['user_name'] = $login->getUserName();

            //不验证数据

            $staff = Staff::get([
                'user_name' => $data['user_name']
            ]);

            return view('update_login', ['staff' => $staff]);
        }
    }

    /**
     * 修改当前登录的密码
     * @return \think\response\View|void
     * @throws \think\exception\DbException
     */
    public function updatePass()
    {
        if (request()->isPost()) {

            $data = input('post.');
            $login = new Login();
            $data['user_name'] = $login->getUserName();

            //验证数据
            $result = $this->validate($data, 'Staff.save4');
            if (true !== $result) {
                $this->error($result);
            }

            //保存数据
            $staff = new Staff();
            if ($staff->updatePass($data)) {
                $this->success('修改成功', 'staff/admin/welcome');
            } else {
                $this->error('修改失败');
            }

        } else {

            $login = new Login();
            $data['user_name'] = $login->getUserName();
            //不验证数据
            return view('update_password');
        }
    }

}