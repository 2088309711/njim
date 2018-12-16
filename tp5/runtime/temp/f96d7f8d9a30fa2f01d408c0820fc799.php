<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:72:"D:\php-workspace\njim/tp5/application/staff\view\staff_manage\index.html";i:1543636381;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>客服列表</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/static/layui/css/layui.css" media="all">
</head>
<body style="padding: 0 10px;">

<table class="layui-hide" id="test" lay-filter="test"></table>


<script type="text/html" id="switchTpl">
    <input type="checkbox" name="open" value="{{d.id}}" lay-skin="switch" lay-text="启用|禁用" lay-filter="openDemo"
           {{ d.open== 1 ? 'checked' : '' }}>
</script>

<script type="text/html" id="toolbarDemo">
    <div class="layui-btn-container">
        <a href="/index.php/staff/Staff_Manage/create" class="layui-btn layui-btn-sm">添加客服</a>
    </div>
</script>

<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="view">查看</a>
    <a class="layui-btn layui-btn-xs" lay-event="update">修改</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>

<script src="/static/layui/layui.js" charset="utf-8"></script>

<script>
    layui.use(['table', 'jquery'], function () {
        var table = layui.table;
        var $ = layui.$;
        var form = layui.form;
        table.render({
            elem: '#test'
            , url: '/index.php/staff/Staff_Manage/getAllStaffByUser'
            , toolbar: '#toolbarDemo'
            , title: '客服列表'
            , cols: [[
                {field: 'id', title: 'ID', width: 80, fixed: 'left', sort: true}
                , {field: 'name', title: '客服名', sort: true}
                , {field: 'user_name', title: '用户名', width: 180, sort: true}
                , {
                    field: 'sex', title: '性别', width: 80, sort: true, templet: function (d) {
                        if (d.sex === 0) {
                            return '保密';
                        }
                        return d.sex === 1 ? '男' : '女';
                    }
                }
                , {
                    field: 'power', title: '权限', width: 80, sort: true, templet: function (d) {
                        return d.power === 1 ? '管理' : '客服';
                    }
                }
                , {field: 'update_time', title: '修改时间', width: 180, sort: true}
                , {field: 'open', title: '状态', width: 100, sort: true, templet: '#switchTpl', unresize: true}
                , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 180}
            ]]
            , page: true
        });

        // 监听开关
        form.on('switch(openDemo)', function (obj) { //18 open：false
            $.get('/index.php/staff/Staff_Manage/updateOpen/id/' + this.value + '/open/' + (obj.elem.checked ? '1' : '0'));
        });

        //监听行工具事件
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            if (obj.event === 'view') { //查看
                location.href = '/index.php/staff/Staff_Manage/viewStaff/id/' + data.id;
            } else if (obj.event === 'update') { //修改
                location.href = '/index.php/staff/Staff_Manage/updateStaff/id/' + data.id;
            } else if (obj.event === 'del') {
                layer.confirm('确定删除“' + data.name + '”？', function (index) {
                    if (data.power === 0) {
                        obj.del();
                    }
                    layer.close(index);
                    $.get('/index.php/staff/Staff_Manage/delStaff/id/' + data.id);
                });
            }
        });
    });
</script>
</body>
</html>