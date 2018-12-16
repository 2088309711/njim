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

        $example = Example::get(['access' => $data['access']]);
        $style = ExampleStyle::get(['id' => $example->style_id, 'user_name' => $example->user_name]);

        echo 'nj_loading_settings(' . json_encode([
                'invitation_switch' => $example->invitation_switch,
                'invitation_first' => $example->invitation_first,
                'invitation_after' => $example->invitation_after,
                'invitation_num' => $example->invitation_num,
                'invitation_time' => $example->invitation_time,
                'invitation_week' => $example->invitation_week,
                'invitation_auto_close' => $example->invitation_auto_close,
                'color' => $style->color,
                'icon_code' => $style->icon_code,
                'invitation_code' => $style->invitation_code
            ]) . ')';
    }
}

