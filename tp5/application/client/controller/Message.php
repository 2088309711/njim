<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/30 0030
 * Time: 11:11
 */

namespace app\client\controller;

use app\common\model\Msg;
use app\common\model\ServerList;
use app\common\util\DateUtil;
use think\Controller;
use think\Request;

class Message extends Controller
{


    public function get()
    {
        //http://serve.njim.vip/index.php/client/message/get/s/123456789/c/THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17/t/o/b/
        $data = [
            'client_id' => Request::instance()->param('c'),
            'staff_id' => Request::instance()->param('s'),
            'get_type' => Request::instance()->param('t'),
            'old_msg_ids' => explode(":", Request::instance()->param('b'))
        ];

        $result = $this->validate($data, 'Msg');
        if (true !== $result) {
            return $result;
        }

        // 将反馈的消息设置为已读
        $msg = new Msg();
        $msg->setMsgGet($data, 'c');

        // 获取消息
        $list = $msg->getMsgByClient($data);

        // 遍历数据，存入统一数组
        $messages = [];
        foreach ($list as $key => $m) {
            $messages[] = [
                'id' => $m->id,
                'content' => $m->content,
                'send_type' => $m->send_type,
                'send_time' => $m->create_time,
            ];
        }

        echo json_encode($messages); // JSON序列化
    }


    public function send()
    {
        $data = input('post.');

        $result = $this->validate($data, 'Msg');
        if (true !== $result) {
            return $result;
        }

        $data['send_type'] = 0;

        // 储存
        $msg = new Msg();
        $msg->saveMsg($data);
    }

}