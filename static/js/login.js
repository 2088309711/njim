/**
 * 检查表单
 * @returns {boolean}
 */
function ckForm() {

    return true;//关闭表单验证

    // 检查用户名
    var userName = $("#user_name").val();
    if (userName.length < 5 || userName.length > 14) {
        alert('用户名长度不符');
        return false;
    }

    // 检查密码
    var password = $('#password').val();
    if (password.length < 6 || password.length > 16) {
        alert('密码长度不符合');
        return false;
    }

    return true;
}
