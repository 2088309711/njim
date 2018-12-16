<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/11/6 0006
 * Time: 10:17
 */

namespace app\common\validate;


use think\Validate;

class ServerList extends Validate
{

    protected $rule = [
        [
            'access',
            'require|alphaNum|length:13',
            '接入口必须存在|接入口只能由字母和数字组成|接入口长度为13个字符'
        ],
        [
            'client_id',
            'require|alphaDash|length:40',
            '访客ID必须存在|访客ID只能为字母和数字，下划线_及破折号-|访客ID长度只能为40个字符'
        ],
        [
            'name',
            'chsDash|max:18',
            '名称只能填写汉字、字母、数字和下划线_及破折号-|名称长度超过限制'
        ],
    ];


    protected $scene = [
        'scene1' => ['access', 'client_id'],
        'scene2' => ['access'],
        'scene3' => ['client_id', 'name']
    ];


}