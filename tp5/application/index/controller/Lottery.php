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

//        $url = 'https://www.sh1333.com/static/data/80CurIssue.json?_t=' . $t;
//        $url = 'https://www.rd2255.com/static/data/80CurIssue.json?_t=' . $t;
//        $url = 'http://www.9h991.com/static/data/80CurIssue.json?_t=' . $t;
//        $url = 'https://api.speedlottery.com/data/racing/last.xml?_t=' . $t;
        $url = 'https://api.cp987a.com/data/jspk10/last.json?_t=' . $t;

//        $this->getHttpsData2($url);

        return $this->getHttpsData($url);

//        https://api.speedlottery.com/data/racing/last.xml

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