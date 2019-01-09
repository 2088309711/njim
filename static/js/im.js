//封装成插件
(function () {
    "use strict";
    //data
    var is_new_client = 'n',
        domain = 'http://serve.njim.vip/',
        client_id = '',
        bind_count = 0,
        is_phone = false,//是否为移动设备
        viewport = '',//页面视口信息
        state = 2,//实例状态，2=加载中，1=启用，0=禁用

        //move
        mouse_offset_x = 0,
        mouse_offset_y = 0,
        is_draging = false,

        //el
        container_id = 'njim_container',
        icon = '',

        //invitation
        _switch = false,
        first = 10000,
        after = 20000,
        invitation_num = 3,//需要执行次数
        invitation_count = 0,//当前已执行次数
        auto_close = 0,//自动关闭邀请，0=不关闭

        //time
        start = [0, 0, 0],
        end = [23, 59, 59],

        invitation_week = [],
        time_out = null;


    /**
     * 一段时间后发出邀请
     */
    function invitation_time_out() {

        //关闭邀请框
        var invitation_box = get('njim_invitation_box');
        invitation_box.style.display = 'none';

        clearTimeout(time_out);

        //邀请开关
        if (!_switch) {
            return;
        }

        //邀请次数设置为 0 则不限制
        if (invitation_num > 0) {
            if (invitation_count >= invitation_num) {//邀请次数达到限制
                return;
            }
        }

        var delay = (invitation_count > 0 ? after : first) * 1000;

        setTimeout(function () {

            //根据多条件设置邀请功能是否启用
            var invitation = true;

            //星期条件
            var myDate = new Date();
            if (invitation) {
                invitation = false;//默认不通过
                var week = myDate.getDay();
                week = week === 0 ? 7 : week;
                for (var i = 0; i < invitation_week.length; i++) {
                    if (invitation_week[i] == week) {
                        invitation = true;//通过
                        break;
                    }
                }
            }

            //最小时间条件
            if (invitation) {
                var hours = start[0];
                var minutes = start[1];
                var seconds = start[2];
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
                var hours = end[0];
                var minutes = end[1];
                var seconds = end[2];
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
            if (get("njim_window_box").style.display == 'none' && invitation) {
                invitation_count++;//成功弹出邀请框才计数
                invitation_box.style.display = 'block';
                //一段时间后自动关闭邀请框
                if (auto_close > 0) {
                    time_out = setTimeout(function () {
                        invitation_time_out();
                    }, auto_close * 1000);
                }
            } else {//聊天窗口已打开或不满足打开条件，进入递归，关闭聊天窗口再次发出邀请
                invitation_time_out();
            }
        }, delay);
    }


    /**
     * 设置viewport
     * @param type 1=设置，2=恢复
     */
    function set_viewport(type) {
        var exist = false;
        var meta = document.getElementsByTagName('meta');
        for (var i = 0; i < meta.length; i++) {
            if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "viewport") {
                exist = true;
                if (viewport === '') {//只赋值一次
                    viewport = meta[i].content;
                }
                if (type === 1) {//设置
                    meta[i].content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                } else if (type === 2) {//恢复
                    meta[i].content = viewport;
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

    /**
     * //引导二：载入设置
     *
     * @param data
     * @returns
     */
    function load_settings(data) {
        state = data.state;
        if (data.state === 1) {//实例可用
            //载入配置参数
            after = data.invitation_after;
            auto_close = data.invitation_auto_close;
            first = data.invitation_first;
            invitation_num = data.invitation_num;
            _switch = data.invitation_switch;
            data.invitation_time = data.invitation_time.split("-");//分割开始和结束时间
            start = data.invitation_time[0].split(':');//分割开始时间
            end = data.invitation_time[1].split(':');//分割结束时间
            invitation_week = data.invitation_week.split('|');//分割星期

            for (var i = 0; i < start.length; i++) {//开始时间转整数
                start[i] = parseInt(start[i]);
            }
            for (var i = 0; i < end.length; i++) {//结束时间转整数
                end[i] = parseInt(end[i]);
            }
            for (var i = 0; i < invitation_week.length; i++) {//星期转整数
                invitation_week[i] = parseInt(invitation_week[i]);
            }

            var njim_top_phone = get('njim_top_phone');
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
            get("njim_icon_box").innerHTML = data.icon_code;// 挂件
            get('njim_invitation_box').innerHTML = data.invitation_code;// 邀请框

            if (_switch) {//邀请功能启用
                invitation_time_out();
            }
        } else {//实例不可用

        }
    }


    /**
     * 打开聊天面板
     */
    function open_chat_panel() {
        invitation_time_out();
        // 显示客服窗口
        get("njim_window_box").style.display = "block";
        // 隐藏客服图标
        if (icon) {
            icon.style.display = "none";
        }
    }

    /**
     * 最小化聊天面板
     */
    function minimize() {
        // 显示客服图标
        if (icon) {
            icon.style.display = "block";
        }

        // 隐藏客服窗口
        get("njim_window_box").style.display = "none";
    }

    /**
     * 移动聊天面板
     */
    function chat_move() {
        // 隐藏面板
        get("njim_window_iframe").style.display = "none";
        get("njim_window_minimize").style.display = "none";

        // 记录鼠标偏移量
        var e = window.event;
        mouse_offset_x = e.offsetX;
        mouse_offset_y = e.offsetY;
        is_draging = true;
    }


    /**
     * 设置cookie
     * @param c_name
     * @param value
     * @param expiredays
     * @param path
     */
    function set_cookie(c_name, value, expiredays, path) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value)
            + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
            + ((path == null) ? "" : ";path=" + path);
    }

    /**
     * 获取cookie
     * @param c_name
     * @returns {string}
     */
    function get_cookie(c_name) {
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
    function get_client_id() {
        var cookie_name = 'njim_unique_id';
        var cookie_val = get_cookie(cookie_name);
        if (cookie_val == null || cookie_val == '') { // cookie不存在，生成ID
            cookie_val = generate_unique();
            is_new_client = 'y';// 新访客
        }
        // 更新cookie
        set_cookie(cookie_name, cookie_val, 90, '/');
        return cookie_val;
    }

    // 生成随机字符串
    function generate_unique() {
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

    //获取元素
    function get(id) {
        return document.getElementById(id);
    }

    //动态绑定事件
    var interval = setInterval(function () {

        //打开窗口
        var open_click = get('njim_open_click');
        var open_mouseover = get('njim_open_mouseover');
        if (open_click) {//点击打开
            open_click.onclick = open_chat_panel;
            icon = open_click;
        } else if (open_mouseover) {//鼠标移入打开
            open_mouseover.onmouseover = open_chat_panel;
            icon = open_mouseover;
        }

        //邀请打开聊天窗口
        var invitation_open_chat = get('njim_invitation_open_chat');
        if (invitation_open_chat) {
            invitation_open_chat.onclick = function () {
                open_chat_panel();
            }
        }

        //等待一段时间再次邀请
        var invitation_continue = get('njim_invitation_continue');//按钮
        if (invitation_continue) {
            invitation_continue.onclick = invitation_time_out;
        }
        var njim_invitation_icon = get('njim_invitation_icon');//图标
        if (njim_invitation_icon) {
            njim_invitation_icon.onclick = invitation_time_out;
        }

        //不再邀请
        var invitation_close = get('njim_invitation_close');
        if (invitation_close) {
            invitation_close.onclick = function () {
                _switch = false;
                invitation_time_out();
            }
        }

        //窗口移动
        var window_move = get('njim_window_move_layer');
        if (window_move) {
            window_move.onmousedown = chat_move;
        }

        //窗口最小化
        var window_minimize = get('njim_window_minimize');
        if (window_minimize) {
            window_minimize.onclick = minimize;
        }
        //窗口最小化(移动端顶部)
        var window_top_close = get('njim_window_top_close');
        if (window_top_close) {
            window_top_close.onclick = minimize;
        }

        bind_count++;
        if (bind_count > 20) {
            clearInterval(interval);
        }
    }, 1000);

    /**
     * 开始引导
     */
    (function () {

        //创建容器
        var container = document.createElement('div');
        container.id = container_id;
        document.getElementsByTagName('body')[0].appendChild(container);

        //读取access
        var access = false;
        var script = document.getElementsByTagName('script');
        for (var i = 0; i < script.length; i++) {
            //读取access
            var index = script[i].src.search(/\?njim[0-9a-fA-F]{13}bd8a053f0821cb2132ed614a3d4234d$/);
            if (index != -1) {//解决冲突，以最后匹配值为准
                access = script[i].src.substr(index + 5, 13);
            }
        }
        if (!access) {
            return;
        }

        client_id = get_client_id();
        container = get(container_id);
        container.style.zIndex = 2147483647;
        container.style.position = 'fixed';
        is_phone = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);//是否为移动设备

        //插入元素
        if (is_phone) {//移动端
            set_viewport(2);//初始化视口
            container.innerHTML = '<div id="njim_icon_box"></div><div id="njim_window_box" ' +
                'style="width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; position: fixed; ' +
                'top:0; left:0; display: none;"><div id="njim_window_top_close" style="width: 100%; height: 50px; ' +
                'background: rgba(0,0,0,0.3);"></div><div style="border: none; margin: 0; padding: 0; ' +
                'position: absolute; top:50px; right:0; bottom:0; left: 0; background: #ccc;"><iframe ' +
                'id="njim_window_iframe" style="width: 100%; height: 100%; border: none; margin: 0; ' +
                'padding: 0; overflow: hidden; position: absolute; top:0; left: 0;" src="' +
                domain + 'index.php/client/index/index/device/phone_1/access/' +
                access + '/client_id/' + client_id + '/is_new/' + is_new_client + '"></iframe>' +
                '<div id="njim_window_minimize" style="position: absolute; top: 11px; left: 15px; ' +
                'width: 25px;height: 20px; background: url(/static/images/icon-desktop.png) ' +
                'no-repeat -20px -66px;"></div><a id="njim_top_phone" href="javascript:;" style="position: absolute; ' +
                'top: 11px; right: 15px; width: 22px;height: 20px; background: ' +
                'url(/static/images/icon-desktop.png) no-repeat -21px -572px;">' +
                '</a></div></div><div id="njim_invitation_box" style="display: none;"></div>';

        } else {//PC端
            container.innerHTML = '<div id="njim_icon_box"></div>' +
                '<div id="njim_window_box" style=" width: 370px; height: 510px;  margin: 0; ' +
                'padding: 0; overflow: hidden;  position: fixed; bottom: -10px; right: -10px; display: none;">' +
                '<div style="width: 370px; height: 510px; background: url(' +
                domain + 'static/images/move.png) no-repeat;"></div>' +
                '<iframe id="njim_window_iframe" style="width: 350px; height: 500px; border: none; ' +
                'margin: 0; padding: 0; overflow: hidden; position: absolute; top:0; left: 10px; " src="' +
                domain + 'index.php/client/index/index/device/pc_1/access/' + access +
                '/client_id/' + client_id + '/is_new/' + is_new_client + '"></iframe><div id="njim_window_move_layer" ' +
                'style=" width: 310px; height: 40px; position: absolute; top:0; left: 10px; cursor: move;"></div>' +
                '<div id="njim_window_minimize" style="position: absolute; ' +
                'top: 11px; right: 20px; width: 25px; height: 20px; background: url(' + domain +
                'static/images/icon-desktop.png) no-repeat -20px -131px; cursor: pointer;"></div></div>' +
                '<div id="njim_invitation_box" style="display: none;"></div>';
        }

        // 创建jsonp
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.charset = "utf-8";
        script.src = domain + "index.php/client/jsonp/getSettings/is_phone/" + (is_phone ? 'y' : 'n') + "/access/" + access;
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(script, s);//插入节点
        s.parentNode.removeChild(script);//删除节点
    }());


    document.onmousemove = function (e) {
        if (is_draging) {
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
            var x = _w - moveX - dW + mouse_offset_x + 10;
            var y = _h - moveY - dH + mouse_offset_y;
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
            var moveBg = get("njim_window_box");
            moveBg.style.right = x + "px";
            moveBg.style.bottom = y + "px";
        }
    }

    document.onmouseup = function () {
        is_draging = false;
        // 显示
        get("njim_window_iframe").style.display = "block";
        get("njim_window_minimize").style.display = "block";
    }

    window.njim_application_settings = load_settings;

}());
