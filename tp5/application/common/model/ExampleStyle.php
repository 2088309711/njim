<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/18 0018
 * Time: 11:21
 */

namespace app\common\model;


use think\Model;

class ExampleStyle extends Model
{
    protected $pk = 'id';


    public function add($data)
    {
        $this->setAttr('name', $data['name']);
        $this->user_name = $data['user_name'];
        $this->color = $data['color'];
        $this->icon_code = $data['icon_code'];
        $this->invitation_code = $data['invitation_code'];
        $this->style_type = $data['style_type'];
        $this->description = $data['description'];
        return !!$this->save();
    }

    public function saveData($data)
    {
        return !!$this->save([
            'name' => $data['name'], 'description' => $data['description'],
            'color' => $data['color'], 'icon_code' => $data['icon_code'],
            'invitation_code' => $data['invitation_code']
        ], ['id' => $data['id'], 'user_name' => $data['user_name']]);
    }

}