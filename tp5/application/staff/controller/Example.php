<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/10/18 0018
 * Time: 10:39
 */

namespace app\staff\controller;

use app\common\model\Staff;
use think\Controller;
use think\Request;
use app\common\model\Example as ExampleModel;


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
        if (request()->isPost()) {
            $data = input('post.');
            $result = $this->validate($data, 'Example.add');
            if (true !== $result) {
                $this->error($result);
            }
            $staff = $login->getUserData();
            //保存数据
            $example = new ExampleModel();
            if ($example->add($staff)) {
                $this->success('创建成功', 'staff/example/index');
            } else {
                $this->error('创建失败');
            }
        } else {
            $staff = $login->getUserData();
            return view('create', [
                'staff' => $staff,
                'menu' => 'example'
            ]);
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


    public function delete()
    {
        $login = new Login();
        if (request()->isPost()) {
            $data = input('post.');
            $data['user_name'] = $login->getUserName();

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
        } else {


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
    }


    /**
     * 修改实例
     * @return \think\response\View|void
     * @throws \think\exception\DbException
     */
    public function update()
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
        $data['user_name'] = $login->getUserName();

        switch ($data['name']) {
            //基本
            case 'state':
                $this->updateSingleData($data, '功能状态');
                break;

            case 'name':
                $this->updateSingleData($data, '名称');
                break;

            case 'phone':
                $this->updateSingleData($data, '电话');
                break;

            case 'description':
                $this->updateSingleData($data, '描述');
                break;

            //皮肤
            case 'color':
                $this->updateSingleData($data, 'PC端主题色');
                break;

            case 'color_m':
                $this->updateSingleData($data, '移动端主题色');
                break;

            case 'icon_code':
                $this->updateSingleData($data, 'PC端挂件代码');
                break;

            case 'icon_code_m':
                $this->updateSingleData($data, '移动端挂件代码');
                break;

            case 'invitation_code':
                $this->updateSingleData($data, 'PC端邀请框代码');
                break;

            case 'invitation_code_m':
                $this->updateSingleData($data, '移动端邀请框代码');
                break;

            //邀请功能
            case 'invitation_switch':
                $this->updateSingleData($data, 'PC端邀请功能状态');
                break;

            case 'invitation_switch_m':
                $this->updateSingleData($data, '移动端邀请功能状态');
                break;

            case 'invitation_time':
                $this->updateSingleData($data, 'PC端邀请时间范围');
                break;

            case 'invitation_time_m':
                $this->updateSingleData($data, '移动端邀请时间范围');
                break;

            case 'invitation_num':
                $this->updateSingleData($data, 'PC端邀请次数');
                break;

            case 'invitation_num_m':
                $this->updateSingleData($data, '移动端邀请次数');
                break;

            case 'invitation_first':
                $this->updateSingleData($data, 'PC端首次邀请延迟');
                break;

            case 'invitation_first_m':
                $this->updateSingleData($data, '移动端首次邀请延迟');
                break;

            case 'invitation_after':
                $this->updateSingleData($data, 'PC端后续邀请延迟');
                break;

            case 'invitation_after_m':
                $this->updateSingleData($data, '移动端后续邀请延迟');
                break;

            case 'invitation_auto_close':
                $this->updateSingleData($data, 'PC端自动关闭邀请框延迟');
                break;

            case 'invitation_auto_close_m':
                $this->updateSingleData($data, '移动端自动关闭邀请框延迟');
                break;

            case 'invitation_week':
                $this->updateSingleData($data, 'PC端邀请星期范围');
                break;

            case 'invitation_week_m':
                $this->updateSingleData($data, '移动端邀请星期范围');
                break;

            //客服
            case 'staff_pk':
                $this->updateSingleData($data, '参与客服');
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
    private function updateSingleData($data, $msg)
    {
        $name = $data['name'];
        $data[$name] = $data['value'];
        $result = $this->validate($data, 'Example.' . $name);
        if (true === $result) {
            $example = new ExampleModel();
            $result = !!$example->save([$name => $data[$name]], ['id' => $data['id'], 'user_name' => $data['user_name']]);
            $this->outJsonResult($result, $result ? $msg . '设置成功' : $msg . '设置失败');
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
            $this->outJsonResult($result, $result ? '设置成功，刷新后可见代码，不要点击当前的输入框！' : '设置失败，请重试', $data['value']);
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
     * 部署
     * @return \think\response\View
     */
    public function deploy()
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


    public function people()
    {

        if (request()->isPost()) {

            $data = input('post.');

            //处理staff_pk
            $data['staff_pk'] = isset($data['staff_pk']) ? $data['staff_pk'] : [];
            $temp = '';
            foreach ($data['staff_pk'] as $val) {
                $temp .= $val . '|';
            }
            $data['staff_pk'] = preg_replace("/\|$/", "", $temp);


            $result = $this->validate($data, 'Example.scene2');
            if ($result !== true) {
                $this->error($result);
            }

            $login = new Login();

            $em = new ExampleModel();
            if ($em->allowField(['staff_pk'])->save($data, ['id' => $data['id'], 'user_name' => $login->getUserName()])) {
                $this->success('保存成功', '/index.php/staff/Example');
            } else {
                $this->error('保存失败');
            }

        } else {

            $data = input();

            $result = $this->validate($data, 'Example.scene1');
            if ($result !== true) {
                $this->error($result);
            }

            $login = new Login();
            $staff = $login->getUserData();

            //获取实例数据
            $example = ExampleModel::get(['id' => $data['id'], 'user_name' => $staff->user_name]);

            if ($example != null) {

                //获取客服数据
                $staffList = Staff::all(['account' => $staff->user_name]);


                $example->staff_pk = explode('|', $example->staff_pk);


                $this->assign('example', $example);
                $this->assign('staff', $staff);
                $this->assign('staffList', $staffList);
                $this->assign('menu', 'example');

                return view();

            } else {
                $this->error('数据不存在');
            }


        }
    }


    public function robot()
    {

        if (request()->isPost()) {

            $data = input('post.');


            $data['robot'] = isset($data['robot']) ? 1 : 0;
            $data['public_corpus'] = isset($data['public_corpus']) ? 1 : 0;

            $result = $this->validate($data, 'Example.scene3');
            if (true !== $result) {
                $this->error($result);
            }

            $example = new ExampleModel();


            $login = new Login();

            if ($example->allowField(['robot', 'public_corpus', 'robot_name', 'welcome'])
                ->save($data, ['id' => $data['id'], 'user_name' => $login->getUserName()])) {
                $this->success('保存成功', '/index.php/staff/Example');
            } else {
                $this->error('保存失败');
            }


        } else {


            $data = input();
            $result = $this->validate($data, 'Example.scene1');
            if (true !== $result) {
                $this->error($result);
            }

            $login = new Login();
            $staff = $login->getUserData();

            //获取实例数据
            $example = ExampleModel::get(['id' => $data['id'], 'user_name' => $staff->user_name]);

            $this->assign('example', $example);
            $this->assign('staff', $staff);
            $this->assign('menu', 'example');

            return view();

        }
    }


}