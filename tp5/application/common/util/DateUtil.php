<?php

namespace app\common\util;

class DateUtil
{

    /**
     * 字符串转时间戳
     * @param $time
     * @return string
     */
    public function strToTimeStamp($time)
    {
        return strtotime($time);
    }

    /**
     * 时间戳转字符串
     * @param $time
     * @return false|string
     */
    public function timeStampToStr($time)
    {
        return date("Y-m-d H:i:s", $time);
    }
}
