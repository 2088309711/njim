$(function () {
    load_cookie('num');
    load_cookie('add');
    load_cookie('max');
    load_cookie('type');
    load_cookie('method');

    $('#num').blur(function () {
        ckNum('num');
    });

    $('#add').blur(function () {
        ckNum('add');
    });

    $('#max').blur(function () {
        ckNum('max');
    });

    $(":radio").click(function () {
        set_cookie($(this).attr('name'), $(this).val());
    });

    $('#count').click(function () {
        var value = $('#result').val();


        var strArr = value.split(/[\n]/);

        if (strArr.length < 3) {
            log('结果必须输入3次');
            return;
        }

        var resultArr = [];

        for (var i = 0; i < strArr.length; i++) {
            var temp = strArr[i].split(/[ ]+/);
            var str = temp.join('-');
            if (temp.length > 1) {
                str = str.substr(1, str.length)
            }
            resultArr.push(str);
        }

        if (resultArr[0] === resultArr[1] && resultArr[0] === resultArr[2]) {
            show_result(resultArr[0]);
        } else {
            log('3次结果不一致');
        }
    });


});


function ckNum(name) {
    var obj = $('#' + name);
    var value = trim(obj.val());
    if (/^[0-9]+$/.test(value)) {
        obj.val(value);
        set_cookie(name, value);
    } else {
        var cValue = get_cookie(name);
        obj.val(cValue);
    }
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

var vueObj = new Vue({
    el: '#vue-node',
    data: {
        trs: [
            [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10'
            ]
        ]
    }
});


function show_result(result) {
    log(result);
    // var start_num = $('#start-num').val();//开局
    // var profit_num = $('#profit-num').val();//收益
    // var now_balance = $('#now-balance').val();//余额
    // var result = count(parseInt(start_num), parseInt(profit_num), parseInt(now_balance), 1);
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

function load_cookie(name) {

    switch (name) {
        case 'type':
        case 'method':
            var value = get_cookie(name);
            $("input[name='" + name + "'][value='" + value + "']").attr('checked', true);
            break;

        default:
            var value = get_cookie(name);
            if (value != '') {
                $('#' + name).val(value);
            }
            break;
    }
}

function set_cookie(name, value) {
    var d = new Date();
    d.setDate(d.getDate() + 90);
    document.cookie = name + "=" + escape(value) + ";expires=" + d.toGMTString() + ";path=/";
}

function get_cookie(name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(name + "=");
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return ""
}

function log(o) {
    console.log(o)
}