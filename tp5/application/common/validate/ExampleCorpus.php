<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/3/6 0006
 * Time: 14:03
 */

namespace app\common\validate;


use think\Validate;

class ExampleCorpus extends Validate
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
            'require|chsDash|max:60',
            '标题不能为空|标题只能填写汉字、字母、数字和下划线_及破折号-|标题长度超过限制'
        ],
        [
            'ask',
            'require|chsDash|max:150',
            '提问不能为空|提问只能填写汉字、字母、数字和下划线_及破折号-|提问长度超过限制'
        ],
        [
            'answer',
            'require|chsDash|max:3000',
            '回复内容不能为空|回复内容只能填写汉字、字母、数字和下划线_及破折号-|回复内容长度超过限制'
        ],
        [
            'example_id',
            'require|number',
            '实例ID不能为空|实例ID必须为数字'
        ],
    ];

    protected $scene = [
        'ck_id' => ['id'],
        'ck_ask' => ['ask'],
        'ck_answer' => ['answer'],
        'ck_example_id' => ['example_id'],
        'ck_example_id2' => ['__token__', 'example_id'],
        'ck_example_id3' => ['id', 'example_id'],
        'ck_example_id4' => ['__token__', 'id', 'example_id'],
    ];


}