<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/12/31 0031
 * Time: 22:36
 */

namespace app\common\validate;


use think\Validate;

class Corpus extends Validate
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
            'title',
            'require|chsDash|max:1000',
            '匹配内容不能为空|匹配内容只能填写汉字、字母、数字和下划线_及破折号-|匹配内容长度超过限制'
        ],
        [
            'content',
            'require|chsDash|max:1000',
            '回复内容不能为空|回复内容只能填写汉字、字母、数字和下划线_及破折号-|回复内容长度超过限制'
        ],

    ];

    protected $scene = [
        'ck_id' => ['id'],
        'add' => ['__token__', 'id', 'title', 'content']
    ];


}