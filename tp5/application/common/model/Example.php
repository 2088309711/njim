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

    public function add($staff)
    {
        $this->state = 1;
        $this->setAttr('name', '系统自动填写的实例');
        $this->user_name = $staff->user_name;
        $this->access = uniqid();
        $this->description = '系统自动填写的实例，请根据实际需求修改。';
        $this->staff_pk = $staff->id;
        $this->invitation_switch = 1;
        $this->invitation_switch_m = 1;
        $this->invitation_first = 10;
        $this->invitation_first_m = 10;
        $this->invitation_after = 20;
        $this->invitation_after_m = 20;
        $this->invitation_num = 0;
        $this->invitation_num_m = 0;
        $this->invitation_time = '00:00:00-23:59:59';
        $this->invitation_time_m = '00:00:00-23:59:59';
        $this->invitation_week = '7|1|2|3|4|5|6';
        $this->invitation_week_m = '7|1|2|3|4|5|6';
        $this->invitation_auto_close = 0;
        $this->invitation_auto_close_m = 0;
        $this->color = '#ff0000';
        $this->color_m = '#ff0000';
        $this->icon_code = 'code';
        $this->icon_code_m = 'code';
        $this->invitation_code = 'code';
        $this->invitation_code_m = 'code';
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