<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/12/29 0029
 * Time: 16:15
 */

namespace app\staff\controller;


use app\common\model\CorpusData;
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

    public function corpusList()
    {
        $login = new Login();
        $staff = $login->getUserData();
        $data = input();
        $result = $this->validate($data, 'Corpus.ck_id');
        if ($result !== true) {
            $this->error($result);
        }

        $corpus = CorpusData::all(['group_id' => $data['id']]);

        return view('corpus_list', [
            'staff' => $staff,
            'corpus' => $corpus,
            'menu' => 'corpus',
            'group_id' => $data['id']
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


    public function addCorpus()
    {
        $login = new Login();
        if (Request()->isPost()) {
            $data = input('post.');
            $data['user_name'] = $login->getUserName();
            $result = $this->validate($data, 'Corpus.add');
            if (true !== $result) {
                $this->error($result);
            }

            $corpus = new CorpusData();
            if ($corpus->add($data)) {
                $this->redirect('staff/corpus/corpusList', ['id' => $data['id']]);
            } else {
                $this->error('添加失败');
            }
        } else {
            $data = input();

            $result = $this->validate($data, 'CorpusGroup.ck_id');
            if (true !== $result) {
                $this->error($result);
            }

            $staff = $login->getUserData();
            return view('add_corpus', [
                'staff' => $staff,
                'menu' => 'corpus',
                'group_id' => $data['id']
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

    public function updateCorpus()
    {
        $login = new Login();
        if (request()->isPost()) {
            $data = input('post.');
            $data['user_name'] = $login->getUserName();

            $result = $this->validate($data, 'Corpus.add');
            if ($result !== true) {
                $this->error($result);
            }

            $corpus = CorpusData::get(['id' => $data['id']]);
            if ($corpus != null) {
                $cg = CorpusGroup::get($corpus->group_id);
                if ($cg->user_name === $data['user_name']) {
                    $corpus->title = $data['title'];
                    $corpus->content = $data['content'];
                    $corpus->save();
                    $this->redirect('staff/corpus/corpusList', ['id' => $cg->id]);
                }
            } else {
                $this->error('词条不存在');
            }
        } else {
            $data = input();
            $staff = $login->getUserData();
            $result = $this->validate($data, 'Corpus.ck_id');
            if (true !== $result) {
                $this->error($result);
            }

            $corpus = CorpusData::get($data['id']);
            return view('update_corpus', [
                'menu' => 'corpus',
                'staff' => $staff,
                'corpus' => $corpus
            ]);
        }
    }

    public function deleteGroup()
    {
        $data = input();
        $login = new Login();
        $data['user_name'] = $login->getUserName();

        $result = $this->validate($data, 'CorpusGroup.ck_id');
        if (true !== $result) {
            $this->error($result);
        }

        CorpusGroup::destroy(['id' => $data['id'], 'user_name' => $data['user_name']]);

        $this->redirect('staff/Corpus/index');

    }


    public function deleteCorpus()
    {
        $data = input();
        $login = new Login();
        $data['user_name'] = $login->getUserName();

        $result = $this->validate($data, 'Corpus.ck_id');
        if (true !== $result) {
            $this->error($result);
        }

        $corpus = CorpusData::get($data['id']);

        if ($corpus != null) {
            $cg = CorpusGroup::get($corpus->group_id);
            if ($cg->user_name === $data['user_name']) {
                //身份校验，确保词库组用户名和当前登录的用户一致
                $corpus->delete();
            }
            $this->redirect('staff/Corpus/corpusList', ['id' => $cg->id]);
        }

        $this->redirect('staff/Corpus/index');
    }


}