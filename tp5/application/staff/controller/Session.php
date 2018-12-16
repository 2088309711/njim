<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/18 0018
 * Time: 14:22
 */

namespace app\staff\controller;


class Session
{
    /**
     * 启动session
     */
    public static function startSession()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
    }
    
    /**
     * 销毁session
     */
    public static function destroySession()
    {
        self::startSession();
        session_destroy();
    }

}