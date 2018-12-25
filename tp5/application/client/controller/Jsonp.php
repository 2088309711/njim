<?php

namespace app\client\controller;

use app\common\model\Example;
use app\common\model\ExampleStyle;
use app\common\model\MainBody;
use think\Controller;

class Jsonp extends Controller
{

    /**
     * 获取访客端需要的设置
     * @return array|string|true
     * @throws \think\exception\DbException
     */
    public function getSettings()
    {
        $data = input();
        $result = $this->validate($data, 'ServerList.scene2');
        if (true !== $result) {
            return $result;
        }

        $example = Example::get(['access' => $data['access'], 'state' => 1]);

        if ($example != null) {//实例可用
            $result = ['state' => 1];
            if ($data['is_phone'] === 'y') {//移动端
                $result['invitation_switch'] = $example->invitation_switch_m;
                $result['invitation_first'] = $example->invitation_first_m;
                $result['invitation_after'] = $example->invitation_after_m;
                $result['invitation_num'] = $example->invitation_num_m;
                $result['invitation_time'] = $example->invitation_time_m;
                $result['invitation_week'] = $example->invitation_week_m;
                $result['invitation_auto_close'] = $example->invitation_auto_close_m;
                $result['color'] = $example->color_m;
                $result['icon_code'] = $example->icon_code_m;
                $result['invitation_code'] = $example->invitation_code_m;
            } else {//PC端
                $result['invitation_switch'] = $example->invitation_switch;
                $result['invitation_first'] = $example->invitation_first;
                $result['invitation_after'] = $example->invitation_after;
                $result['invitation_num'] = $example->invitation_num;
                $result['invitation_time'] = $example->invitation_time;
                $result['invitation_week'] = $example->invitation_week;
                $result['invitation_auto_close'] = $example->invitation_auto_close;
                $result['color'] = $example->color;
                $result['icon_code'] = $example->icon_code;
                $result['invitation_code'] = $example->invitation_code;
            }
        } else {//实例不存在或被禁用
            $result = ['state' => 0];
        }

        echo 'nj_loading_settings(' . json_encode($result) . ')';
    }
}

