<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:67:"F:\phpStudy\WWW\njim/tp5/application/staff\view\example\create.html";i:1545009064;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>创建实例</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/static/layui/css/layui.css" media="all">
</head>
<body style="padding: 0 10px;">

<blockquote class="layui-elem-quote layui-text" style="margin-top: 10px;">创建实例</blockquote>

<form class="layui-form" lay-filter="formTest" action="/index.php/staff/Example/createExample" method="post">
    <?php echo token(); ?>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>基本设置</legend>
    </fieldset>


    <blockquote class="layui-elem-quote layui-quote-nm" style="color: #666; border-color: #FF5722;">
        <strong style="color: #FF5722;">重要提示：</strong>样式用来美化应用的外观（前台组件的皮肤），如果您还没有样式，请创建一个样式，下面需要给实例绑定一个样式，<strong
            style="color: #FF5722;">否则当前表单无法提交。</strong>
        <a href="/index.php/staff/Example_Style/create" class="layui-btn layui-btn-normal layui-btn-xs">创建样式</a>
    </blockquote>


    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">实例名称</label>
            <div class="layui-input-inline">
                <input type="text" name="name" placeholder="请输入实例名" lay-verify="required" autocomplete="off"
                       class="layui-input">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">绑定样式</label>
            <div class="layui-input-inline">
                <select name="style_id" lay-search="">
                    <option value="">选择或输入</option>
                    <?php if(is_array($style_list) || $style_list instanceof \think\Collection || $style_list instanceof \think\Paginator): $i = 0; $__LIST__ = $style_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
                    <option value="<?php echo $vo['id']; ?>"><?php echo $vo['name']; ?></option>
                    <?php endforeach; endif; else: echo "" ;endif; ?>
                </select>
            </div>
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">选择客服</label>
        <div class="layui-input-block">
            <?php if(is_array($staff_list) || $staff_list instanceof \think\Collection || $staff_list instanceof \think\Paginator): $i = 0; $__LIST__ = $staff_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
            <input type="checkbox" name="staff_pk[]" value="<?php echo $vo['id']; ?>" title="<?php echo $vo['name']; ?>" checked>
            <?php endforeach; endif; else: echo "" ;endif; ?>
        </div>
    </div>

    <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">描述</label>
        <div class="layui-input-block">
            <textarea placeholder="请输入内容" name="description" class="layui-textarea"></textarea>
        </div>
    </div>

    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>邀请功能设置</legend>
    </fieldset>

    <div class="layui-form-item">
        <label class="layui-form-label">邀请功能</label>
        <div class="layui-input-block">
            <input type="checkbox" name="invitation_switch" value="1" lay-skin="switch" lay-text="启用|禁用" checked>
        </div>
    </div>


    <blockquote class="layui-elem-quote layui-quote-nm" style="color: #666;">
        1、<strong style="color: #FF5722;">时间范围：</strong>在某个时间段内才会向访客发出咨询邀请，可以设置为客服人员工作时间，如果希望全天邀请，请设置为：00:00:00 -
        23:59:59；<br>
        2、<strong style="color: #FF5722;">邀请次数：</strong>需要向访客发出多少次咨询邀请，请输入正整数，如果不限制请填0（零）。
    </blockquote>


    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">时间范围</label>
            <div class="layui-input-inline">
                <input type="text" class="layui-input" id="test9" value="00:00:00 - 23:59:59" name="invitation_time"
                       placeholder="建议设定客服工作时间" lay-verify="required">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">邀请次数</label>
            <div class="layui-input-inline">
                <input type="text" name="invitation_num" placeholder="无限次请填0（零）" lay-verify="required"
                       class="layui-input" value="0">
            </div>
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">星期范围</label>
        <div class="layui-input-block">
            <input type="checkbox" name="invitation_week[]" value="7" title="周日" checked>
            <input type="checkbox" name="invitation_week[]" value="1" title="周一" checked>
            <input type="checkbox" name="invitation_week[]" value="2" title="周二" checked>
            <input type="checkbox" name="invitation_week[]" value="3" title="周三" checked>
            <input type="checkbox" name="invitation_week[]" value="4" title="周四" checked>
            <input type="checkbox" name="invitation_week[]" value="5" title="周五" checked>
            <input type="checkbox" name="invitation_week[]" value="6" title="周六" checked>
        </div>
    </div>

    <blockquote class="layui-elem-quote layui-quote-nm" style="color: #666;">
        1、以下三项均为延迟时间，<strong style="color: #FF5722;">请输入正整数，</strong>以秒为单位；<br>
        2、<strong style="color: #FF5722;">自动关闭：</strong>当系统向访客发出咨询邀请后，如果访客在一段时间内没有响应，邀请框会自动关闭，如果不希望自动关闭请填0（零）。
    </blockquote>

    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">首次邀请</label>
            <div class="layui-input-inline">
                <input type="text" name="invitation_first" placeholder="延迟时间（秒）" lay-verify="required"
                       class="layui-input" value="10">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">后续邀请</label>
            <div class="layui-input-inline">
                <input type="text" name="invitation_after" placeholder="延迟时间（秒）" lay-verify="required"
                       class="layui-input" value="20">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">自动关闭</label>
            <div class="layui-input-inline">
                <input type="text" name="invitation_auto_close" placeholder="延迟时间（秒）" lay-verify="required"
                       class="layui-input" value="0">
            </div>
        </div>
    </div>

    <div class="layui-form-item">
        <div class="layui-input-block">
            <a href="/index.php/staff/example/index" class="layui-btn">返回</a>
            <button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
    </div>
</form>
<script src="/static/layui/layui.js" charset="utf-8"></script>
<script>
    layui.use(['form', 'laydate'], function () {
        var laydate = layui.laydate;
        var form = layui.form;


        form.val("formTest", {
            'name': '自动填写的实例',
            'description': '除了绑定样式，其他字段均为系统自动填写的内容，请根据实际需求修改。'
        });


        //时间范围选择
        laydate.render({
            elem: '#test9'
            , type: 'time'
            , range: true //或 range: '~' 来自定义分割字符
        });
    });
</script>
</body>
</html>