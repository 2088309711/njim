<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/12/29 0029
 * Time: 17:00
 */

namespace app\common\validate;


use think\Validate;

class CorpusGroup extends Validate
{
    protected $rule = [
        [
            '__token__',
            'require|token',
            '令牌不能为空|令牌无效'
        ],
        [
            'id',
            'require|number',
            'ID不能为空|ID必须为数字'
        ],
        [
            'name',
            'require|chsDash|max:30',
            '名称不能为空|名称只能填写汉字、字母、数字和下划线_及破折号-|名称长度超过限制'
        ]
    ];

    protected $scene = [
        'add' => ['__token__', 'name'],
        'ck_id' => ['id'],
        'update' => ['__token__', 'id', 'name']
    ];
}