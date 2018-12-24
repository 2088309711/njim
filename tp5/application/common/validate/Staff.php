<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/30 0030
 * Time: 17:01
 */

namespace app\common\validate;


use think\Validate;

class Staff extends Validate
{
    protected $rule = [
        [
            '__token__',
            'require|token',
            '令牌必须存在|令牌无效'
        ],
        [
            'id',
            'require|number',
            '客服ID必须存在|客服ID必须为数字'
        ],
        [
            'open',
            'require|in:0,1',
            '客服状态必须存在|客服状态必须为0或1'
        ],
        [
            'name',
            'chsDash|max:18',
            '名称只能填写汉字、字母、数字和下划线_及破折号-|名称长度超过限制'
        ],
        [
            'sex',
            'require|in:0,1,2',
            '性别必须存在|性别必须为0、1、2'
        ],
        [
            'user_name',
            'require|alphaDash|length:5,14',
            '用户名必须存在|用户名只能为字母和数字，下划线_及破折号-|用户名长度只能为5~14个字符'
        ],
        [
            'e_mail',
            'require|email',
            '邮箱不能为空|邮箱格式有误'
        ],
        [
            'password',
            'require|alphaDash|length:6,16',
            '密码必须填写|密码只能为字母和数字，下划线_及破折号-|密码长度只能为6~16个字符'
        ],
        [
            'repassword',
            'require|confirm:password',
            '必须确认密码|两次输入的密码不一致'
        ],
        [
            'agreement',
            'require|accepted',
            '服务协议必须|必须勾选同意服务协议才能注册'
        ],
        [
            'description',
            'max:300',
            '描述长度超过限制'
        ]
    ];

    protected $scene = [
        'scene1' => ['id'],
        'scene2' => ['e_mail'],
        'login' => ['__token__', 'user_name', 'password'],
        'regist' => ['__token__', 'e_mail', 'user_name', 'password', 'repassword', 'agreement'],
        'resetPass' => ['__token__', 'e_mail', 'password', 'repassword'],
        'ck_user_name' => ['user_name'],
        'update_open' => ['id', 'open'],
        'add' => ['__token__', 'open', 'name', 'sex', 'user_name', 'password', 'description'],
        'save1' => ['__token__', 'id', 'open', 'name', 'sex', 'description'],
        'save2' => ['__token__', 'id', 'open', 'name', 'sex', 'password', 'description'],
        'save3' => ['__token__', 'name', 'sex', 'description'],
        'save4' => ['__token__', 'password', 'repassword']
    ];

}