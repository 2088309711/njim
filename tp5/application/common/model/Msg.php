<?php

namespace app\common\model;

use think\Model;

class Msg extends Model
{
    protected $pk = 'id';

    public function saveMsg($data)
    {
        $this->client_id = $data['client_id'];
        $this->staff_id = $data['staff_id'];
        $this->content = $data['content'];
        $this->send_type = $data['send_type'];
        if ($data['send_type'] === 1) {//客服已读
            $this->s_read = 1;
        } else {//客户已读
            $this->c_read = 1;
        }
        return !!$this->save();
    }


    public function setMsgGet($data, $type)
    {
        for ($i = 0; $i < count($data['old_msg_ids']); $i++) {
            $data['old_msg_ids'][$i] = trim($data['old_msg_ids'][$i]);
            if (preg_match('/^\d+$/', $data['old_msg_ids'][$i])) {
                $obj = new self();
                $temp = [
                    'id' => $data['old_msg_ids'][$i],
                    'staff_id' => $data['staff_id']
                ];
                if ($type == 'c') {//仅限访客
                    $temp['client_id'] = $data['client_id'];
                }
                $obj->save([$type . '_get' => 1], $temp);
            }
        }
    }


    public function setMsgRead($data, $type)
    {
        $obj = new self();
        $obj->save([$type . '_read' => 1], [
            'staff_id' => $data['staff_id'],
            'client_id' => $data['client_id'],
            $type . '_get' => 1,
            $type . '_read' => 0,
        ]);
    }

    public function getMsgByClient($data)
    {
        if ($data['get_type'] === 'o') {
            // get limit old msg
            return $this->where('client_id', $data['client_id'])
                ->where('staff_id', $data['staff_id'])
                ->where('c_get', 1)
                ->order('id', 'desc')
                ->limit(20)->select();
        } else {
            // get new msg
            return $this->where('client_id', $data['client_id'])
                ->where('staff_id', $data['staff_id'])
                ->where('c_get', 0)->select();
        }
    }

    public function getMsgByStaff($data, $client_id)
    {
        return $this->where('client_id', $client_id)
            ->where('staff_id', $data['staff_id'])
            ->where('s_get', $data['get_type'] === 'n' ? 0 : 1)
            ->limit(50)->order('id', 'desc')->select();
    }


    public function countUnreadNum($data, $client_id)
    {
        return self::where('client_id', $client_id)
            ->where('staff_id', $data['staff_id'])
            ->where('s_read', 0)->count();
    }

}

