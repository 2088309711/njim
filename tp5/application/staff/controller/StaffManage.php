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
        return view('index');
    }


    public function create()
    {
        $login = new Login();
        $login->getUserName(true);
        return view('create');
    }


    /**
     * 获取一个账户下的所有客服（AJAX）
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getAllStaffByUser()
    {
        $login = new Login();
        $data = ['user_name' => $login->getUserName(true)];

        $staff = new Staff();
        $list = $staff->where('account', $data['user_name'])->select();

        $jsonArr = [];
        foreach ($list as $key => $item) {
            $jsonArr[] = [
                'id' => $item->id,
                'open' => $item->open,
                'name' => $item->name,
                'sex' => $item->sex,
                'user_name' => $item->user_name,
                'power' => $item->power,
                'update_time' => $item->update_time,
            ];
        }

        echo json_encode([
            'code' => 0,
            'msg' => '',
            'count' => count($jsonArr),
            'data' => $jsonArr
        ]);
    }

    /**
     * 添加
     */
    public function addStaff()
    {
        $data = input('post.');
        $login = new Login();
        $data['account'] = $login->getUserName(true);

        $data['open'] = isset($data['open']) ? $data['open'] : 0;

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

    }

    /**
     * 删除一个
     * @throws \think\exception\DbException
     */
    public function delStaff()
    {
        $data = input();

        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //验证数据
        $result = $this->validate($data, 'Staff.scene1');
        if (true !== $result) {
            $this->error($result);
        }

        $staff = Staff::get($data['id']);
        if ($data['user_name'] === $staff->account && $staff->user_name != $staff->account) {
            $staff->delete();
        }

    }


    /**
     * 客服数据单项修改
     * @throws \think\exception\DbException
     */
    public function updateOpen()
    {
        $data = input();
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        $result = $this->validate($data, 'Staff.update_open');
        if (true !== $result) {
            $this->error($result);
        }

        $staff = new Staff();
        $staff->save([
            'open' => $data['open']
        ], [
            'id' => $data['id'],
            'account' => $data['user_name']
        ]);
    }


    /**
     * 修改
     * @return \think\response\View|void
     * @throws \think\exception\DbException
     */
    public function updateStaff()
    {
        $data = input();
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //验证数据
        $result = $this->validate($data, 'Staff.scene1');
        if (true !== $result) {
            $this->error($result);
        }

        $staff = Staff::get([
            'id' => $data['id'],
            'account' => $data['user_name']
        ]);

        return view('update', ['staff' => $staff]);
    }


    /**
     * 修改当前登录的客服
     * @return \think\response\View|void
     * @throws \think\exception\DbException
     */
    public function updateStaffByLogin()
    {
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //不验证数据

        $staff = Staff::get([
            'user_name' => $data['user_name']
        ]);

        return view('update_login', ['staff' => $staff]);
    }


    /**
     * 修改当前登录的密码
     * @return \think\response\View|void
     * @throws \think\exception\DbException
     */
    public function updatePass()
    {
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);
        //不验证数据
        return view('update_password');
    }

    /**
     * 保存客服
     */
    public function saveStaff()
    {

        $data = input('post.');
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //选择验证场景
        $data['scene'] = $data['password'] == '' ? 'save1' : 'save2';

        //open赋初始值
        $data['open'] = isset($data['open']) ? $data['open'] : 0;

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
    }


    /**
     * 保存客服
     */
    public function saveStaffByLogin()
    {
        $data = input('post.');
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

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
    }

    /**
     * 保存密码
     */
    public function savePass()
    {
        $data = input('post.');
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

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
    }


    public function viewStaff()
    {
        $data = input();
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //验证数据
        $result = $this->validate($data, 'Staff.scene1');
        if (true !== $result) {
            $this->error($result);
        }

        $staff = Staff::get([
            'id' => $data['id'],
            'account' => $data['user_name']
        ]);
        if ($staff != null) {
            return view('view', ['staff' => $staff]);
        } else {
            $this->error('客服不存在');
        }
    }

}