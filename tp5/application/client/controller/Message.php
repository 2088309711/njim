<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/30 0030
 * Time: 11:11
 */

namespace app\client\controller;

use app\common\model\Msg;
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
        $data['c_read'] = 1;

        // 储存客户消息
        $msg = new Msg($data);
        $msg->allowField(['client_id', 'staff_id', 'content', 'send_type',
            's_get', 'c_get', 's_read', 'c_read'])->save();


        //机器人回复
        $data['content'] = $this->getRobotSendContent($data['content']);
        $data['send_type'] = 2;

        //储存机器人消息
        $msg = new Msg($data);
        $msg->allowField(['client_id', 'staff_id', 'content', 'send_type',])->save();

    }

    /**
     * 获取机器人发送的内容
     * @param $ask
     */
    private function getRobotSendContent($ask)
    {


        return '机器人发送的内容';
    }

    /**
     * 使用莱文斯坦距离计算两个字符串的相似度
     * @param $str1
     * @param $str2
     */
    private function computeSimilarityDegree($str1, $str2)
    {

        //计算两个字符串的长度
        $len1 = mb_strlen($str1, 'utf-8');
        $len2 = mb_strlen($str2, 'utf-8');


        echo $len1;


//        ********************

        //建立数组，比字符长度大一个空间
        $dif = [];

        //赋初值，步骤B。
        for ($i = 0; $i <= $len1; $i++) {
            $dif[$i] = [$i];
        }

        for ($i = 0; $i <= $len2; $i++) {
            $dif[0][$i] = $i;
        }

        //2019-3-8 17:32:19 修改到此

        //计算两个字符是否一样，计算左上的值

        //根据字符串1的长度来遍历（行）
//        for (var i = 1; i <= len1; i++) {

        //根据字符串2的长度来遍历（列）
//        for (var j = 1; j <= len2; j++) {

        //取三个值中最小的
//            dif[i][j] = Math.min(
//                    dif[i - 1][j - 1] + (str1[i - 1] == str2[j - 1] ? 0 : 1),//左上角
//                    dif[i][j - 1] + 1,//左边
//                    dif[i - 1][j] + 1//上边
//                );

//        }
//        }

        //计算相似度
//        var similarity = 1 - dif[len1][len2] / Math.max(str1.length, str2.length);

//        log(similarity)

//        return similarity;

//        ********************


    }

    public function index()
    {
        $this->computeSimilarityDegree('字符串1', '字符串20');
    }

}