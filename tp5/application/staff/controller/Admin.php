<?php

namespace app\staff\controller;

use app\common\bean\PageBean;
use app\index\controller\Index;
use app\common\model\MainBody;
use app\common\model\Staff;
use app\common\util\DateUtil;
use app\common\util\SundryUtil;
use think\Controller;
use think\Request;

class Admin extends Controller
{

    function __construct()
    {
        $login = new Login();
        $login->isAdmin(true);
    }

    public function index()
    {
        $login = new Login();
        $staff = $login->getUserData();
        if ($staff != null) {
            return view('index', ['staff' => $staff, 'menu' => 'index']);
        }
    }

    public function welcome()
    {
        return view('welcome');
    }


    public function setStyle()
    {
        // 获取接口名
        $staff = Staff::get([
            'user_name' => $_SESSION['userName']
        ]);

        // 获取接口详细数据
        $mainBody = MainBody::get([
            'interface_name' => $staff->interface_name
        ]);

        return view('set_style', [
            'iconStyle' => $mainBody->icon_style,
            'mainColor' => $mainBody->main_color
        ]);
    }

    public function setStyleAction()
    {
        if (!Request::instance()->has('iconStyle', 'post')) {
            return;
        }
        $iconStyle = Request::instance()->post('iconStyle');
        $mainColor = Request::instance()->post('mainColor');

        if (strlen($mainColor) != 3 && strlen($mainColor) != 6) {
            return;
        }

        // 获取当前登录的接口名
        $staff = Staff::get([
            'user_name' => $_SESSION['userName']
        ]);

        // 修改数据
        $mainBody = new MainBody();
        $mainBody->save([
            'icon_style' => $iconStyle,
            'main_color' => $mainColor
        ], [
            'interface_name' => $staff->interface_name
        ]);

        $type = true;
        $msg = "修改成功";

        $index = new Index();
        return $index->showResult($type, $msg);
    }

    public function addStaff()
    {
        return view('add_staff');
    }

    public function addStaffAction()
    {
        $name = Request::instance()->post('name');
        $userName = Request::instance()->post('userName');
        $password = Request::instance()->post('password');
        $password2 = Request::instance()->post('password2');

        $type = false;
        $msg = "";
        $flag = true;


        // 检查用户名是否存在
        $regist = new Register();
        if (!$regist->userNameNotExist($userName)) {
            $this->error('用户名存在，请更换');
        }
        // 获取当前登录的接口信息
        $staff = Staff::get([
            'user_name' => $_SESSION["userName"]
        ]);

        $interface_name = $staff->interface_name;

        if ($interface_name == null || $interface_name == "") {
            $msg = "接口错误";
            $flag = false;
        }

        if ($flag) {

            $stringUtil = new SundryUtil();
            $date = new DateUtil();
            $mDate = $date->get_millisecond();

            // 添加子客服
            $staff = new Staff();
            $staff->name = $name;
            $staff->user_name = $userName;
            $staff->password = $stringUtil->encoded($password);
            $staff->interface_name = $interface_name;
            $staff->login_date = $mDate;
            $staff->regist_date = $mDate;
            if ($staff->save()) {
                $type = true;
                $msg = "添加成功";
            } else {
                $msg = "添加失败";
            }
        }

        return (new Index())->showResult($type, $msg);
    }

    public function staffList()
    {

        // 设置每页显示的最大记录数
        $maxSize = 10;

        // curPage表示要显示的页[当前页],默认值是1
        $curPage = 1;
        if (Request::instance()->has('curPage', 'param')) {
            $curPage = Request::instance()->param('curPage');
        }

        // 计算显示记录的开始位置 开始位置 = (要显示的页 - 1) * 每页显示的最大数量
        $beginIndex = ($curPage - 1) * $maxSize;

        // 查询接口名称
        $staff = Staff::get([
            'user_name' => $_SESSION['userName']
        ]);

        $interfaceName = $staff->interface_name;

        $recordNums = Staff::where('interface_name', '=', $interfaceName)->count();

        $pageBean = new PageBean();

        $pageBean->init($curPage, $maxSize, $recordNums);

        $staff = new Staff();
        $list = $staff->where('interface_name', $interfaceName)
            ->limit($beginIndex, $maxSize)
            ->order('Id', 'asc')
            ->select();

        $date = new DateUtil();

        $_list = array();
        foreach ($list as $key => $s) {
            $temp = array();
            $temp['id'] = $s->Id;
            $temp['open'] = $s->open == 1 ? "是" : "否";
            $temp['name'] = $s->name;
            $temp['user_name'] = $s->user_name;
            $temp['login_date'] = $date->get_microtime_format($s->login_date);
            $temp['work'] = $s->work;
            $temp['power'] = $s->power == 1 ? "主客服" : "子客服";
            $_list[] = $temp;
        }

        return view('staff_list', [
            'list' => $_list,
            'curPage' => $curPage,
            'recordNums' => $recordNums,
            'maxPage' => $pageBean->getMaxPageNum($recordNums, $maxSize),
            'prePage' => $pageBean->getPrePage(),
            'nextPage' => $pageBean->getNextPage()
        ]);
    }

    public function staffGroup()
    {
        echo '客服组，敬请期待...';
    }

    public function robot()
    {
        echo '机器人，敬请期待...';
    }

    public function faq()
    {
        return view('faq');
    }
}

