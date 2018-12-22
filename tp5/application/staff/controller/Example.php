<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/18 0018
 * Time: 10:39
 */

namespace app\staff\controller;

use app\common\model\Staff;
use app\common\util\DateUtil;
use PHPMailer\Email;
use think\captcha\Captcha;
use think\Controller;
use think\Request;
use app\common\model\Example as ExampleModel;
use app\common\model\ExampleStyle;


/**
 * 实例控制器
 * Class Example
 * @package app\staff\controller
 */
class Example extends Controller
{

    public function index()
    {
        $login = new Login();
        $staff = $login->getUserData();
        $data = ['user_name' => $staff->user_name];

        $em = new ExampleModel();
        $list = $em->where('user_name', $data['user_name'])->select();

        return view('index', [
            'staff' => $staff,
            'menu' => 'example',
            'list' => $list
        ]);

    }

    public function create()
    {
        $login = new Login();
        $staff = $login->getUserData();

        return view('create', [
            'staff' => $staff,
            'menu' => 'example'
        ]);
    }

    /**
     * 获取一个用户的所有实例（AJAX）
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getAllExampleByUser()
    {
        $login = new Login();
        $data = ['user_name' => $login->getUserName(true)];

        $em = new ExampleModel();
        $list = $em->where('user_name', $data['user_name'])->select();

        $jsonArr = [];
        foreach ($list as $key => $item) {
            $jsonArr[] = [
                'id' => $item->id,
                'name' => $item->name,
                'create_time' => $item->create_time,
                'update_time' => $item->update_time,
            ];
        }

        echo json_encode([
            'code' => 0,
            'msg' => '',
            'count' => count($jsonArr),
            'data' => $jsonArr
        ]);
    }

    /**
     * 添加实例
     */
    public function createExample()
    {
        $data = input('post.');
        $result = $this->validate($data, 'Example.add');
        if (true !== $result) {
            $this->error($result);
        }

        $login = new Login();
        $staff = $login->getUserData();

        //保存数据
        $example = new ExampleModel();
        if ($example->add($staff)) {
            $this->success('创建成功', 'staff/example/index');
        } else {
            $this->error('创建失败');
        }

    }


    /**
     * 正整数数组转字符串格式
     * @param $arr
     * @return string
     */
    private function numArrToStr($arr)
    {
        $temp = [];
        foreach ($arr as $key => $item) {
            if (preg_match('/^\d+$/', $item)) {
                $temp[] = $item;
            }
        }
        return implode('|', $temp);
    }


    public function deleteConfirm()
    {
        $login = new Login();
        $staff = $login->getUserData();
        $data = input();
        $data['user_name'] = $staff->user_name;

        //验证数据
        $result = $this->validate($data, 'Example.scene1');
        if (true !== $result) {
            $this->error($result);
        }

        $example = ExampleModel::get(['id' => $data['id'], 'user_name' => $data['user_name']]);

        return view('delete_confirm', [
            'staff' => $staff,
            'menu' => 'example',
            'example' => $example
        ]);
    }


    /**
     * 删除实例
     * @throws \think\exception\DbException
     */
    public function delExample()
    {
        $data = input('post.');
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        $delText = '我已了解后果并确认删除';
        if ($data['del_text'] !== $delText) {
            $this->error('请输入：' . $delText);
        }

        //验证数据
        $result = $this->validate($data, 'Example.del');
        if (true !== $result) {
            $this->error($result);
        }

        if (ExampleModel::destroy(['id' => $data['id'], 'user_name' => $data['user_name']])) {
            $this->success('删除成功', 'staff/Example/index');
        } else {
            $this->error('删除失败');
        }
    }

    /**
     * 修改实例
     * @return \think\response\View|void
     * @throws \think\exception\DbException
     */
    public function updateExample()
    {
        $login = new Login();
        $staff = $login->getUserData();
        $data = [
            'id' => Request::instance()->param('id'),
            'user_name' => $staff->user_name
        ];

        //验证数据
        $result = $this->validate($data, 'Example.scene1');
        if (true !== $result) {
            $this->error($result);
        }

        //查询客服
        $staffList = Staff::all(['account' => $data['user_name']]);

        $example = ExampleModel::get(['id' => $data['id'], 'user_name' => $data['user_name']]);

        $example->staff_pk = explode("|", $example->staff_pk);
        $example->invitation_week = explode('|', $example->invitation_week);
        $example->invitation_week_m = explode('|', $example->invitation_week_m);

        return view('update', [
            'staff' => $staff,
            'example' => $example,
            'menu' => 'example',
            'staff_list' => $staffList
        ]);

    }


