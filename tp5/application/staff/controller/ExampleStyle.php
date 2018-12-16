<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/11/14 0014
 * Time: 15:29
 */

namespace app\staff\controller;


use think\Controller;
use app\common\model\ExampleStyle as ExampleStyleModel;
use app\common\model\Example;

class ExampleStyle extends Controller
{

    public function index()
    {
        return view('index');
    }

    public function create()
    {
        $login = new Login();
        $login->getUserName(true);
        return view('create');
    }

    /**
     * 获取一个用户的所有样式（AJAX）
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getAllExampleStyleByUser()
    {
        $login = new Login();
        $data = ['user_name' => $login->getUserName(true)];

        $esm = new ExampleStyleModel();
        $list = $esm->where('user_name', $data['user_name'])->select();

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
     * 添加样式
     */
    public function createExampleStyle()
    {
        $data = input('post.');
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        $result = $this->validate($data, 'ExampleStyle.add');
        if (true !== $result) {
            $this->error($result);
        }

        $data['style_type'] = 2;

        //保存数据
        $exampleStyle = new ExampleStyleModel();

        if ($exampleStyle->add($data)) {
            $this->success('创建成功', 'staff/ExampleStyle/index');
        } else {
            $this->error('创建失败');
        }

    }


    /**
     * 删除样式
     * @throws \think\exception\DbException
     */
    public function delStyle()
    {
        $data = input();

        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //验证数据
        $result = $this->validate($data, 'ExampleStyle.scene1');
        if (true !== $result) {
            $this->error($result);
        }

        if (Example::get(['style_id' => $data['id']]) === null) {//没有实例依赖的样式才能删除
            ExampleStyleModel::destroy([
                'id' => $data['id'],
                'user_name' => $data['user_name']
            ]);
        }

    }

    /**
     * 编辑样式
     * @return \think\response\View|void
     * @throws \think\exception\DbException
     */
    public function updateStyle()
    {
        $data = input();

        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //验证数据
        $result = $this->validate($data, 'ExampleStyle.scene1');
        if (true !== $result) {
            $this->error($result);
        }


        $exampleStyle = ExampleStyleModel::get(['id' => $data['id'], 'user_name' => $data['user_name']]);
        if ($exampleStyle != null) {
            return view('update', ['example_style' => $exampleStyle]);
        }

    }


    /**
     * 保存样式
     */
    public function saveExampleStyle()
    {

        $data = input('post.');
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        //验证数据
        $result = $this->validate($data, 'ExampleStyle.save');
        if (true !== $result) {
            $this->error($result);
        }

        //保存数据
        $esm = new ExampleStyleModel();
        if ($esm->saveData($data)) {
            $this->success('修改成功', 'staff/ExampleStyle/index');
        } else {
            $this->error('修改失败');
        }
    }

    public function viewStyle()
    {
        $data = input();
        //验证数据
        $result = $this->validate($data, 'ExampleStyle.scene1');
        if (true !== $result) {
            $this->error($result);
        }
        $login = new Login();
        $data['user_name'] = $login->getUserName(true);

        $style = ExampleStyleModel::get([
            'id' => $data['id'],
            'user_name' => $data['user_name']
        ]);
        if ($style != null) {
            return view('view', ['style' => $style]);
        } else {
            $this->error('样式不存在');
        }
    }

}