<?php

namespace app\staff\controller;

use app\common\model\Msg;
use app\common\model\ServerList;
use think\Controller;
use think\Request;

class Chat extends Controller
{

    public function index()
    {
        $login = new Login();
        $staff = $login->getUserData();//获取staff数据
        return view('chat', ['staff' => $staff]);
    }

    public function getMsg()
    {
        $login = new Login();
        $data = [
            'staff_id' => $login->getUserName(),//客服ID
            'get_type' => Request::instance()->param('t'),//获取消息类型new|old(n|o)
            'client_id' => Request::instance()->param('r'),//窗口显示的访客ID
            'old_msg_ids' => explode(":", Request::instance()->param('b', '')),//反馈的旧消息ID数组
        ];


        $msg = new Msg();
        if ($data['client_id'] !== '-') {
            $result = $this->validate($data, 'Msg.scene1');
            if (true !== $result) {
                echo $result;
                return;
            }
            $msg->setMsgRead($data, 's');
        }

        // 将反馈的消息设置为已接收
        $msg->setMsgGet($data, 's');

        // 获取服务列表
        $sl = new ServerList();
        $serverList = $sl->where('staff_id', $data['staff_id'])->select();

        // 遍历服务列表
        $clientList = []; // 客户列表
        $messages = []; // 所有聊天数据
        foreach ($serverList as $i => $client) {


            //保存到客户列表
            $clientList[] = [
                'name' => $client->name,
                'client_id' => $client->client_id,
                'active_time' => $client->active_time,
                'unread_num' => $msg->countUnreadNum($data, $client->client_id),// 统计未读数量
                'blacklist' => $client->blacklist
            ];


            // 获取与之相关的聊天记录
            $msgList = $msg->getMsgByStaff($data, $client->client_id);

            foreach ($msgList as $j => $msg) {
                $messages[] = [
                    'id' => $msg->id,
                    'client_id' => $msg->client_id,
                    'content' => $msg->content,
                    'send_type' => $msg->send_type,
                    'create_time' => $msg->create_time,
                    's_read' => $msg->s_read
                ];
            }
        }
        echo json_encode(['client_list' => $clientList, 'messages' => $messages]);
    }

    public function sendMsg()
    {
        $data = input('post.');
        $login = new Login();
        $data['staff_id'] = $login->getUserName();

        $result = $this->validate($data, 'Msg.scene1');
        if (true !== $result) {
            echo $result;
            return;
        }

        $data['send_type'] = 1;

        $msg = new Msg();
        echo json_encode(['succ' => $msg->saveMsg($data)]);

    }

    public function remarks()
    {
        $data = input();
        $login = new Login();
        $data['staff_id'] = $login->getUserName();

        $result = $this->validate($data, 'ServerList.scene3');
        if (true !== $result) {
            echo $result;
            return;
        }

        $sl = new ServerList();
        $sl->save(['name' => $data['name']], ['client_id' => $data['client_id'], 'staff_id' => $data['staff_id']]);
    }

    //黑名单加入/移出
    public function blacklist()
    {
        $data = input();

        $result = $this->validate($data, 'ServerList.scene4');
        if (true !== $result) {
            $this->error($result);
        }

        $sl = new ServerList();
        if ($data['pull_black'] == 'y') {//拉黑
            $sl->save(['blacklist' => 1], ['client_id' => $data['client_id']]);
        } elseif ($data['pull_black'] == 'n') {//移出黑名单
            $sl->save(['blacklist' => 0], ['client_id' => $data['client_id']]);
        }
    }

}

