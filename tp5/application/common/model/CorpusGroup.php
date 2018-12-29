<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/12/29 0029
 * Time: 16:59
 */

namespace app\common\model;


use think\Model;

class CorpusGroup extends Model
{
    protected $pk = 'id';

    public function add($data)
    {
        $this->setAttr('name', $data['name']);
        $this->user_name = $data['user_name'];
        return !!$this->save();
    }

}