"use strict";
var njim_object = {
    data: {
        is_new_client: 'n',
        domain: 'http://serve.njim.vip/',
        access: '',
        client_id: '',
        bind_count: 0,
        is_phone: false,//是否为移动设备
        viewport: '',//页面视口信息
        state: 2,//实例状态，2=加载中，1=启用，0=禁用
    },
    move: {
        mouse_offset_x: 0,
        mouse_offset_y: 0,
        is_draging: false
    },
    el: {
        container: '',
        container_id: 'njim_container',
        icon: ''
    },
    invitation: {
        _switch: false,
        first: 10000,
        after: 20000,
        num: 3,//需要执行次数
        count: 0,//当前已执行次数
        auto_close: 0,//自动关闭邀请，0=不关闭
        time: {
            start: [0, 0, 0],
            end: [23, 59, 59]
        },
        week: [],
        time_out: null
    }
};

//动态绑定事件
var interval = setInterval(function () {

    //打开窗口
    var open_click = nj_get('njim_open_click');
    var open_mouseover = nj_get('njim_open_mouseover');
    if (open_click) {//点击打开
        open_click.onclick = nj_open_chat_panel;
        njim_object.el.icon = open_click;
    } else if (open_mouseover) {//鼠标移入打开
        open_mouseover.onmouseover = nj_open_chat_panel;
        njim_object.el.icon = open_mouseover;
    }

    //邀请打开聊天窗口
    var invitation_open_chat = nj_get('njim_invitation_open_chat');
    if (invitation_open_chat) {
        invitation_open_chat.onclick = function () {
            nj_open_chat_panel();
        }
    }

    //等待一段时间再次邀请
    var invitation_continue = nj_get('njim_invitation_continue');//按钮
    if (invitation_continue) {
        invitation_continue.onclick = njim_invitation_time_out;
    }
    var njim_invitation_icon = nj_get('njim_invitation_icon');//图标
    if (njim_invitation_icon) {
        njim_invitation_icon.onclick = njim_invitation_time_out;
    }

    //不再邀请
    var invitation_close = nj_get('njim_invitation_close');
    if (invitation_close) {
        invitation_close.onclick = function () {
            njim_object.invitation._switch = false;
            njim_invitation_time_out();
        }
    }

    //窗口移动
    var window_move = nj_get('njim_window_move_layer');
    if (window_move) {
        window_move.onmousedown = nj_chat_move;
    }

    //窗口最小化
    var window_minimize = nj_get('njim_window_minimize');
    if (window_minimize) {
        window_minimize.onclick = nj_minimize;
    }
    //窗口最小化(移动端顶部)
    var window_top_close = nj_get('njim_window_top_close');
    if (window_top_close) {
        window_top_close.onclick = nj_minimize;
    }

    njim_object.data.bind_count++;
    if (njim_object.data.bind_count > 20) {
        clearInterval(interval);
    }
}, 1000);

