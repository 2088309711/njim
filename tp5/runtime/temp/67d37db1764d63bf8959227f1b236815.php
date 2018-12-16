<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:68:"D:\php-workspace\njim/tp5/application/staff\view\example\deploy.html";i:1543651447;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>部署实例</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/static/layui/css/layui.css" media="all">
</head>
<body style="padding: 0 10px;">

<blockquote class="layui-elem-quote layui-text" style="margin-top: 10px;">部署实例</blockquote>

<fieldset class="layui-elem-field layui-field-title">
    <legend>部署到网页</legend>
</fieldset>


<pre class="layui-code">
&lt;div id="njim_container" access="<?php echo $example['access']; ?>"&gt;&lt;/div&gt;
&lt;script src="http://serve.njim.vip/static/js/im.js" charset="utf-8"&gt;&lt;/script&gt;
</pre>

<blockquote class="layui-elem-quote layui-quote-nm">请将以上代码粘贴到您的网页&lt;/body&gt;（注意有个“/”）之前即可完成网页部署。</blockquote>

<a href="/index.php/staff/example/index" class="layui-btn">返回</a>

<script src="/static/layui/layui.js" charset="utf-8"></script>
<script>
    layui.use('code', function () { //加载code模块
        layui.code({
            title: '您正在部署“<?php echo $example['name']; ?>”，请手动复制这些代码',
            skin: 'notepad',
            about: false
        });
    });
</script>
</body>
</html>