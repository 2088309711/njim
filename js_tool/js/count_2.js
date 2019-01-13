var cookie_prefix = 'count_2_';

$(function () {

    load_cookie('num');
    load_cookie('add');
    load_cookie('max');
    load_cookie('miss');
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


    $('#miss').blur(function () {
        ckNum('miss');
    });

    $(":radio").click(function () {
        set_cookie($(this).attr('name'), $(this).val());
    });

    $('#result').blur(function () {
        updateResultVal();
        compute();
    });


});


function updateResultVal() {
    var value = $('#result').val();

    var nums = value.match(/([01][0-9],){9}[01][0-9]/);
    var issue = value.match(/\d{9}/);

    if (nums == null || issue == null) {
        $('#result').val('数据不完整');
        return;
    }

    nums = nums[0].split(',');
    issue = parseInt(issue[0]);


    for (var i = 0; i < nums.length; i++) {
        nums[i] = parseInt(nums[i]);

    }

    var flag = true;
    for (var i = 0; i < vueData.trs.length; i++) {
        if (vueData.trs[i].issue == issue) {
            flag = false;
            break;
        }
    }

    if (flag) {
        vueData.trs.unshift({issue: issue, nums: nums});
        $('#result').val('数据录入成功');
    } else {
        $('#result').val('数据已存在');
    }


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
    $('#data').children('iframe').each(function () {
        var url = this.src.split('?');
        // this.src = url[0] + '?_t=' + new Date().getTime();
    });
}, 5000);

function compute() {
    var miss = parseInt($('#miss').val());

    //检查数据量是否足够
    if (vueData.trs.length < miss) {
        return;
    }

    //检查数据是否断层
    for (var i = 0; i < miss - 1; i++) {
        if (vueData.trs[i].issue !== vueData.trs[i + 1].issue + 1) {
            return;
        }
    }

    var missResult = [];

    //以最新的数据遍历车道，从冠军到第十名
    for (var i = 0; i < vueData.trs[0].nums.length; i++) {
        // log(vueData.trs[0].nums[i]);

        // ranking 名次
        var temp = {ranking: i + 1, big: true, small: true, single: true, double: true};

        for (var j = 0; j < miss; j++) {
            //计算大
            if (is_big(vueData.trs[j].nums[i])) {
                temp.big = false;
            }
            //计算小
            if (is_small(vueData.trs[j].nums[i])) {
                temp.small = false;
            }
            //计算单
            if (is_single(vueData.trs[j].nums[i])) {
                temp.single = false;
            }
            //计算双
            if (is_double(vueData.trs[j].nums[i])) {
                temp.double = false;
            }
        }

        missResult.push(temp);

    }

    // missResult 计算完成的遗漏结果

    log(missResult)

    //计算投注金额

}

var vueResult = new Vue({
    el: '#vue-result',
    data: {
        result: [
            {
                issue: 190113767,
                betting: [
                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },


                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },


                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },


                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },


                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },


                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },


                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },


                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },

                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },


                    {
                        ranking: '冠军',
                        big: true,
                        small: false,
                        single: false,
                        double: false,
                        loong: true,
                        tiger: true,
                        _Loong: 10,
                        _tiger: 10,
                        _big: 10,
                        _small: 10,
                        _single: 10,
                        _double: 10,
                    },
                ]
            }
        ]
    },
    methods: {
        activeClass: function (o) {
            if (o) {
                return 'active'
            } else {
                return ''
            }
        },
        showLH: function (index) {
            if (index < 5) {
                return true;
            }
            return false;
        }
    }
});


function is_big(num) {
    return num > 5;
}


function is_small(num) {
    return num < 6;
}

function is_single(num) {
    return num % 2 != 0;
}

function is_double(num) {
    return num % 2 == 0;
}

var vueData = new Vue({
    el: '#vue-data',
    data: {
        trs: [
            {issue: 190113709, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
            {issue: 190113708, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
            {issue: 190113707, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
            {issue: 190113706, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
            {issue: 190113705, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
            {issue: 190113704, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
            {issue: 190113703, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
            {issue: 190113702, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
            {issue: 190113701, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
            {issue: 190113700, nums: [3, 5, 1, 8, 6, 2, 9, 10, 4, 7]},
        ]
    },
    methods: {
        trClass: function (index) {
            if (index === 0) {
                return {
                    'cur': true
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