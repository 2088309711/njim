var cookie_prefix = 'count_2_';
var stopStr = '--';
var colNum = 10;
$(function () {

    load_cookie('num');
    load_cookie('add');
    load_cookie('max');
    load_cookie('col');
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

    $('#col').blur(function () {
        ckNum('col');
        colNum = parseInt($(this).val());
    });

    $(":radio").click(function () {
        set_cookie($(this).attr('name'), $(this).val());
    });

    $('#result').blur(function () {
        updateResultVal();
    });

    $('#count').click(function () {

        colNum = parseInt($('#col').val());
        updateResultVal()

        if (!confirm('确定计算结果？')) {
            return;
        }

        var num = parseInt($('#num').val());
        var max = parseInt($('#max').val());

        if (num >= max) {
            alert('基础大小不能大于等于封顶数额');
        }

        var value = $('#result').val();

        if (value.length === 20) {
            show_result(value);
        }

    });


    $('#start').click(function () {//新开局
        if (!confirm('确定重新开局？')) {
            return;
        }
        startNew();
    });

    startNew();
});


function startNew() {
    var num = parseInt($('#num').val());
    vueObj.trs = [[num, num, num, num, num, num, num, num, num, num]];
}


function updateResultVal() {
    var value = $('#result').val();
    value = value.match(/([01][0-9],){9}[01][0-9]/);

    if (value == null) {
        return;
    }

    value = value[0].split(',');
    var _v = '';
    for (var i = 0; i < value.length; i++) {
        _v += parseInt(value[i]) + '-';
    }
    _v = _v.substr(0, _v.length - 1);
    $('#result').val(_v);
}

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

setInterval(function () {
    $('#data').children('iframe').each(function (index, el) {
        var url = this.src.split('?');
        this.src = url[0] + '?_t=' + new Date().getTime();
    });
}, 5000);

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

            var no_show = false;
            if (index >= colNum) {
                no_show = true;
            }
            var bg = false;
            if (index % 2 !== 0) {
                bg = true;
            }
            return {'bg': bg, 'no-show': no_show};
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