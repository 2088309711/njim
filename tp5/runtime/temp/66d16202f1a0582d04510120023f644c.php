<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:72:"D:\php-workspace\njim/tp5/application/staff\view\example_style\view.html";i:1543828931;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>样式资料</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/static/layui/css/layui.css" media="all">
</head>
<body style="padding: 0 10px;">

<blockquote class="layui-elem-quote layui-text" style="margin-top: 10px;">样式资料</blockquote>

<table class="layui-table" lay-skin="line">
    <colgroup>
        <col width="150">
        <col>
    </colgroup>
    <thead>
    <tr>
        <th>项目</th>
        <th>信息</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>ID</td>
        <td><?php echo $style['id']; ?></td>
    </tr>
    <tr>
        <td>名称</td>
        <td><?php echo $style['name']; ?></td>
    </tr>
    <tr>
        <td>主题色</td>
        <td><div style="background: <?php echo $style['color']; ?>; width: 16px; height: 16px; border-radius: 50%;"></div></td>
    </tr>
    <tr>
        <td>挂件代码</td>
        <td><textarea readonly class="layui-textarea"><?php echo $style['icon_code']; ?></textarea></td>
    </tr>
    <tr>
        <td>邀请框代码</td>
        <td><textarea readonly class="layui-textarea"><?php echo $style['invitation_code']; ?></textarea></td>
    </tr>
    <tr>
        <td>创建时间</td>
        <td><?php echo $style['create_time']; ?></td>
    </tr>
    <tr>
        <td>修改时间</td>
        <td><?php echo $style['update_time']; ?></td>
    </tr>
    <tr>
        <td>描述</td>
        <td>
            <div style="word-wrap: break-word; word-break: normal; width: 500px;"><?php echo $style['description']; ?></div>
        </td>
    </tr>
    <tr>
        <td>操作</td>
        <td>
            <a href="/index.php/staff/example_style/index" class="layui-btn layui-btn-sm">返回</a>
            <a href="/index.php/staff/Example_Style/updateStyle/id/<?php echo $style['id']; ?>" class="layui-btn layui-btn-normal layui-btn-sm">修改</a>
            <button id="update" class="layui-btn layui-btn-danger layui-btn-sm">删除</button>
        </td>
    </tr>
    </tbody>
</table>

<script src="/static/layui/layui.js" charset="utf-8"></script>
<script>
    layui.use('layer', function () {
        var layer = layui.layer;
        var $ = layui.$;

        $(function () {
            $('#update').click(function () {
                layer.confirm('确定删除“<?php echo $style['name']; ?>”？<br>被使用的样式无法删除', function (index) {
                    layer.close(index);
                    $.get('/index.php/staff/Example_Style/delStyle/id/<?php echo $style['id']; ?>');
                    location.href = '/index.php/staff/example_style/index';
                });
            });
        });
    });
</script>
</body>
</html>