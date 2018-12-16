$(function () {
    ckAgreement();
    $("#agreement").click(function () {
        ckAgreement();
    });
});

/**
 * 同意协议
 */
function ckAgreement() {
    if ($("#agreement-checkbox").is(':checked')) {
        $('#ck-img-1').show();
    } else {
        $('#ck-img-1').hide();
    }
}

/**
 * 检查用户名
 */
function ckUserName() {
    var userName = $("#userName").val();
    if (userName.length < 5 || userName.length > 14) {
        return false;
    }
    return true;
}

/**
 * 失去焦点检查用户名
 *
 * @returns
 */
function blurCkUserName() {

    if (ckUserName()) {
        ckUserNameIsExist();
    }

}

var userNameNoExist = false;

/**
 * 检查用户名是否存在
 *
 * @returns
 */
function ckUserNameIsExist() {
    var userName = $("#userName").val();
    userNameNoExist = false;
    $.ajax({
        url: "/index.php/staff/register/ckUserName/userName/" + userName,
        dataType: "json",
        success: function (result) {


            if (result.noExist) {

                userNameNoExist = true;
            } else {
                el.text("用户名已存在，请更换");
            }
        }
    });
}

// 检查表单
function ckForm() {

    var el = $("#show-err");

    if (!ckUserName()) {
        return false;
    }

    // 检查密码
    var password1 = $('#password-1').val();
    if (password1.length < 6 || password1.length > 16) {
        el.text("密码只能输入6~16位");
        return false;
    } else {
        el.text("");
    }

    var password2 = $('#password-2').val();
    if (password1 != password2) {
        el.text("两次输入的密码不一致");
        return false;
    } else {
        el.text("");
    }

    var verification = $('#verification').val();
    if (!/^[a-zA-Z0-9]{4}$/.test(verification)) {
        el.text("验证码只能输入4位字母或数字");
        return false;
    } else {
        el.text("");
    }

    if (!$("#agreement-checkbox").is(':checked')) {
        el.text("请勾选同意服务协议");
        return false;
    } else {
        el.text("");
    }

    if (!userNameNoExist) {
        el.text("用户名已存在，请更换");
        return false;
    } else {
        el.text("");
    }

    return false;
}

