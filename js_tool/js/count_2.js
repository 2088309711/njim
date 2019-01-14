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
    var num = parseInt($('#num').val());
    var add = parseInt($('#add').val());
    var max = parseInt($('#max').val());
    var miss = parseInt($('#miss').val());

    if (num == '' || add == '' || max == '' || miss == '') {
        alert('参数不全');
        return;
    }

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

    var resultArr = [];

    var nameArr = ['冠军', '亚军', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'];

    //以最新的数据遍历车道，从冠军到第十名
    for (var i = 0; i < vueData.trs[0].nums.length; i++) {
        // log(vueData.trs[0].nums[i]);

        var temp = {
            name: nameArr[i],
            big: true,
            small: true,
            single: true,
            double: true,

            _big: 0,
            _small: 0,
            _single: 0,
            _double: 0
        };

        //前5个对象有龙虎
        if (i < 5) {
            temp.loong = true;
            temp.tiger = true;
            temp._Loong = 0;
            temp._tiger = 0;
        }

        //和前几期的数据比较
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
            if (i < 5) {
                //计算龙
                if (is_loong(vueData.trs[j].nums, index)) {
                    temp.loong = false;
                }
                //计算虎
                if (is_tiger(vueData.trs[j].nums, index)) {
                    temp.tiger = false;
                }
            }
        }

        //所有项目遗漏数据计算完成 temp
        // 开始计算金额，和上次投注额比较 vueResult.result[0].betting[i]
        // i 索引是名次
        if (vueResult.result[0].betting[i] !== null && vueResult.result[0].betting[i].name === temp.name) {//确保选择的对象是正确的
            if (temp.big) {
                temp._big = getNum(vueResult.result[0].betting[i]._big, num, add, max);
            }
            if (temp.small) {
                temp._small = getNum(vueResult.result[0].betting[i]._small, num, add, max);
            }
            if (temp.single) {
                temp._single = getNum(vueResult.result[0].betting[i]._single, num, add, max);
            }
            if (temp.double) {
                temp._double = getNum(vueResult.result[0].betting[i]._double, num, add, max);
            }
            if (i < 5) {
                if (temp.loong) {
                    temp._loong = getNum(vueResult.result[0].betting[i]._loong, num, add, max);
                }
                if (temp.tiger) {
                    temp._tiger = getNum(vueResult.result[0].betting[i]._tiger, num, add, max);
                }
            }
        } else {//没有上次的投注信息
            if (temp.big) {
                temp._big = num;
            }
            if (temp.small) {
                temp._small = num;
            }
            if (temp.single) {
                temp._single = num;
            }
            if (temp.double) {
                temp._double = num;
            }
            if (i < 5) {
                if (temp.loong) {
                    temp._loong = num;
                }
                if (temp.tiger) {
                    temp._tiger = num;
                }
            }
        }

        //投注额计算完成

        resultArr.push(temp);

    }

    // resultArr 投注结果和遗漏数据都计算完成

    //组织结果对象
    var resultObj = {
        issue: vueData.trs[0].issue + 1,//最新期号 + 1
        betting: resultArr
    }

    vueResult.result.unshift(resultObj);
}

/**
 *
 * @param preNum 上次的数量
 * @param num 最低
 * @param add 增加
 * @param max 封顶
 * @returns int
 */
function getNum(preNum, num, add, max) {
    if (preNum === 0) {//上次没有投注这个项目
        return num;
    } else {
        var temp = preNum * 2 + add;
        if (temp > max) {//封顶
            temp = num;
        }
        return temp;
    }
}

var vueResult = new Vue({
    el: '#vue-result',
    data: {
        result: [
            {
                issue: 190113767,
                betting: []
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

function is_loong(arr, index) {
    return arr[index] > arr[9 - index];
}

function is_tiger(arr, index) {
    return arr[index] < arr[9 - index];
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