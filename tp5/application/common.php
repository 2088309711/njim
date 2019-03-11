<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

/**
 * 密码加密
 * @param $pwd
 * @return string 密文
 */
function password_encryption($pwd)
{
    $char = str_split(md5($pwd));

    //密文顺序
    $order = [14, 12, 7, 14, 25, 9, 7, 22, 3, 18, 11, 20, 13, 28, 12,
        29, 30, 24, 14, 1, 5, 8, 13, 10, 15, 17, 10, 13, 26, 17];

    //组合字符
    $new = '';
    for ($i = 0; $i < count($order); $i++) {
        $new .= $char[$order[$i]];
    }

    return $new;// 返回30位密文
}

/**
 * 字符串转时间戳
 * @param $time
 * @return false|int
 */
function str_to_time_stamp($time)
{
    return strtotime($time);
}

/**
 * 时间戳转字符串
 * @param $time
 * @return false|string
 */
function time_stamp_to_str($time)
{
    return date("Y-m-d H:i:s", $time);
}


/**
 * 将带中文的字符串转字符数组
 * @param $str
 * @return array[]|false|string[]
 */
function mb_str_split($str)
{
    return preg_split('/(?<!^)(?!$)/u', $str);
}