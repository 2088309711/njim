<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/12/29 0029
 * Time: 16:15
 */

namespace app\staff\controller;


use app\common\model\CorpusGroup;
use think\Controller;

class Corpus extends Controller
{

    public function index()
    {
        $login = new Login();
        $staff = $login->getUserData();


        $cg = CorpusGroup::all([
            'user_name' => $staff->user_name
        ]);

        return view('index', [
            'staff' => $staff,
            'menu' => 'corpus',
            'corpusGroup' => $cg
        ]);
    }

    public function createGroup()
    {
        $login = new Login();
        if (request()->isPost()) {
            $data = input('post.');
            $data['user_name'] = $login->getUserName();
            $result = $this->validate($data, 'CorpusGroup.add');
            if (true !== $result) {
                $this->error($result);
            }
            $cg = new CorpusGroup();
            if ($cg->add($data)) {
                $this->redirect('staff/corpus/index');
            } else {
                $this->error('添加失败');
            }
        } else {
            $staff = $login->getUserData();
            return view('create_group', [
                'staff' => $staff,
                'menu' => 'corpus'
            ]);
        }
    }


    public function updateGroup()
    {
        $login = new Login();
        if (request()->isPost()) {
            $data = input('post.');
            $data['user_name'] = $login->getUserName();

            $result = $this->validate($data, 'CorpusGroup.update');
            if ($result !== true) {
                $this->error($result);
            }

            $cg = new CorpusGroup();
            if (!!$cg->save(['name' => $data['name']],
                ['id' => $data['id'], 'user_name' => $data['user_name']])) {
                $this->redirect('staff/corpus/index');
            } else {
                $this->error('修改失败');
            }
        } else {
            $data = input();
            $staff = $login->getUserData();
            $result = $this->validate($data, 'CorpusGroup.ck_id');
            if (true !== $result) {
                $this->error($result);
            }

            $cg = CorpusGroup::get(['id' => $data['id'], 'user_name' => $staff->user_name]);
            return view('update_group', [
                'menu' => 'corpus',
                'staff' => $staff,
                'corpusGroup' => $cg
            ]);

        }

    }


}