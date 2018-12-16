<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/11/14 0014
 * Time: 15:29
 */

namespace app\common\validate;


use think\Validate;

class ExampleStyle extends Validate
{

    protected $rule = [
        [
            '__token__',
            'require|token',
            '令牌必须存在|令牌无效,'
        ],
        [
            'id',
            'require|number',
            '样式ID必须存在|样式ID必须为数字'
        ],
        [
            'name',
            'require|chsDash|length:1,20',
            '样式名必须填写|样式名只能填写汉字、字母、数字和下划线_及破折号-|样式名长度只能在1~20个字符'
        ],
        [
            'color',
            'require|regex:color',
            '主题色必须填写|主题色必须为十六进制的颜色值，格式：#123456'
        ],
        [
            'icon_code',
            'require|max:3000',
            '挂件代码必须填写|挂件代码长度超过限制'
        ],
        [
            'invitation_code',
            'require|max:3000',
            '邀请框代码必须填写|邀请框代码长度超过限制'
        ],
        [
            'description',
            'max:300',
            '描述长度超过限制'
        ]
    ];

    protected $regex = ['color' => '^#[0-9a-fA-F]{6}$'];

    protected $scene = [
        'scene1' => ['id'],
        'add' => ['__token__', 'name', 'color', 'icon_code', 'invitation_code', 'description'],
        'save' => ['__token__', 'id', 'name', 'color', 'icon_code', 'invitation_code', 'description']
    ];

}