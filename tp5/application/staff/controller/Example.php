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
        $data = [];
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //查询可用的样式
        $styleList = ExampleStyle::all(['user_name' => $data['user_name']]);

        //查询客服
        $staffList = Staff::all(['account' => $data['user_name']]);

        return view('create', [
            'style_list' => $styleList,
            'staff_list' => $staffList
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
        $data['invitation_switch'] = isset($data['invitation_switch']) ? $data['invitation_switch'] : 0;
        $result = $this->validate($data, 'Example.add');
        if (true !== $result) {
            $this->error($result);
        }

        $login = new Login();
        $data['user_name'] = $login->getUserName(true);
        $data['staff_pk'] = $this->numArrToStr(isset($data['staff_pk']) ? $data['staff_pk'] : []);
        $data['invitation_week'] = $this->numArrToStr(isset($data['invitation_week']) ? $data['invitation_week'] : []);
        $data['access'] = uniqid();

        //保存数据
        $example = new ExampleModel();
        if ($example->add($data)) {
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

    /**
     * 删除实例
     * @throws \think\exception\DbException
     */
    public function delExample()
    {
        $data = input();

        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //验证数据
        $result = $this->validate($data, 'Example.scene1');
        if (true !== $result) {
            $this->error($result);
        }

        $example = ExampleModel::get($data['id']);
        if ($data['user_name'] === $example->user_name) {
            $example->delete();
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

        $example = new ExampleModel();
        switch ($data['name']) {
            //基本
            case 'state':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.state');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['state' => $data['state']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? '功能状态修改成功' : '功能状态修改失败');
                break;

            case 'name':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.name');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['name' => $data['name']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? '名称修改成功' : '名称修改失败');
                break;

            case 'description':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.description');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['description' => $data['description']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? '描述修改成功' : '描述修改失败');
                break;

            //皮肤
            case 'color':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.color');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['color' => $data['color']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? 'PC端主题色修改成功' : 'PC端主题色修改失败');
                break;

            case 'color_m':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.color_m');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['color_m' => $data['color_m']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? '移动端主题色修改成功' : '移动端主题色修改失败');
                break;

            case 'icon_code':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.icon_code');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['icon_code' => $data['icon_code']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? 'PC端挂件代码修改成功' : 'PC端挂件代码修改失败');
                break;

            case 'icon_code_m':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.icon_code_m');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['icon_code_m' => $data['icon_code_m']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? '移动端挂件代码修改成功' : '移动端挂件代码修改失败');
                break;

            case 'invitation_code':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.invitation_code');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['invitation_code' => $data['invitation_code']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? 'PC端邀请框代码修改成功' : 'PC端邀请框代码修改失败');
                break;

            case 'invitation_code_m':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.invitation_code_m');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['invitation_code_m' => $data['invitation_code_m']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? '移动端邀请框代码修改成功' : '移动端邀请框代码修改失败');
                break;

            //邀请功能
            case 'invitation_switch':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.invitation_switch');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['invitation_switch' => $data['invitation_switch']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? 'PC端邀请功能状态修改成功' : 'PC端邀请功能状态修改失败');
                break;

            case 'invitation_switch_m':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.invitation_switch_m');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['invitation_switch_m' => $data['invitation_switch_m']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? '移动端邀请功能状态修改成功' : '移动端邀请功能状态修改失败');
                break;

            case 'invitation_time':
                $data[$data['name']] = $data['value'];
                $result = $this->validate($data, 'Example.invitation_time');
                if (true !== $result) {
                    $this->outJsonResult(false, $result);
                }
                $result = !!$example->save(['invitation_time' => $data['invitation_time']], ['id' => $data['id']]);
                $this->outJsonResult($result, $result ? 'PC端邀请时间范围修改成功' : 'PC端邀请时间范围修改失败');
                break;

            case 'invitation_time_m':
                $this->updateSingleData($data, 'invitation_time_m', '移动端邀请时间范围修改成功', '移动端邀请时间范围修改失败');
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
    private function updateSingleData($data, $name, $succMsg, $failMsg)
    {
        $data[$data['name']] = $data['value'];
        $result = $this->validate($data, 'Example.' . $name);
        if (true !== $result) {
            $this->outJsonResult(false, $result);
        }
        $example = new ExampleModel();
        $result = !!$example->save([$name => $data[$name]], ['id' => $data['id'], 'user_name' => $data['user_name']]);
        $this->outJsonResult($result, $result ? $succMsg : $failMsg);
    }


    /**
     * ajax输出json结果
     * @param bool $state 状态
     * @param string $msg 消息
     */
    private function outJsonResult($state, $msg)
    {
        echo json_encode(['state' => $state ? 1 : 0, 'msg' => $msg]);
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
        $data['user_name'] = $login->getUserName(true);

        //获取实例数据
        $example = ExampleModel::get([
            'id' => $data['id'],
            'user_name' => $data['user_name']
        ]);

        return view('deploy', ['example' => $example]);
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