$(function () {
    load_cookie();

    $('#start-num').blur(function () {
        set_num('start-num', 'start_num', '');
    });

    $('#start-num-red').click(function () {
        set_num('start-num', 'start_num', 'red');
    });

    $('#start-num-add').click(function () {
        set_num('start-num', 'start_num', 'add');
    });

    $('#profit-num').blur(function () {
        set_num('profit-num', 'profit_num', '');
    });

    $('#profit-num-red').click(function () {
        set_num('profit-num', 'profit_num', 'red');
    });


    $('#profit-num-add').click(function () {
        set_num('profit-num', 'profit_num', 'add');
    });

    $('#now-balance').blur(function () {
        set_num('now-balance', 'now_balance', '');
    });

    $('#now-balance-red').click(function () {
        set_num('now-balance', 'now_balance', 'red');
    });

    $('#now-balance-add').click(function () {
        set_num('now-balance', 'now_balance', 'add');
    });

    $('#submit').click(function () {
        show_result();
    });

    $('#result-4').click(function () {
        $('#now-balance').val($(this).text());
    });

});

function show_result() {
    var start_num = $('#start-num').val();//开局
    var profit_num = $('#profit-num').val();//收益
    var now_balance = $('#now-balance').val();//余额
    var result = count(parseInt(start_num), parseInt(profit_num), parseInt(now_balance), 1);
}

function count(start_num, profit_num, now_balance, input) {

    //本次投入之后的余额 = 当前余额 - 投注金额
    var balance = now_balance - input;

    //结算之后的余额
    var _balance = balance + input * 2 * 2;

    if ((_balance - profit_num) >= start_num) {//输出结果
        $('#result-1').text(input);//本局应该投注金额
        $('#result-2').text(input * 2);//如果本局胜利，下局应该投注金额
        $('#result-3').text(_balance - start_num);//两连胜收入
        $('#result-4').text(balance);//本局投注后的余额
    } else {
        count(start_num, profit_num, now_balance, ++input);
    }
}

function set_num(id, name, action) {
    var value = $('#' + id).val();
    if (action == 'add') {
        value++;
    } else if (action == 'red') {
        value--;
    }
    $('#' + id).val(value);
    set_cookie(name, value, 90, '/');
}

function load_cookie() {
    var start_num = get_cookie('start_num');
    if (start_num != '') {
        $('#start-num').val(start_num);
    }

    var profit_num = get_cookie('profit_num');
    if (profit_num != '') {
        $('#profit-num').val(profit_num);
    }

    var now_balance = get_cookie('now_balance');
    if (now_balance != '') {
        $('#now-balance').val(now_balance);
    }
}

function set_cookie(c_name, value, expiredays, path) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value)
        + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
        + ((path == null) ? "" : ";path=" + path);
}

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