    /**
     * 修改单个字段
     */
    public function updateField()
    {
        $data = input('post.');
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        switch ($data['name']) {
            //基本
            case 'state':
                $this->updateSingleData($data, '功能状态设置成功', '功能状态设置失败');
                break;

            case 'name':
                $this->updateSingleData($data, '名称设置成功', '名称设置失败');
                break;

            case 'description':
                $this->updateSingleData($data, '描述设置成功', '描述设置失败');
                break;

            //皮肤
            case 'color':
                $this->updateSingleData($data, 'PC端主题色设置成功', 'PC端主题色设置失败');
                break;

            case 'color_m':
                $this->updateSingleData($data, '移动端主题色设置成功', '移动端主题色设置失败');
                break;

            case 'icon_code':
                $this->updateSingleData($data, 'PC端挂件代码设置成功', 'PC端挂件代码设置失败');
                break;

            case 'icon_code_m':
                $this->updateSingleData($data, '移动端挂件代码设置成功', '移动端挂件代码设置失败');
                break;

            case 'invitation_code':
                $this->updateSingleData($data, 'PC端邀请框代码设置成功', 'PC端邀请框代码设置失败');
                break;

            case 'invitation_code_m':
                $this->updateSingleData($data, '移动端邀请框代码设置成功', '移动端邀请框代码设置失败');
                break;

            //邀请功能
            case 'invitation_switch':
                $this->updateSingleData($data, 'PC端邀请功能状态设置成功', 'PC端邀请功能状态设置失败');
                break;

            case 'invitation_switch_m':
                $this->updateSingleData($data, '移动端邀请功能状态设置成功', '移动端邀请功能状态设置失败');
                break;

            case 'invitation_time':
                $this->updateSingleData($data, 'PC端邀请时间范围设置成功', 'PC端邀请时间范围设置失败');
                break;

            case 'invitation_time_m':
                $this->updateSingleData($data, '移动端邀请时间范围设置成功', '移动端邀请时间范围设置失败');
                break;

            case 'invitation_num':
                $this->updateSingleData($data, 'PC端邀请次数设置成功', 'PC端邀请次数设置失败');
                break;

            case 'invitation_num_m':
                $this->updateSingleData($data, '移动端邀请次数设置成功', '移动端邀请次数设置失败');
                break;

            case 'invitation_first':
                $this->updateSingleData($data, 'PC端首次邀请延迟设置成功', 'PC端首次邀请延迟设置失败');
                break;

            case 'invitation_first_m':
                $this->updateSingleData($data, '移动端首次邀请延迟设置成功', '移动端首次邀请延迟设置失败');
                break;

            case 'invitation_after':
                $this->updateSingleData($data, 'PC端后续邀请延迟设置成功', 'PC端后续邀请延迟设置失败');
                break;

            case 'invitation_after_m':
                $this->updateSingleData($data, '移动端后续邀请延迟设置成功', '移动端后续邀请延迟设置失败');
                break;

            case 'invitation_auto_close':
                $this->updateSingleData($data, 'PC端自动关闭邀请框延迟设置成功', 'PC端自动关闭邀请框延迟设置失败');
                break;

            case 'invitation_auto_close_m':
                $this->updateSingleData($data, '移动端自动关闭邀请框延迟设置成功', '移动端自动关闭邀请框延迟设置失败');
                break;

            case 'invitation_week':
                $this->updateSingleData($data, 'PC端邀请星期范围设置成功', 'PC端邀请星期范围设置失败');
                break;

            case 'invitation_week_m':
                $this->updateSingleData($data, '移动端邀请星期范围设置成功', '移动端邀请星期范围设置失败');
                break;

            //客服
            case 'staff_pk':
                $this->updateSingleData($data, '参与客服设置成功', '参与客服设置失败');
                break;

            //设置默认代码
            case 'default_icon_code':
                $this->updateStyleCode($data, 'icon_code', ExampleModel::$iconCode);
                break;

            case 'default_icon_code_m':
                $this->updateStyleCode($data, 'icon_code_m', ExampleModel::$iconCodeM);
                break;

            case 'default_invitation_code':
                $this->updateStyleCode($data, 'invitation_code', ExampleModel::$invitationCode);
                break;

            case 'default_invitation_code_m':
                $this->updateStyleCode($data, 'invitation_code_m', ExampleModel::$invitationCodeM);
                break;
        }
    }

