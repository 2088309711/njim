<?php

namespace app\common\model;

use think\Model;

/**
 * 服务队列模型
 */
class ServerList extends Model
{
    protected $pk = 'id';

    public function add($data)
    {
        $this->access = $data['access'];
        $this->client_id = $data['client_id'];
        $this->staff_id = $data['staff_id'];
        $this->active_time = $data['active_time'];
        return !!$this->save();
    }

    public function getLastSession($data)
    {
        return $this
            ->where('client_id', $data['client_id'])
            ->order('id', 'desc')
            ->find();
    }


}