//一段时间后发出邀请
function njim_invitation_time_out() {

    //关闭邀请框
    var invitation_box = nj_get('njim_invitation_box');
    invitation_box.style.display = 'none';

    clearTimeout(njim_object.invitation.time_out);

    //邀请开关
    if (!njim_object.invitation._switch) {
        return;
    }

    //邀请次数设置为 0 则不限制
    if (njim_object.invitation.num > 0) {
        if (njim_object.invitation.count >= njim_object.invitation.num) {//邀请次数达到限制
            return;
        }
    }

    var delay = (njim_object.invitation.count > 0 ? njim_object.invitation.after : njim_object.invitation.first) * 1000;

    setTimeout(function () {

        //根据多条件设置邀请功能是否启用
        var invitation = true;

        //星期条件
        var myDate = new Date();
        if (invitation) {
            invitation = false;//默认不通过
            var week = myDate.getDay();
            week = week === 0 ? 7 : week;
            for (var i = 0; i < njim_object.invitation.week.length; i++) {
                if (njim_object.invitation.week[i] == week) {
                    invitation = true;//通过
                    break;
                }
            }
        }

        //最小时间条件
        if (invitation) {
            var hours = njim_object.invitation.time.start[0];
            var minutes = njim_object.invitation.time.start[1];
            var seconds = njim_object.invitation.time.start[2];
            if (myDate.getHours() < hours) {
                invitation = false;//小时未到
            }
            if (myDate.getHours() == hours && myDate.getMinutes() < minutes) {
                invitation = false;//分钟未到
            }
            if (myDate.getHours() == hours && myDate.getMinutes() == minutes
                && myDate.getSeconds() < seconds) {
                invitation = false;//秒数未到
            }
        }

        //最大时间条件
        if (invitation) {
            var hours = njim_object.invitation.time.end[0];
            var minutes = njim_object.invitation.time.end[1];
            var seconds = njim_object.invitation.time.end[2];
            if (myDate.getHours() > hours) {
                invitation = false;//小时超时
            }
            if (myDate.getHours() == hours && myDate.getMinutes() > minutes) {
                invitation = false;//分钟超时
            }
            if (myDate.getHours() == hours && myDate.getMinutes() == minutes
                && myDate.getSeconds() > seconds) {
                invitation = false;//秒数超时
            }
        }

        //确保聊天窗口没有打开才能邀请
        if (nj_get("njim_window_box").style.display == 'none' && invitation) {
            njim_object.invitation.count++;//成功弹出邀请框才计数
            invitation_box.style.display = 'block';
            //一段时间后自动关闭邀请框
            if (njim_object.invitation.auto_close > 0) {
                njim_object.invitation.time_out = setTimeout(function () {
                    njim_invitation_time_out();
                }, njim_object.invitation.auto_close * 1000);
            }
        } else {//聊天窗口已打开或不满足打开条件，进入递归，关闭聊天窗口再次发出邀请
            njim_invitation_time_out();
        }
    }, delay);
}

/**
 * 设置viewport
 * @param type 1=设置，2=恢复
 */
function nj_set_viewport(type) {
    var exist = false;
    var meta = document.getElementsByTagName('meta');
    for (var i = 0; i < meta.length; i++) {
        if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "viewport") {
            exist = true;
            if (njim_object.data.viewport === '') {//只赋值一次
                njim_object.data.viewport = meta[i].content;
            }
            if (type === 1) {//设置
                meta[i].content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            } else if (type === 2) {//恢复
                meta[i].content = njim_object.data.viewport;
            }
            break;
        }
    }
    if (!exist) {
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
}

