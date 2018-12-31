<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/12/31 0031
 * Time: 22:45
 */

namespace app\common\model;


use think\Model;

class CorpusData extends Model
{
    protected $pk = 'id';

    public function add($data)
    {
        $this->title = $data['title'];
        $this->content = $data['content'];
        $this->group_id = $data['id'];
        return !!$this->save();
    }

}