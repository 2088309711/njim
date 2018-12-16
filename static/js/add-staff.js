var onSubmit = false;

function showAlert(text) {
	$('#alert-text').text(text);
	$('#alert').removeClass('hidden');
}

function hideAlert() {
	$('#alert-text').text('');
	$('#alert').addClass('hidden');
}

// 检查用户名
function ckUserName_1() {

	var userName = $("#user-name").val();

	var flag = true;

	// 只能输入5-14个字母、数字、下划线
	if (!/^\w{5,14}$/.test(userName)) {

		showAlert("用户名只能输入5~14个字母、数字、下划线");

		flag = false;

	} else {

		hideAlert();

	}

	return flag;

}

// 检查用户名是否重复
function ckUserName_2() {

	onSubmit = false;

	if (ckUserName_1()) {

		$.ajax({
			url : "/index.php/staff/register/ckUserName/userName/"
					+ $("#user-name").val(),
			dataType : "json",
			success : function(result) {

				if (result.noExist) {
					onSubmit = true;
				} else {
					showAlert("用户名已存在，请更换");
				}

			}
		});
	}

}

// 检查表单
function ckForm() {

	var name = $("#name").val();
	var password1 = $("#password-1").val();
	var password2 = $("#password-2").val();

	if (name.length < 2 || name.length > 8) {
		showAlert("昵称只能输入2~8个字符");
		return false;
	} else {
		hideAlert();
	}

	if (!onSubmit) {
		showAlert("用户名只能输入5~14个字母、数字、下划线");
		return false;
	}

	if (!/^\w{6,16}$/.test(password1)) {
		showAlert("密码只能输入6~16个字母、数字、下划线");
		return false;
	} else {
		hideAlert();
	}

	if (password1 != password2) {
		showAlert("两次输入的密码不一致");
		return false;
	} else {
		hideAlert();
	}

	return true;

}