//引导一
(function () {
    njim_object.data.client_id = nj_get_client_id();
    njim_object.el.container = nj_get(njim_object.el.container_id);
    njim_object.el.container.style.zIndex = 2147483647;
    njim_object.el.container.style.position = 'fixed';
    njim_object.data.access = njim_object.el.container.getAttribute("access");// 获取实例编号
    njim_object.data.is_phone = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);//是否为移动设备

    //插入元素
    if (njim_object.data.is_phone) {//移动端
        nj_set_viewport(2);//初始化视口
        njim_object.el.container.innerHTML = '<div id="njim_icon_box"></div><div id="njim_window_box" ' +
            'style="width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; position: fixed; ' +
            'top:0; left:0; display: none;"><div id="njim_window_top_close" style="width: 100%; height: 50px; ' +
            'background: rgba(0,0,0,0.3);"></div><div style="border: none; margin: 0; padding: 0; ' +
            'position: absolute; top:50px; right:0; bottom:0; left: 0; background: #ccc;"><iframe ' +
            'id="njim_window_iframe" style="width: 100%; height: 100%; border: none; margin: 0; ' +
            'padding: 0; overflow: hidden; position: absolute; top:0; left: 0;" src="' +
            njim_object.data.domain + 'index.php/client/index/index/device/phone_1/access/' +
            njim_object.data.access + '/client_id/' + njim_object.data.client_id + '/is_new/' +
            njim_object.data.is_new_client + '"></iframe>' +
            '<div id="njim_window_minimize" style="position: absolute; top: 11px; left: 15px; ' +
            'width: 25px;height: 20px; background: url(/static/images/icon-desktop.png) ' +
            'no-repeat -20px -66px;"></div><a id="njim_top_phone" href="javascript:;" style="position: absolute; ' +
            'top: 11px; right: 15px; width: 22px;height: 20px; background: ' +
            'url(/static/images/icon-desktop.png) no-repeat -21px -572px;">' +
            '</a></div></div><div id="njim_invitation_box" style="display: none;"></div>';

    } else {//PC端
        njim_object.el.container.innerHTML = '<div id="njim_icon_box"></div>' +
            '<div id="njim_window_box" style=" width: 370px; height: 510px;  margin: 0; ' +
            'padding: 0; overflow: hidden;  position: fixed; bottom: -10px; right: -10px; display: none;">' +
            '<div style="width: 370px; height: 510px; background: url(' +
            njim_object.data.domain + 'static/images/move.png) no-repeat;"></div>' +
            '<iframe id="njim_window_iframe" style="width: 350px; height: 500px; border: none; ' +
            'margin: 0; padding: 0; overflow: hidden; position: absolute; top:0; left: 10px; " src="' +
            njim_object.data.domain + 'index.php/client/index/index/device/pc_1/access/' + njim_object.data.access +
            '/client_id/' + njim_object.data.client_id + '/is_new/' + njim_object.data.is_new_client +
            '"></iframe><div id="njim_window_move_layer" ' +
            'style=" width: 310px; height: 40px; position: absolute; top:0; left: 10px; cursor: move;"></div>' +
            '<div id="njim_window_minimize" style="position: absolute; ' +
            'top: 11px; right: 20px; width: 25px; height: 20px; background: url(' + njim_object.data.domain +
            'static/images/icon-desktop.png) no-repeat -20px -131px; cursor: pointer;"></div></div>' +
            '<div id="njim_invitation_box" style="display: none;"></div>';
    }

    // 创建jsonp
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.src = njim_object.data.domain + "index.php/client/jsonp/getSettings/is_phone/" + (njim_object.data.is_phone ? 'y' : 'n') + "/access/" + njim_object.data.access;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(script, s);//插入节点
    s.parentNode.removeChild(script);//删除节点
})();

/**
 * //引导二：载入设置
 *
 * @param data
 * @returns
 */
function nj_loading_settings(data) {
    njim_object.data.state = data.state;
    if (data.state === 1) {//实例可用
        //载入配置参数
        njim_object.invitation.after = data.invitation_after;
        njim_object.invitation.auto_close = data.invitation_auto_close;
        njim_object.invitation.first = data.invitation_first;
        njim_object.invitation.num = data.invitation_num;
        njim_object.invitation._switch = data.invitation_switch;
        data.invitation_time = data.invitation_time.split("-");//分割开始和结束时间
        njim_object.invitation.time.start = data.invitation_time[0].split(':');//分割开始时间
        njim_object.invitation.time.end = data.invitation_time[1].split(':');//分割结束时间
        njim_object.invitation.week = data.invitation_week.split('|');//分割星期

        for (var i = 0; i < njim_object.invitation.time.start.length; i++) {//开始时间转整数
            njim_object.invitation.time.start[i] = parseInt(njim_object.invitation.time.start[i]);
        }
        for (var i = 0; i < njim_object.invitation.time.end.length; i++) {//结束时间转整数
            njim_object.invitation.time.end[i] = parseInt(njim_object.invitation.time.end[i]);
        }
        for (var i = 0; i < njim_object.invitation.week.length; i++) {//星期转整数
            njim_object.invitation.week[i] = parseInt(njim_object.invitation.week[i]);
        }

        var njim_top_phone = nj_get('njim_top_phone');
        if (njim_top_phone) {//写入电话
            njim_top_phone.href = 'tel:' + data.phone;
        }

        //变量替换
        var regArr = [['{njim:color}', data.color]];
        for (var i = 0; i < regArr.length; i++) {
            var regExpObj = new RegExp(regArr[i][0], "g");
            data.icon_code = data.icon_code.replace(regExpObj, regArr[i][1]);
            data.invitation_code = data.invitation_code.replace(regExpObj, regArr[i][1]);
        }

        // 载入代码
        nj_get("njim_icon_box").innerHTML = data.icon_code;// 挂件
        nj_get('njim_invitation_box').innerHTML = data.invitation_code;// 邀请框

        if (njim_object.invitation._switch) {//邀请功能启用
            njim_invitation_time_out();
        }
    } else {//实例不可用

    }
}

