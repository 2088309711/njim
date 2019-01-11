var cookie_prefix = 'count_2_';
var stopStr = '--';

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
        if (!confirm('确定计算结果？')) {
            return;
        }

        var num = parseInt($('#num').val());
        var max = parseInt($('#max').val());

        if (num >= max) {
            alert('基础大小不能大于等于封顶数额');
        }

        var value = $('#result').val();

        var strArr = value.split(/[\n]/);

        if (strArr.length < 2) {
            alert('结果必须输入2次');
            return;
        }

        var resultArr = [];

        for (var i = 0; i < strArr.length; i++) {
            var temp = strArr[i].split(/[ ]+/);

            var str = '';
            for (var j = 0; j < temp.length; j++) {
                if (temp[j].length > 0) {
                    str += temp[j] + '-';
                }
            }

            str = str.substr(0, str.length - 1);

            resultArr.push(str);
        }

        if (resultArr[0] === resultArr[1]) {
            show_result(resultArr[0]);
        } else {
            alert('2次结果不一致');
        }
    });

    $('#clear').click(function () {
        if (!confirm('确定清空输入内容？')) {
            return;
        }
        $('#result').val('');
    });

    $('#start').click(function () {//新开局
        if (!confirm('确定重新开局？')) {
            return;
        }
        var num = parseInt($('#num').val());
        vueObj.trs = [[num, num, num, num, num, num, num, num, num, num]];
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
        trs: []
    },
    methods: {
        trClass: function (index) {
            if (index === 0) {
                return {
                    'cur': true
                }
            }
        },
        tdClass: function (index) {
            if (index % 2 !== 0) {
                return {
                    'bg': true
                }
            }
        }
    }
});

function show_result(data) {

    var numArr = data.split('-');

    var type = $("input[name='type']:checked").val();//玩法
    var method = $("input[name='method']:checked").val();//方法

    var preArr = vueObj.trs[0];//上次的投注数据

    if (preArr == null || preArr.length < numArr.length) {//没有参考数据
        return;
    }

    var num = parseInt($('#num').val());//基础大小
    var add = parseInt($('#add').val());//翻倍增加
    var max = parseInt($('#max').val());//封顶

    var resultArr = [stopStr, stopStr, stopStr, stopStr, stopStr, stopStr, stopStr, stopStr, stopStr, stopStr];

    for (var i = 0; i < numArr.length; i++) {//i 是名次（冠军，亚军...）

        var flag;

        switch (type) {
            case '1'://大
                flag = parseInt(numArr[i]) > 5;
                break;

            case '2'://小
                flag = parseInt(numArr[i]) < 6;
                break;

            case '3'://单
                flag = parseInt(numArr[i]) % 2 != 0;
                break;

            case '4'://双
                flag = parseInt(numArr[i]) % 2 == 0;
                break;
        }

        if (flag) {
            if (method == '1') {//正常
                resultArr[i] = num;
            }
        } else {
            var temp;
            if (preArr[i] == stopStr) {
                temp = stopStr;
            } else {
                if (preArr[i] * 2 + add > max) {//封顶
                    temp = num;
                } else {
                    temp = preArr[i] * 2 + add;
                }
            }
            resultArr[i] = temp;
        }
    }

    vueObj.trs.unshift(resultArr);
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
    document.cookie = cookie_prefix + name + "=" + escape(value) + ";expires=" + d.toGMTString() + ";path=/";
}

function get_cookie(name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookie_prefix + name + "=");//cookie所在位置
        if (c_start != -1) {
            c_start = c_start + (cookie_prefix + name).length + 1;
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