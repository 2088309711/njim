<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:69:"D:\php-workspace\njim/tp5/application/staff\view\register\regist.html";i:1540974284;}*/ ?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>注册</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link rel="stylesheet" href="/static/css/reset.css">
<link rel="stylesheet" href="/component/starry/css/style.css">
<link rel="stylesheet" href="/static/css/regist.css">
</head>

<body>
	<script id="vertexShader" type="x-shader/x-vertex">

// Uniforms
uniform float time;
varying vec3 vNormal;
      
void main(void) {
   vec3 v = position;
   vNormal = normal;
   v.z += cos(2.0 * position.x + (time)) * 4085.5;
	
   gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(v, 1.0);
}

		</script>


	<script id="fragmentShader" type="x-shader/x-fragment">
varying vec3 vNormal;
uniform float time;
      
void main(void) {
    vec3 light = vec3(0.1, .9, .1);

    light = normalize(light);

    float dProd = max(0.2, dot(vNormal, light));

    gl_FragColor = vec4(dProd, // R
                      dProd, // G
                      dProd, // B
                      1.0);  // A
}

		</script>
	<script src="/component/starry/js/three.min.js"></script>

	<script src="/component/starry/js/index.js"></script>


	<div class="container">

		<form action="/index.php/staff/register/save" method="post" onsubmit="return ckForm()">

			<div class="box-2">

				<div class="title-1">创建客服账号</div>
				<div class="title-2">REGISTRY CENTER</div>


			</div>


			<div class="box-1">
				<span class="title-2">用户名</span> <input type="text" id="userName"
					class="input-1" onblur="blurCkUserName()"
					placeholder="字母、数字、下划线5~14位">
			</div>


			<div class="box-1">
				<span class="title-2">密码</span> <input type="password"
					id="password-1" class="input-1" placeholder="长度为6~16位">
			</div>

			<div class="box-1">
				<span class="title-2">确认密码</span> <input type="password"
					id="password-2" name="password_2" class="input-1"
					placeholder="请再次输入密码">
			</div>

			<div class="box-1">
				<label id="agreement" class="agreement"><input
					id="agreement-checkbox" type="checkbox" value="1">
					<div id="ck-img-1"></div>
					<div id="ck-img-2"></div> <span class="text">同意<a href="#">柠吉IM服务协议</a>
				</span> </label>

			</div>
			<div class="box-1">

				<input type="submit" class="submit" value="注册"> <span
					class="login-text">已有账号？请<a href="login.html">登录</a></span>

			</div>

			<div id="show-err" class="err-msg"></div>

		</form>
	</div>

	<script src="/static/js/jquery.js"></script>
	<script src="/static/js/regist.js"></script>

</body>
</html>
