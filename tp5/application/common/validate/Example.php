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
            '实例ID不能为空|实例ID必须为数字'
        ],
        [
            'state',
            'require|in:0,1',
            '功能状态不能为空|功能状态必须为启用或禁用'
        ],
        [
            'name',
            'require|chsDash|max:20',
            '名称不能为空|名称只能填写汉字、字母、数字和下划线_及破折号-|名称长度超过限制'
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
            'color',
            'require|regex:color',
            'PC端主题色不能为空|PC端主题色必须为十六进制的颜色值，格式：#123456'
        ],
        [
            'color_m',
            'require|regex:color',
            '移动端主题色不能为空|移动端主题色必须为十六进制的颜色值，格式：#123456'
        ],
        [
            'icon_code',
            'require|max:3000',
            'PC端挂件代码不能为空|PC端挂件代码长度超过限制'
        ],
        [
            'icon_code_m',
            'require|max:3000',
            '移动端挂件代码不能为空|移动端挂件代码长度超过限制'
        ],
        [
            'invitation_code',
            'require|max:3000',
            'PC端邀请框代码不能为空|PC端邀请框代码长度超过限制'
        ],
        [
            'invitation_code_m',
            'require|max:3000',
            '移动端邀请框代码不能为空|移动端邀请框代码长度超过限制'
        ],
        [
            'invitation_switch',
            'require|in:0,1',
            'PC端邀请功能状态不能为空|PC端邀请功能状态只能为启用或禁用'
        ],
        [
            'invitation_switch_m',
            'require|in:0,1',
            'PC端邀请功能状态不能为空|PC端邀请功能状态只能为启用或禁用'
        ],
        [
            'invitation_first',
            'require|number',
            'PC端首次邀请延迟不能为空|PC端首次邀请延迟必须为数字'
        ],
        [
            'invitation_first_m',
            'require|number',
            '移动端首次邀请延迟不能为空|移动端首次邀请延迟必须为数字'
        ],
        [
            'invitation_after',
            'require|number',
            'PC端后续邀请延迟不能为空|PC端后续邀请延迟必须为数字'
        ],
        [
            'invitation_after_m',
            'require|number',
            '移动端后续邀请延迟不能为空|移动端后续邀请延迟必须为数字'
        ],
        [
            'invitation_num',
            'require|number',
            'PC端邀请次数不能为空|PC端邀请次数必须为数字'
        ],
        [
            'invitation_num_m',
            'require|number',
            '移动端邀请次数不能为空|移动端邀请次数必须为数字'
        ],
        [
            'invitation_week',
            'regex:week_frame',
            'PC端邀请星期范围格式错误'
        ],
        [
            'invitation_week_m',
            'regex:week_frame',
            '移动端邀请星期范围格式错误'
        ],
        [
            'invitation_time',
            'require|regex:time_frame',
            'PC端邀请时间范围不能为空|PC端邀请时间范围填写错误'
        ],
        [
            'invitation_time_m',
            'require|regex:time_frame',
            '移动端邀请时间范围不能为空|移动端邀请时间范围填写错误'
        ],
        [
            'invitation_auto_close',
            'require|number',
            'PC端邀请框自动关闭延迟不能为空|PC端邀请框自动关闭延迟必须为数字'
        ],
        [
            'invitation_auto_close_m',
            'require|number',
            '移动端邀请框自动关闭延迟不能为空|移动端邀请框自动关闭延迟必须为数字'
        ],
        [
            'staff_pk',
            'regex:staff_pk_frame',
            '参与客服格式错误'
        ]
    ];

    protected $regex = [
        'time_frame' => '^([0-1]\d|2[0-3])(:[0-5]\d){2}-([0-1]\d|2[0-3])(:[0-5]\d){2}$',//有效时间范围
        'color' => '^#[a-fA-F\d]{6}?$',
        'week_frame' => '^([1-7]\|){0,6}[1-7]?$',//一周范围
        'staff_pk_frame' => '^([1-9]\d*\|)*([1-9]\d*)*$',//客服ID
    ];

    protected $scene = [
        'state' => ['id', 'state'],
        'name' => ['id', 'name'],
        'description' => ['id', 'description'],
        'color' => ['id', 'color'],
        'color_m' => ['id', 'color_m'],
        'icon_code' => ['id', 'icon_code'],
        'icon_code_m' => ['id', 'icon_code_m'],
        'invitation_code' => ['id', 'invitation_code'],
        'invitation_code_m' => ['id', 'invitation_code_m'],
        'invitation_switch' => ['id', 'invitation_switch'],
        'invitation_switch_m' => ['id', 'invitation_switch_m'],
        'invitation_time' => ['id', 'invitation_time'],
        'invitation_time_m' => ['id', 'invitation_time_m'],
        'invitation_week' => ['id', 'invitation_week'],
        'invitation_week_m' => ['id', 'invitation_week_m'],
        'invitation_num' => ['id', 'invitation_num'],
        'invitation_num_m' => ['id', 'invitation_num_m'],
        'invitation_first' => ['id', 'invitation_first'],
        'invitation_first_m' => ['id', 'invitation_first_m'],
        'invitation_after' => ['id', 'invitation_after'],
        'invitation_after_m' => ['id', 'invitation_after_m'],
        'invitation_auto_close' => ['id', 'invitation_auto_close'],
        'invitation_auto_close_m' => ['id', 'invitation_auto_close_m'],
        'staff_pk' => ['id', 'staff_pk'],
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