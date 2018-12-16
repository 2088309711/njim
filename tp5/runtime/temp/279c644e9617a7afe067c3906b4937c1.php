<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:68:"D:\php-workspace\njim/tp5/application/staff\view\register\index.html";i:1544884109;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <title>注册</title>
    <meta name="keywords" content="关键词"/>
    <meta name="description" content="描述"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/pintuer/pintuer.css">
    <script src="/static/js/jquery.js"></script>
    <script src="/static/pintuer/pintuer.js"></script>
    <script src="/static/pintuer/respond.js"></script>
</head>
<body>
<div align="center" style="padding-top: 150px;">
    <form action="/index.php/staff/register/save" method="post" onsubmit="return ckForm()">
        <?php echo token(); ?>
        <div class="panel padding" style="width: 450px;text-align: left;">
            <div class="text-center">
                <br>
                <h2><strong>欢迎使用柠吉在线客服</strong></h2></div>
            <div class="" style="padding:30px;">
                <div class="form-group">
                    <div class="field field-icon-right">
                        <input id="user_name" type="text" class="input" name="user_name" placeholder="用户名"/>
                        <span class="icon icon-user"></span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="field field-icon-right">
                        <input id="password" type="password" class="input" name="password" placeholder="密码"/>
                        <span class="icon icon-key"></span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="field field-icon-right">
                        <input id="repassword" type="password" class="input" name="repassword" placeholder="确认密码"/>
                        <span class="icon icon-key"></span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="field">
                        <label>
                            <input type="checkbox" name="agreement" value="1">同意服务协议
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="field">
                        <button class="button button-block bg-main text-big">注册</button>
                    </div>
                </div>
                <div class="form-group">
                    <div class="field text-center">
                        <p class="text-muted text-center">
                            <a class="" href="/index.php/staff/login">已有账号？请直接登录</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

</body>
</html>