<?php

namespace app\common\model;


use think\Model;

class Staff extends Model
{

    protected $pk = 'id';

    /**
     * 注册
     * @param $data
     * @return false|int
     */
    public function regist($data)
    {
        $this->user_name = $data['user_name'];
        $this->e_mail = $data['e_mail'];
        $this->account = $data['user_name'];
        $this->password = password_encryption($data['password']);
        $this->power = $data['power'];
        return $this->save();
    }

    public function add($data)
    {
        $this->setAttr('name', $data['name']);
        $this->open = $data['open'];
        $this->user_name = $data['user_name'];
        $this->sex = $data['sex'];
        $this->account = $data['account'];
        $this->password = password_encryption($data['password']);
        $this->power = $data['power'];
        $this->description = $data['description'];
        return !!$this->save();
    }

    /**
     * 传入对象进行保存数据（修改）
     * @param $obj
     * @param $data
     * @return mixed
     */
    public function updateStaff($data)
    {
        $saveArr = [
            'name' => $data['name'],
            'open' => $data['open'],
            'sex' => $data['sex'],
            'description' => $data['description']
        ];

        if ($data['password'] != '') {//密码被修改了
            $saveArr['password'] = password_encryption($data['password']);//f28fed86680bea284cf0cfe0640ec4
        }

        return !!$this->save($saveArr, ['id' => $data['id'], 'account' => $data['user_name']]);
    }

    /**
     * 修改登录客服的资料
     * @param $obj
     * @param $data
     * @return mixed
     */
    public function updateStaffByLogin($data)
    {
        return !!$this->save([
            'name' => $data['name'],
            'sex' => $data['sex'],
            'description' => $data['description']
        ], [
            'user_name' => $data['user_name']
        ]);
    }

    /**
     * 修改密码
     * @param $obj
     * @param $data
     * @return mixed
     */
    public function updatePass($data)
    {
        return !!$this->save([
            'password' => password_encryption($data['password'])
        ], [
            'user_name' => $data['user_name']
        ]);
    }

}

