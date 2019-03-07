<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/12/31 0031
 * Time: 22:45
 */

namespace app\common\model;


use think\Model;

class ExampleCorpus extends Model
{
    protected $pk = 'id';

    public function add($data)
    {
        $this->title = $data['title'];
        $this->ask = $data['ask'];
        $this->text = $data['text'];
        $this->example_id = $data['example_id'];
        return !!$this->save();
    }

    public function edit($data)
    {
        return $this->allowField(true)->save($data, ['id' => $data['id'], 'example_id' => $data['example_id']]);
    }


}