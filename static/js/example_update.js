var layer = null;
layui.use(['layer', 'form'], function () {
    layer = layui.layer;
});

/**
 * 发送请求
 * @param name 参数名
 * @param value 参数值
 */
function sendRequest(name, value) {
    $.ajax({
        url: '/index.php/staff/Example/updateField',
        type: 'POST',
        dataType: 'json',
        data: {
            id: $('#id').val(),
            name: name,
            value: value
        },
        success: function (data) {
            layer.msg(data.msg, {icon: (data.state === 1 ? 6 : 5)});
        },
        error: function () {
            layer.msg('很遗憾，操作失败', {icon: 5});
        }
    });
}

$(function () {

    //基本
    $('#example-switch').click(function () {
        sendRequest('state', ($(this).get(0).checked) ? 1 : 0);
    });

    $('#example-name').blur(function () {
        sendRequest('name', $(this).val());
    });

    $('#description').blur(function () {
        sendRequest('description', $(this).val());
    });

    //皮肤
    $('#color').blur(function () {
        sendRequest('color', $(this).val());
    });

    $('#color-m').blur(function () {
        sendRequest('color_m', $(this).val());
    });

    $('#icon-code').blur(function () {
        sendRequest('icon_code', $(this).val());
    });
    $('#icon-code-m').blur(function () {
        sendRequest('icon_code_m', $(this).val());
    });

    $('#invitation-code').blur(function () {
        sendRequest('invitation_code', $(this).val());
    });

    $('#invitation-code-m').blur(function () {
        sendRequest('invitation_code_m', $(this).val());
    });

    //邀请功能
    $('#invitation-switch').click(function () {
        sendRequest('invitation_switch', ($(this).get(0).checked) ? 1 : 0);
    });

    $('#invitation-switch-m').click(function () {
        sendRequest('invitation_switch_m', ($(this).get(0).checked) ? 1 : 0);
    });

    $('#invitation-time').blur(function () {
        sendRequest('invitation_time', $(this).val());
    });

    $('#invitation-time-m').blur(function () {
        sendRequest('invitation_time_m', $(this).val());
    });

    $('#invitation-num').blur(function () {
        sendRequest('invitation_num', $(this).val());
    });

    $('#invitation-num-m').blur(function () {
        sendRequest('invitation_num_m', $(this).val());
    });


    $('#invitation-first').blur(function () {
        sendRequest('invitation_first', $(this).val());
    });

    $('#invitation-first-m').blur(function () {
        sendRequest('invitation_first_m', $(this).val());
    });

    $('#invitation-after').blur(function () {
        sendRequest('invitation_after', $(this).val());
    });

    $('#invitation-after-m').blur(function () {
        sendRequest('invitation_after_m', $(this).val());
    });

    $('#invitation-auto-close').blur(function () {
        sendRequest('invitation_auto_close', $(this).val());
    });

    $('#invitation-auto-close-m').blur(function () {
        sendRequest('invitation_auto_close_m', $(this).val());
    });

    $('.invitation-week-checkbox').click(function () {
        var arr_v = new Array();
        $('input[name="invitation_week"]:checked').each(function () {
            arr_v.push($(this).val());
        });
        sendRequest('invitation_week', arr_v.join('|'));
    });

    $('.invitation-week-m-checkbox').click(function () {
        var arr_v = new Array();
        $('input[name="invitation_week_m"]:checked').each(function () {
            arr_v.push($(this).val());
        });
        sendRequest('invitation_week_m', arr_v.join('|'));
    });

    //客服
    $('.staff-list-checkbox').click(function () {
        var arr_v = new Array();
        $('input[name="staff_pk"]:checked').each(function () {
            arr_v.push($(this).val());
        });
        sendRequest('staff_pk', arr_v.join('|'));
    });
    
});