// 打开客服面板
function nj_open_chat_panel() {
    njim_invitation_time_out();
    // 显示客服窗口
    nj_get("njim_window_box").style.display = "block";
    // 隐藏客服图标
    if (njim_object.el.icon) {
        njim_object.el.icon.style.display = "none";
    }
}

//最小化
function nj_minimize() {
    // 显示客服图标
    if (njim_object.el.icon) {
        njim_object.el.icon.style.display = "block";
    }

    // 隐藏客服窗口
    nj_get("njim_window_box").style.display = "none";
}

function nj_chat_move() {
    // 隐藏面板
    nj_get("njim_window_iframe").style.display = "none";
    nj_get("njim_window_minimize").style.display = "none";

    // 记录鼠标偏移量
    var e = window.event;
    njim_object.move.mouse_offset_x = e.offsetX;
    njim_object.move.mouse_offset_y = e.offsetY;
    njim_object.move.is_draging = true;
}

document.onmousemove = function (e) {
    if (njim_object.move.is_draging) {
        var e = e || window.event;
        // 鼠标在窗口的位置
        var moveX = e.clientX;
        var moveY = e.clientY;
        // 聊天窗口大小
        var dW = 370;
        var dH = 510;
        // 屏幕可视大小
        var _w = document.documentElement.clientWidth;
        var _h = document.documentElement.clientHeight;
        // 当前移动的坐标
        var x = _w - moveX - dW + njim_object.move.mouse_offset_x + 10;
        var y = _h - moveY - dH + njim_object.move.mouse_offset_y;
        // 右边
        if (x <= -10) {
            x = -10;
        }
        // 下边
        if (y <= 40 - dH) {
            y = 40 - dH;
        }
        // 左边
        if (x >= _w - dW + 10) {
            x = _w - dW + 10;
        }
        // 上边
        if (y >= _h - dH) {
            y = _h - dH;
        }
        var moveBg = nj_get("njim_window_box");
        moveBg.style.right = x + "px";
        moveBg.style.bottom = y + "px";
    }
}

document.onmouseup = function () {
    njim_object.move.is_draging = false;
    // 显示
    nj_get("njim_window_iframe").style.display = "block";
    nj_get("njim_window_minimize").style.display = "block";
}

function nj_set_cookie(c_name, value, expiredays, path) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value)
        + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
        + ((path == null) ? "" : ";path=" + path);
}

function nj_get_cookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return ""
}

// 刷新cookie
function nj_get_client_id() {
    var cookie_name = 'nj_unique_id';
    var cookie_val = nj_get_cookie(cookie_name);
    if (cookie_val == null || cookie_val == '') { // cookie不存在，生成ID
        cookie_val = nj_generate_unique();
        njim_object.data.is_new_client = 'y';// 新访客
    }
    // 更新cookie
    nj_set_cookie(cookie_name, cookie_val, 90, '/');
    return cookie_val;
}

// 生成随机字符串
function nj_generate_unique() {
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var str = "";
    for (var i = 0; i < 40; i++) {
        str += arr[Math.round(Math.random() * (arr.length - 1))];
    }
    return str;
}

function nj_get(id) {
    return document.getElementById(id);
}