    /**
     * 修改单项数据
     * @param $data
     * @param $name
     * @param $succMsg
     * @param $failMsg
     */
    private function updateSingleData($data, $succMsg, $failMsg)
    {
        $name = $data['name'];
        $data[$name] = $data['value'];
        $result = $this->validate($data, 'Example.' . $name);
        if (true === $result) {
            $example = new ExampleModel();
            $result = !!$example->save([$name => $data[$name]], ['id' => $data['id'], 'user_name' => $data['user_name']]);
            $this->outJsonResult($result, $result ? $succMsg : $failMsg);
        } else {
            $this->outJsonResult(false, $result);
        }
    }

    private function updateStyleCode($data, $name, $code)
    {
        $result = $this->validate($data, 'Example.scene1');
        if (true === $result) {
            $example = new ExampleModel();
            $result = !!$example->save([
                $name => $code
            ], [
                'id' => $data['id'],
                'user_name' => $data['user_name']
            ]);
            $this->outJsonResult($result, $result ? '设置成功，刷新后可见代码' : '设置失败，请重试', $data['value']);
        } else {
            $this->outJsonResult(false, $result);
        }
    }

    /**
     * ajax输出json结果
     * @param bool $state 状态
     * @param string $msg 消息
     */
    private function outJsonResult($state, $msg, $field = '')
    {
        echo json_encode(['state' => $state ? 1 : 0, 'msg' => $msg, 'field' => $field]);
        die;
    }

    /**
     * 保存实例
     */
    public function saveExample()
    {
        $data = input('post.');
        $data['invitation_switch'] = isset($data['invitation_switch']) ? $data['invitation_switch'] : 0;
        //验证数据
        $result = $this->validate($data, 'Example.save');
        if (true !== $result) {
            $this->error($result);
        }

        $login = new Login();
        $data['user_name'] = $login->getUserName(true);
        $data['staff_pk'] = $this->numArrToStr(isset($data['staff_pk']) ? $data['staff_pk'] : []);
        $data['invitation_week'] = $this->numArrToStr(isset($data['invitation_week']) ? $data['invitation_week'] : []);

        //保存数据
        $example = new ExampleModel();
        if ($example->saveExample($data)) {
            $this->success('修改成功', 'staff/Example/index');
        } else {
            $this->error('修改失败');
        }
    }
    
    /**
     * 部署
     * @return \think\response\View
     */
    public function deployExample()
    {
        $data = input();
        $result = $this->validate($data, 'Example.scene1');
        if (true !== $result) {
            $this->error($result);
        }
        $login = new Login();
        $staff = $login->getUserData();

        //获取实例数据
        $example = ExampleModel::get(['id' => $data['id'], 'user_name' => $staff->user_name]);

        return view('deploy', ['example' => $example, 'staff' => $staff, 'menu' => 'example']);
    }


    public function viewExample()
    {
        $data = input();
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //验证数据
        $result = $this->validate($data, 'Example.scene1');
        if (true !== $result) {
            $this->error($result);
        }

        $example = ExampleModel::get([
            'id' => $data['id'],
            'user_name' => $data['user_name']
        ]);
        if ($example != null) {

            $style = ExampleStyle::get($example->style_id);

            $staffList = Staff::all(explode('|', $example->staff_pk));

            $example->invitation_week = explode('|', $example->invitation_week);

            return view('view', [
                'example' => $example,
                'style' => $style,
                'staffList' => $staffList
            ]);
        } else {
            $this->error('实例不存在');
        }
    }

}