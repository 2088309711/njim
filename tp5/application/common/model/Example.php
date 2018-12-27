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

    public static $iconCode = '<div id="njim_open_click" style="width:80px; height:80px; position:fixed; bottom:50px; right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;"><img src="http://serve.njim.vip/static/images/staff-icon.png" style="position:absolute; top:13px; left:14px; width:50px; margin:0; padding:0;"/><span style="position:absolute; bottom:6px; color:#fff; text-align:center; width:100%; font:15px \'宋体\'; margin:0; padding:0;">在线客服</span></div>';
    public static $iconCodeM = '<div id="njim_open_click" style="width:50px; height:50px; position:fixed; top:80px; right:10px; background:{njim:color}; border-radius: 25px; margin:0; padding:0;"><img src="http://serve.njim.vip/static/images/staff-icon.png" style="position:absolute; top:16px; left:10px; width:30px; margin:0; padding:0;"/></div>';
    public static $invitationCode = '<div style="width: 340px; height: 200px; background: #282828 url(http://serve.njim.vip/static/images/invitation.jpg) no-repeat;position: fixed; top:50%; left:50%; margin: -100px 0 0 -170px;"><div style="position: absolute;bottom: 5px;right: 5px;"><button id="njim_invitation_open_chat" style="float: left; margin: 5px; border: 1px solid #b3a800;background: #fff000; padding: 3px 10px; font:12px \'宋体\'; color: #333;">现在咨询</button><button id="njim_invitation_continue" style="float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;">稍后再说</button><button id="njim_invitation_close" style="float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;">不在提示</button></div></div>';
    public static $invitationCodeM = '<div style="width: 100%; height: 200px; background: #00bdff; position: fixed; top:0; left:0;"><div id="njim_invitation_icon" style="background: url(http://serve.njim.vip/static/images/icon-desktop.png) -24px -150px no-repeat; width: 16px; height: 16px; position: absolute; top:10px; right:10px;"></div><div style="color:#fff; font: 20px \'微软雅黑\'; text-align: center; margin-top: 80px;">搜索百遍？不如咨询一遍！</div><div style="position: absolute;bottom: 5px;right: 5px;"><button id="njim_invitation_open_chat" style="float: left; margin: 5px; border: 1px solid #fff;background: #fff; padding: 3px 10px; font:12px \'宋体\'; color: #007cff;">现在咨询</button><button id="njim_invitation_continue"style="float: left; margin: 5px; border: 1px solid #fff;background: #00bdff; padding: 3px 10px; font:12px \'宋体\'; color: #fff;">稍后再说</button><button id="njim_invitation_close" style="float: left; margin: 5px; border: 1px solid #fff;background: #00bdff; padding: 3px 10px; font:12px \'宋体\'; color: #fff;">不在提示</button></div></div>';

    public function add($staff)
    {
        $this->state = 1;
        $this->setAttr('name', '系统自动配置的实例');
        $this->user_name = $staff->user_name;
        $this->access = uniqid();
        $this->description = '系统自动配置的实例，请根据实际需求修改。';
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
        $this->color = '#007aff';
        $this->color_m = '#007aff';
        $this->icon_code = self::$iconCode;
        $this->icon_code_m = self::$iconCodeM;
        $this->invitation_code = self::$invitationCode;
        $this->invitation_code_m = self::$invitationCodeM;
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