<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:74:"D:\php-workspace\njim/tp5/application/staff\view\example_style\update.html";i:1543651335;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>修改样式</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/static/layui/css/layui.css" media="all">
</head>
<body style="padding: 0 10px;">

<blockquote class="layui-elem-quote layui-text" style="margin-top: 10px;">修改样式</blockquote>

<form class="layui-form" action="/index.php/staff/Example_Style/saveExampleStyle" method="post">
    <?php echo token(); ?>
    <input type="hidden" name="id" value="<?php echo $example_style['id']; ?>">
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">样式名称</label>
            <div class="layui-input-inline">
                <input type="tel" name="name" value="<?php echo $example_style['name']; ?>" placeholder="请输入样式名" lay-verify="required"
                       autocomplete="off" class="layui-input">
            </div>
        </div>

        <div class="layui-inline">
            <label class="layui-form-label">主题色</label>
            <div class="layui-input-inline" style="width: 120px;">
                <input type="text" name="color" lay-verify="required" value="<?php echo $example_style['color']; ?>"
                       placeholder="请选择颜色" class="layui-input" id="color-input">
            </div>
            <div class="layui-inline" style="left: -11px;">
                <div id="color"></div>
            </div>
        </div>
    </div>


    <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">挂件代码</label>
        <div class="layui-input-block">
            <textarea id="icon_code" placeholder="请输入HTML内容" lay-verify="required" name="icon_code"
                      class="layui-textarea"><?php echo $example_style['icon_code']; ?></textarea>
        </div>
    </div>

    <div class="layui-form-item">
        <div class="layui-input-block">
            <blockquote style="line-height: 2;" class="layui-elem-quote layui-quote-nm">
                1. 请遵循挂件代码 <a href="#" class="layui-btn layui-btn-xs" target="_blank">编写规范</a><br>
                2. 如果您不会填写，请点击按钮使用官方默认的挂件代码：
                <button type="button" class="layui-btn layui-btn-normal layui-btn-xs n-icon-code" index="0">挂件1</button>
            </blockquote>
        </div>
    </div>


    <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">邀请框代码</label>
        <div class="layui-input-block">
            <textarea id="invitation_code" placeholder="请输入HTML内容" lay-verify="required" name="invitation_code"
                      class="layui-textarea"><?php echo $example_style['invitation_code']; ?></textarea>
        </div>
    </div>

    <div class="layui-form-item">
        <div class="layui-input-block">
            <blockquote style="line-height: 2;" class="layui-elem-quote layui-quote-nm">
                1. 请遵循邀请框代码 <a href="#" class="layui-btn layui-btn-xs" target="_blank">编写规范</a><br>
                2. 如果您不会填写，请点击按钮使用官方默认的邀请框代码：
                <button type="button" class="layui-btn layui-btn-normal layui-btn-xs n-invitation-code" index="0">邀请框1</button>
            </blockquote>
        </div>
    </div>

    <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">描述</label>
        <div class="layui-input-block">
            <textarea placeholder="请输入内容" name="description" class="layui-textarea"><?php echo $example_style['description']; ?></textarea>
        </div>
    </div>

    <div class="layui-form-item">
        <div class="layui-input-block">
            <a href="/index.php/staff/example_style/index" class="layui-btn">返回</a>
            <button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
    </div>
</form>
<script src="/static/layui/layui.js" charset="utf-8"></script>
<script src="/static/js/example_style.js" charset="utf-8"></script>
<script>
    layui.use(['form', 'colorpicker'], function () {
        var $ = layui.$, colorpicker = layui.colorpicker;

        //表单赋值
        colorpicker.render({
            elem: '#color'
            , color: '<?php echo $example_style['color']; ?>'
            , done: function (color) {
                $('#color-input').val(color);
            }
        });

        $(function () {
            insertCode($);
        });
    });
</script>
</body>
</html>