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

        $url = 'https://api.speedlottery.com/data/racing/last.xml';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
//        curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, false);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
//        ****
//        https://api.speedlottery.com/data/racing/last.xml //秒速赛车官方接口
    }

    public function getSecondSpeedRacingData()
    {

        $t = time();

        $result = [];

        $result[] = $this->getArr('盈盈彩', "https://www.yyc91.com/static/data/80CurIssue.json?_t=" . $t);

        $result[] = $this->getArr('盛宏', "https://www.sh1333.com/static/data/80CurIssue.json?_t=" . $t);

        $result[] = $this->getArr('荣鼎', "https://www.rd2255.com/static/data/80CurIssue.json?_t=" . $t);

        $result[] = $this->getArr('9号', "http://www.9h991.com/static/data/80CurIssue.json?_t=" . $t);

        echo json_encode($result);
    }


    private function getArr($name, $url)
    {

        $json = $this->getHttpsData($url);

        $errText = '--';

        $result = [
            'name' => $name,
            'issue' => $errText,
            'opentime' => $errText,
            'nums' => $errText
        ];

        $data = json_decode($json);
        if ($data != null) {
            $result['issue'] = $data->issue;
            $result['opentime'] = $data->opentime;
            $result['nums'] = $data->nums;
        }

        return $result;
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
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, false);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

}