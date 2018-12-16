<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/18 0018
 * Time: 11:53
 */

namespace app\common\validate;


use think\Validate;

class Example extends Validate
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
            '实例ID必须存在|实例ID必须为数字'
        ],
        [
            'name',
            'require|chsDash|length:1,20',
            '实例名必须填写|实例名只能填写汉字、字母、数字和下划线_及破折号-|实例名长度只能在1~20个字符'
        ],
        [
            'style_id',
            'require|number|min:1',
            '样式ID必须填写|样式ID只能是数字|样式ID最小长度为1'
        ],
        [
            'description',
            'max:300',
            '描述长度超过限制'
        ],
        [
            'invitation_switch',
            'require|in:0,1',
            '邀请开关必须存在|邀请开关必须为0或1'
        ],
        [
            'invitation_first',
            'require|number',
            '首次邀请延迟必须存在|首次邀请延迟必须为数字'
        ],
        [
            'invitation_after',
            'require|number',
            '后续邀请延迟必须存在|后续邀请延迟必须为数字'
        ],
        [
            'invitation_num',
            'require|number',
            '邀请次数必须存在|邀请次数必须为数字'
        ],
        [
            'invitation_time',
            'require|regex:time_frame',
            '邀请功能时间范围必须存在|邀请功能时间范围格式错误'
        ],
        [
            'invitation_auto_close',
            'require|number',
            '自动关闭邀请必须存在|自动关闭邀请必须为数字'
        ]
    ];

    protected $regex = ['time_frame' => '^[0-9]{2}:[0-9]{2}:[0-9]{2} - [0-9]{2}:[0-9]{2}:[0-9]{2}$'];

    protected $scene = [
        'scene1' => ['id'],
        'add' => [
            '__token__', 'name', 'style_id', 'description', 'invitation_switch', 'invitation_first',
            'invitation_after', 'invitation_num', 'invitation_time', 'invitation_auto_close'
        ],
        'save' => [
            '__token__', 'id', 'name', 'style_id', 'description', 'invitation_switch', 'invitation_first',
            'invitation_after', 'invitation_num', 'invitation_time', 'invitation_auto_close'
        ]
    ];

}