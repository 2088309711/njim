<?php

namespace app\common\util;

/**
 * 杂项
 * Class SundryUtil
 * @package app\util
 */
class SundryUtil
{

    /**
     * 密码混淆
     * @param $password
     * @return string
     */
    public function pwdConfusion($password)
    {
        $pwdMd5 = md5($password);

        $pwdChar = [];
        for ($i = 0; $i < 32; $i++) {
            $pwdChar[$i] = substr($pwdMd5, $i, 1);
        }

        //密文顺序
        $passOrder = [14, 12, 7, 14, 25, 9, 7, 22, 3, 18, 11, 20, 13, 28, 12,
            29, 30, 24, 14, 1, 5, 8, 13, 10, 15, 17, 10, 13, 26, 17];

        $newPass = '';
        for ($i = 0; $i < count($passOrder); $i++) {
            $newPass .= $pwdChar[$passOrder[$i]];
        }

        return $newPass;// 返回打乱顺序的30位密码
    }
}

