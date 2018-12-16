<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:65:"D:\php-workspace\njim/tp5/application/staff\view\index\index.html";i:1543727516;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>客服工作台 - 柠吉在线客服</title>
    <link rel="stylesheet" href="/static/layui/css/layui.css">
</head>
<body class="layui-layout-body" style="min-width: 1000px;">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">欢迎使用柠吉IM</div>

        <ul class="layui-nav layui-layout-left">
            <li class="layui-nav-item"><a href="/index.php/staff/admin">控制台</a></li>
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item"><a href="javascript:;"><?php echo $staff['name']; ?></a>
                <dl class="layui-nav-child">
                    <dd><a href="/index.php/staff/Staff_Manage/updateStaffByLogin" target="iframe">基本资料</a></dd>
                    <dd><a href="/index.php/staff/Staff_Manage/updatePass" target="iframe">修改密码</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item"><a href="/">首页</a></li>
            <li class="layui-nav-item"><a
                    href="/index.php/staff/login/logout"
                    onclick="return confirm('确定退出？')">退出</a></li>
        </ul>
    </div>

    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">

            <ul class="layui-nav layui-nav-tree" lay-filter="test">
                <li class="layui-nav-item"><a href="/index.php/staff/chat"
                                              target="iframe">对话平台</a></li>
            </ul>
        </div>
    </div>

    <div class="layui-body" style="overflow: hidden;">

        <iframe src="" style="width: 100%; height: 100%; border: 0;"
                name="iframe"></iframe>
    </div>

    <div class="layui-footer">

        版权所有 © 2017-2018 柠吉IM，All Rights Reserved.
    </div>
</div>
<script src="/static/layui/layui.js"></script>
<script>
    layui.use('element');
</script>
</body>
</html>