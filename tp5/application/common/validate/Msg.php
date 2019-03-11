<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/11/1 0001
 * Time: 16:10
 */

namespace app\common\validate;


use think\Validate;

class Msg extends Validate
{
    protected $rule = [
        [
            'client_id',
            'require|alphaDash|length:40',
            '访客ID必须存在|访客ID只能为字母和数字，下划线_及破折号-|访客ID长度只能为40个字符'
        ],
        [
            'staff_id',
            'require|alphaDash|length:5,14',
            '客服ID必须存在|客服ID只能为字母和数字，下划线_及破折号-|客服ID长度只能为5~14个字符'
        ],
        [
            'example_id',
            'require|number',
            '实例ID不能为空|实例ID必须为数字'
        ],
    ];

    protected $scene = [
        'scene1' => ['client_id'],
        'get' => ['client_id', 'staff_id'],
        'send' => ['client_id', 'staff_id', 'example_id']
    ];

}