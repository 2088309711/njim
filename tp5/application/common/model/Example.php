<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/18 0018
 * Time: 11:03
 */

namespace app\common\model;


use think\Model;

class Example extends Model
{
    protected $pk = 'id';

    public function add($data)
    {
        $this->setAttr('name', $data['name']);
        $this->user_name = $data['user_name'];
        $this->access = $data['access'];
        $this->style_id = $data['style_id'];
        $this->description = $data['description'];
        $this->staff_pk = $data['staff_pk'];
        $this->invitation_switch = $data['invitation_switch'];
        $this->invitation_first = $data['invitation_first'];
        $this->invitation_after = $data['invitation_after'];
        $this->invitation_num = $data['invitation_num'];
        $this->invitation_time = $data['invitation_time'];
        $this->invitation_week = $data['invitation_week'];
        $this->invitation_auto_close = $data['invitation_auto_close'];
        return !!$this->save();
    }

    /**
     * 保存实例
     * @param $data
     * @return bool
     */
    public function saveExample($data)
    {
        return !!$this->save([
            'name' => $data['name'],
            'style_id' => $data['style_id'],
            'description' => $data['description'],
            'staff_pk' => $data['staff_pk'],
            'invitation_switch' => $data['invitation_switch'],
            'invitation_first' => $data['invitation_first'],
            'invitation_after' => $data['invitation_after'],
            'invitation_num' => $data['invitation_num'],
            'invitation_time' => $data['invitation_time'],
            'invitation_week' => $data['invitation_week'],
            'invitation_auto_close' => $data['invitation_auto_close'],
        ], [
            'id' => $data['id'],
            'user_name' => $data['user_name']
        ]);
    }

}