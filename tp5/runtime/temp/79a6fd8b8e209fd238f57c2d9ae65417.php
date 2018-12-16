<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:67:"D:\php-workspace\njim/tp5/application/staff\view\example\index.html";i:1543653090;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>实例列表</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/static/layui/css/layui.css" media="all">
</head>
<body style="padding: 0 10px;">

<table class="layui-hide" id="test" lay-filter="test"></table>

<script type="text/html" id="toolbarDemo">
    <div class="layui-btn-container">
        <a href="/index.php/staff/Example/create" class="layui-btn layui-btn-sm">创建实例</a>
    </div>
</script>

<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="view">查看</a>
    <a class="layui-btn layui-btn-xs" lay-event="deploy">部署</a>
    <a class="layui-btn layui-btn-xs" lay-event="update">修改</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>

<script src="/static/layui/layui.js" charset="utf-8"></script>

<script>
    layui.use(['table', 'jquery'], function () {
        var table = layui.table;
        var $ = layui.$;
        table.render({
            elem: '#test'
            , url: '/index.php/staff/Example/getAllExampleByUser'
            , toolbar: '#toolbarDemo'
            , title: '实例列表'
            , cols: [[
                {field: 'id', title: 'ID', width: 80, fixed: 'left', sort: true}
                , {field: 'name', title: '实例名', sort: true}
                , {field: 'create_time', title: '创建时间', width: 180, sort: true}
                , {field: 'update_time', title: '修改时间', width: 180, sort: true}
                , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 210}
            ]]
            , page: true
        });
        
        //监听行工具事件
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            if (obj.event === 'view') { //查看
                location.href = '/index.php/staff/Example/viewExample/id/' + data.id;
            } else if (obj.event === 'deploy') { //部署
                location.href = '/index.php/staff/Example/deployExample/id/' + data.id;
            } else if (obj.event === 'update') { //修改
                location.href = '/index.php/staff/Example/updateExample/id/' + data.id;
            } else if (obj.event === 'del') {
                layer.confirm('确定删除“' + data.name + '”吗？<br>确认后，该实例部署的所有网页将<strong style="color: #FF5722;">失去</strong>在线客服的所有功能，请<strong style="color: #FF5722;">谨慎</strong>操作！', function (index) {
                    obj.del();
                    layer.close(index);
                    $.get('/index.php/staff/Example/delExample/id/' + data.id);
                });
            }
        });
    });
</script>
</body>
</html>