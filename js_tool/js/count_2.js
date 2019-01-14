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


/*
1. e":"190114236","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
2. e":"190114237","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
3. e":"190114238","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
 */

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
        // var url = this.src.split('?');
        // this.src = url[0] + '?_t=' + new Date().getTime();
    });
}, 5000);


/*
1. e":"190114236","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
2. e":"190114237","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
3. e":"190114238","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
 */

function compute() {
    var num = parseInt($('#num').val());
    var add = parseInt($('#add').val());
    var max = parseInt($('#max').val());
    var miss = parseInt($('#miss').val());
    var method = $("input[name='method']:checked").val();//方法

    if (isNaN(num) || isNaN(add) || isNaN(max) || isNaN(miss)) {
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


        /*
1. e":"190114236","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
2. e":"190114237","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
3. e":"190114238","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
 */


        var temp = {
            name: nameArr[i],
            big: true,
            small: true,
            single: true,
            _double: true,

            _big: 0,
            _small: 0,
            _single: 0,
            __double: 0
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
                temp._double = false;
            }
            if (i < 5) {
                //计算龙
                if (is_loong(vueData.trs[j].nums, i)) {
                    temp.loong = false;
                }
                //计算虎
                if (is_tiger(vueData.trs[j].nums, i)) {
                    temp.tiger = false;
                }
            }
        }

        //所有项目遗漏数据计算完成 temp
        // 开始计算金额，和上次投注额比较 vueResult.result[0].betting[i]
        // i 索引是名次


        /*
1. e":"190114236","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
2. e":"190114237","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
3. e":"190114238","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
 */

        //没有之前的投注数据，或者上次投注的期号和最新开奖的期号不一致
        if (vueResult.result.length == 0 || vueResult.result[0].issue !== vueData.trs.issue) {
            if (temp.big) {
                temp._big = num;
            }
            if (temp.small) {
                temp._small = num;
            }
            if (temp.single) {
                temp._single = num;
            }
            if (temp._double) {
                temp.__double = num;
            }
            if (i < 5) {
                if (temp.loong) {
                    temp._loong = num;
                }
                if (temp.tiger) {
                    temp._tiger = num;
                }
            }
        } else {//之前有投注数据

            if (temp.big) {
                temp._big = getNum(vueResult.result[0].betting[i]._big, num, add, max);
            }
            if (temp.small) {
                temp._small = getNum(vueResult.result[0].betting[i]._small, num, add, max);
            }
            if (temp.single) {
                temp._single = getNum(vueResult.result[0].betting[i]._single, num, add, max);
            }
            if (temp._double) {
                temp.__double = getNum(vueResult.result[0].betting[i].__double, num, add, max);
            }
            if (i < 5) {
                if (temp.loong) {
                    temp._loong = getNum(vueResult.result[0].betting[i]._loong, num, add, max);
                }
                if (temp.tiger) {
                    temp._tiger = getNum(vueResult.result[0].betting[i]._tiger, num, add, max);
                }
            }
        }

        //投注额计算完成


        //如果方法是收尾，则取消新的投注项目
        if (method == '2') {
            if (temp._big == num) {
                temp._big = 0;
                temp.big = false;
            }
            if (temp._small == num) {
                temp._small = 0;
                temp.small = false;
            }
            if (temp._single == num) {
                temp._single = 0;
                temp.single = false;
            }
            if (temp.__double == num) {
                temp.__double = 0;
                temp._double = false;
            }
            if (i < 5) {
                if (temp._loong == num) {
                    temp._loong = 0;
                    temp.loong = false;
                }
                if (temp._tiger == num) {
                    temp._tiger = 0;
                    temp.tiger = false;
                }
            }
        }

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
        result: []
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
        },
        isShow: function () {
            return this.result.length > 0
        },
        selectText: function (e) {
            var el = $(e.currentTarget);
            el.select();

            el.zclip({
                path: '/static/zclip/ZeroClipboard.swf',
                copy: function () { //复制内容
                    return el.val();
                },
                afterCopy: function () {
                    layer.msg('复制成功', {
                        icon: 1,
                        time: 800 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
            });
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

/*
1. e":"190114236","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
2. e":"190114237","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
3. e":"190114238","opentime":"2019-01-14 12:23:45","nums":"09,04,02,10,08,01,06,07,03,05","n12":
 */

var vueData = new Vue({
    el: '#vue-data',
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
        }
    }
});


function load_cookie(name) {
    switch (name) {
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