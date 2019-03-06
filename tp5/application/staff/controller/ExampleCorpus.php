<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/3/6 0006
 * Time: 13:40
 */

namespace app\staff\controller;

use app\common\model\ExampleCorpus as ExampleCorpusModel;
use think\Controller;
use app\common\model\Example;

class ExampleCorpus extends Controller
{

    public function index()
    {
        $data = input();
        $result = $this->validate($data, 'ExampleCorpus.ck_example_id');
        if (true !== $result) {
            $this->error($result);
        }

        $login = new Login();
        $staff = $login->getUserData();

        //获取实例语料数据
        $corpus = ExampleCorpusModel::all(['example_id' => $data['example_id']]);


        $this->assign('example_id', $data['example_id']);
        $this->assign('corpus', $corpus);
        $this->assign('staff', $staff);
        $this->assign('menu', 'example');

        return view();
    }

    public function add()
    {

        if (request()->isPost()) {
            $data = input('post.');

            //验证实例ID和token
            $result = $this->validate($data, 'ExampleCorpus.ck_example_id2');
            if (true !== $result) {
                $this->error($result);
            }


            //验证问题
            $temp = '';
            $data['title'] = '';
            foreach ($data['ask'] as $val) {
                if (trim($val) != '') {
                    $result = $this->validate(['ask' => $val], 'ExampleCorpus.ck_ask');
                    if (true !== $result) {
                        $this->error($result);
                    }

                    if ($data['title'] == '') {
                        $data['title'] = $val;
                    }

                    $temp .= $val . '@06#';
                }
            }


            if ($data['title'] == '') {
                $this->error('必须填写一个提问语句');
            }


            $data['ask'] = $temp;

            //验证回复
            $temp = '';
            foreach ($data['text'] as $val) {
                if (trim($val) != '') {
                    $result = $this->validate(['answer' => $val], 'ExampleCorpus.ck_answer');
                    if (true !== $result) {
                        $this->error($result);
                    }
                    $temp .= $val . '@06#';
                }
            }

            $data['text'] = $temp;


            //保存
            $ecm = new  ExampleCorpusModel();

            if ($ecm->add($data)) {
                $this->success('添加成功', '/index.php/staff/Example_Corpus/index/example_id/' . $data['example_id']);
            } else {
                $this->error('添加失败');
            }

        } else {
            $data = input();
            $result = $this->validate($data, 'ExampleCorpus.ck_example_id');
            if (true !== $result) {
                $this->error($result);
            }

            $login = new Login();
            $staff = $login->getUserData();
            $this->assign('example_id', $data['example_id']);
            $this->assign('staff', $staff);
            $this->assign('menu', 'example');
            return view();
        }
    }


    public function edit()
    {
        if (request()->isPost()) {

        } else {
            return view();
        }
    }

    public function delete()
    {
        $data = input();
        $result = $this->validate($data, 'ExampleCorpus.ck_example_id3');
        if (true !== $result) {
            $this->error($result);
        }

        $login = new Login();

        $ecm = ExampleCorpusModel::get($data['id']);

        $example = Example::get(['id' => $ecm->example_id, 'user_name' => $login->getUserName()]);

        //确保用户拥有该实例的权限
        if ($example != null) {
            if ($ecm->delete()) {
                $this->redirect('/index.php/staff/Example_Corpus/index/example_id/' . $data['example_id']);
            } else {
                $this->error('删除失败');
            }
        }

    }

}