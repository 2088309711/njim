<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/1/12 0012
 * Time: 10:37
 */

namespace app\index\controller;


use think\Controller;

class Lottery extends Controller
{


    public function index()
    {

        $t = time();

        $url = 'https://www.sh1333.com/static/data/80CurIssue.json?_t=' . $t;
//        $url = 'https://www.rd2255.com/static/data/80CurIssue.json?_t=' . $t;
//        $url = 'http://www.9h991.com/static/data/80CurIssue.json?_t=' . $t;
//        $url = 'https://api.speedlottery.com/data/racing/last.xml?_t=' . $t;
//        $url = 'https://api.cp987a.com/data/jspk10/last.json?_t=' . $t;


        return $this->getHttpsData($url);

    }

    /**
     * http://njim.com/index/Lottery/getSecondSpeedRacingData
     */
    public function getSecondSpeedRacingData()
    {
        $t = time();
        $this->outJSON('https://www.sh1333.com/static/data/80CurIssue.json?_t=' . $t);
        $this->outJSON('http://www.9h991.com/static/data/80CurIssue.json?_t=' . $t);
        $this->outJSON('https://www.rd2255.com/static/data/80CurIssue.json?_t=' . $t);
        $this->outJSON('https://www.zg579.com/static/data/80CurIssue.json?_t=' . $t);
        $this->outJSON('https://www.sx6767.com/static/data/80CurIssue.json?_t=' . $t);
        $this->outJSON('https://www.zc535.com/static/data/80CurIssue.json?_t=' . $t);
        $this->outJSON('https://www.hrcp666.com/static/data/80CurIssue.json?_t=' . $t);
        $this->outJSON('https://www.pg8806.com/static/data/80CurIssue.json?_t=' . $t);
        $this->outJSON('https://www.rgcp333.com/static/data/80CurIssue.json?_t=' . $t);
        $this->outJSON('https://www.666b9.com/static/data/80CurIssue.json?_t=' . $t);
    }


    private function outJSON($url)
    {
        $json = $this->getHttpsData($url);
        if (json_decode($json) != null) {
            echo $json;
            die;
        }
    }

    /**
     * 获取http数据
     * @param $url
     * @return mixed
     */
    private function getHttpsData($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_ENCODING, '');
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($ch, CURLOPT_TIMEOUT, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language:zh-CN,zh;q=0.8',
            'Cache-Control:no-cache',
            'Connection:keep-alive',
            'Pragma:no-cache',
            'Upgrade-Insecure-Requests:1',
            'User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.90 Safari/537.36 2345Explorer/9.6.0.18627'
        ]);

        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

}