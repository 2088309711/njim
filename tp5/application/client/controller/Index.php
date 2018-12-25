<?php
/*
 * 查询staff时添加active_time条件，确保查询到的staff处于在线状态
 */

namespace app\client\controller;

use app\common\model\Example;
use app\common\model\ExampleStyle;
use app\common\model\ServerList;
use app\common\model\Staff;
use think\Controller;


class Index extends Controller
{

    private $example = null;

    /**
     * client接入
     *
     * @return void|\think\response\View
     */
    public function index()
    {

        $data = input();

        //设备信息验证
        if (isset($data['device'])) {
            if ($data['device'] !== 'pc_1' && $data['device'] !== 'phone_1') {
                return 'url 参数错误';
            }
        } else {
            return '缺少 url 参数';
        }


        //验证数据
        $result = $this->validate($data, 'ServerList.scene1');
        if (true !== $result) {
            return $result;
        }

        $data['sel_staff'] = false;
        if ($data['is_new'] === 'y') {
            //新client接入，获取可用的staff列表
            $staffList = $this->getStaffList($data);
            //从staff列表中选择一个可用的staff
            $result = $this->selStaff($data, $staffList);

            //检查是否选取staff
            if ($result['state'] === 1) {
                $data['sel_staff'] = true;//选取成功的标记
                $data['staff'] = $result['staff'];//被选择的staff
            }

        } elseif ($data['is_new'] === 'n') {
            // 老client接入，获取可用的staff列表
            $staffList = $this->getStaffList($data);

            //检查上次的staff是否可用
            $result = $this->ckUpStaff($data, $staffList);

            if ($result['state'] === 1) {//upStaff可用并且被选取
                $data['sel_staff'] = true;
                $data['staff'] = $result['staff'];
            } else {//重新选取新staff
                $result = $this->selStaff($data, $staffList);
                if ($result['state'] === 1) {//新的staff被选择
                    $data['sel_staff'] = true;
                    $data['staff'] = $result['staff'];//被选择的staff
                }
            }

        } else {
            //异常请求
            $this->error('Please visit correctly!', '/');
        }

        //check staff is on select
        if ($data['sel_staff']) {//on select staff, get style data
            return view($data['device'], [
                'staff' => $data['staff'],
                'client' => ['client_id' => $data['client_id']],
                'example' => $this->example
            ]);
        } else {//留言

        }

    }


    /**
     * 检查upStaff是否有效
     * @param $data
     * @param $staffList
     * @return array state:1=可用并选取staff,2=不可用
     * @throws \think\exception\DbException
     */
    private function ckUpStaff($data, $staffList)
    {
        //查找最后一次会话
        $sl = new ServerList();
        $lastSession = $sl->getLastSession($data);
        if ($lastSession != null) {
            //获取 upStaff 的数据
            $staff = Staff::get(['user_name' => $lastSession->staff_id]);

            //查询upStaff ID 是否在 staffList 中存在(后台可能修改指定ID)
            foreach ($staffList as $key => $item) {
                if ($item->id === $staff->id) {


                    return ['state' => 1, 'staff' => $staff];
                }
            }
        }
        return ['state' => 2];
    }

    /**
     * 获取可用staff列表
     * @param $access 实例接入口
     * @return false|null|static[]
     * @throws \think\exception\DbException
     */
    private function getStaffList($data)
    {
        //获取staff主键
        $this->example = Example::get(['access' => $data['access']]);
        if ($this->example != null) {
            $staffPKs = explode('|', $this->example->staff_pk);
            //获取指定主键的staff
            return Staff::all($staffPKs);
        }
        return null;
    }

    /**
     * 选择staff
     * @param $data 请求数据
     * @param $staffList staff列表
     * @return array state:1=已选取staff，2=等待，3=离线
     */
    private function selStaff($data, $staffList)
    {
        $maxWork = 100;
        if ($staffList != null) {
            //遍历staff数据，筛选出workMin
            $workMin = ['key' => -1, 'val' => $maxWork - 1];//控制最大接入量
            foreach ($staffList as $key => $staff) {

                //找出最后一个最小值
                if ($staff->work <= $workMin['val']) {

                    $workMin['key'] = $key;
                    $workMin['val'] = $staff->work;
                }
            }


            //判断是否有被选的staff
            if ($workMin['key'] !== -1) {
                //接入，被选staff : $staffList[$workMin[key]]
                $data['staff_id'] = $staffList[$workMin['key']]->user_name;

                $data['active_time'] = time();
                // 保存到服务队列


                $sl = new ServerList();
                if ($sl->add($data)) {
                    // 更新staff接待量
                    $staff = new Staff();
                    $staff->save([
                        'work' => $staffList[$workMin['key']]->work + 1
                    ], [
                        'id' => $staffList[$workMin['key']]->id
                    ]);

                    return [
                        'state' => 1,
                        'staff' => $staffList[$workMin['key']]
                    ];
                }
            } else {
                //等待
                return ['state' => 2];
            }
        }
        //离线
        return ['state' => 3];
    }

}

