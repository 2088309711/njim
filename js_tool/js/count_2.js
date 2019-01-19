var cookie_prefix = 'count_2_';

$(function () {

    load_cookie('num');
    load_cookie('add');
    load_cookie('max');
    load_cookie('miss');
    load_cookie('num_1_10');
    load_cookie('min_1_10');
    load_cookie('max_miss_1_10');
    load_cookie('miss_1_10');
    load_cookie('method');

    $('#num').blur(function () {
        ckNum('num');
        compute();
    });

    $('#add').blur(function () {
        ckNum('add');
        compute();
    });

    $('#max').blur(function () {
        ckNum('max');
        compute();
    });

    $('#miss').blur(function () {
        ckNum('miss');
        compute();
    });

    $('#num_1_10').blur(function () {
        ckNum('num_1_10');
        compute();
    });

    $('#min_1_10').blur(function () {
        ckNum('min_1_10');
        compute();
    });

    $('#max_miss_1_10').blur(function () {
        ckNum('max_miss_1_10');
        compute();
    });

    $('#miss_1_10').blur(function () {
        ckNum('miss_1_10');
        compute();
    });

    $(":radio").click(function () {
        set_cookie($(this).attr('name'), $(this).val());
        compute();
    });


    $(":checkbox").click(function () {

        vueResult.panel.two_sides = false;
        vueResult.panel.one_to_ten = false;

        $('input[name="show_panel"]:checked').each(function () {

            var value = $(this).val();

            if (value == '1') {
                vueResult.panel.two_sides = true;
            } else if (value == '2') {
                vueResult.panel.one_to_ten = true;
            }

        });

    });

    $('#result').focus(function () {
        $(this).val('');
    });

    $('#result').blur(function () {
        parseData();
        compute();
    });

    $('.open-window').click(function () {

        var d = new Date();

        var month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = d.getDate();
        day = day < 10 ? '0' + day : day;

        var dateStr = '' + d.getFullYear() + month + day;

        var domain = [
            'https://www.sh1333.com',
            'https://www.yyc91.com',
            'https://www.rd2255.com',
            'http://www.9h991.com'
        ];

        var url = domain[$(this).attr('index')] + '/static//data/' + dateStr + '80HistoryLottery.json?_=' + d.getTime();

        window.open(url, "all_data", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400");
    });


    //统计遗漏次数
    $('#two-sides-miss').click(function () {
        countTwoSidesMiss();
    });


    $('#one-to-ten-miss').click(function () {
        countOneToTenMiss();
    });

});


function parseData() {
    var value = $('#result').val();
    $('#result').val('正在解析数据');

    var issue = value.match(/\d{9}/);
    var nums = value.match(/([01][0-9],){9}[01][0-9]/);
    var allData = value.match(/\[\{"id":\d+,"betEndTime":"\d{4}(-\d{2}){2} (\d{2}:){2}\d{2}","turnNum":"\d+","openNum":"(\d{2},){9}\d{2}"/);

    if (allData != null) {//完整数据

        var data = $.parseJSON(value);

        // 时间 data[0].openTime  2019-01-16 06:30:00

        //核对日期
        var date1 = data[0].openTime.split(' ')[0];

        var d = new Date();

        var month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = d.getDate();
        day = day < 10 ? '0' + day : day;

        var date2 = d.getFullYear() + '-' + month + '-' + day;

        if (date1 !== date2) {
            if (!confirm('检测到不是今天的数据，是否继续？')) {
                return;
            }
        }

        //添加数据
        for (var i = 0; i < data.length; i++) {
            if (vueData.add(parseInt(data[i].turnNum), splitNumsToInt(data[i].openNum))) {
                $('#result').val('数据录入成功');
            } else {
                $('#result').val('数据已存在');
            }
        }

        //排序
        vueData.sort();
        vueData.check();

        data = null;


    } else if (allData == null && nums != null && issue != null) {//当期数据

        //转整
        issue = parseInt(issue[0]);
        nums = splitNumsToInt(nums[0]);

        if (vueData.add(issue, nums)) {
            $('#result').val('数据录入成功');
        } else {
            $('#result').val('数据已存在');
        }

        //排序
        vueData.sort();
        vueData.check();

    } else {
        $('#result').val('无法识别的数据');
    }

}


//计算两面遗漏
function countTwoSidesMiss() {

    //存储遗漏值 [10,60,5,56,2,0,1,56,45,65]
    var result = [//记录次数
        [],//大
        [],//小
        [],//单
        [],//双
        [],//龙
        []//虎
    ];

    var count = [//记录遗漏值
        0,//大
        0,//小
        0,//单
        0,//双
        0,//龙
        0//虎
    ];

    //遍历 1~10 名，从冠军开始，作为号码数组取值的索引
    for (var i = 0; i < 10; i++) {

        //遍历所有数据
        for (var k = 0; k < vueData.trs.length; k++) {

            //大
            if (is_big(vueData.trs[k].nums[i])) {
                //如果等于，将统计保存到结果数组并置零统计
                result[0].push(count[0]);
                count[0] = 0;
            } else {
                //如果不等于，统计+1
                count[0]++;
            }


            //小
            if (is_small(vueData.trs[k].nums[i])) {
                //如果等于，将统计保存到结果数组并置零统计
                result[1].push(count[1]);
                count[1] = 0;
            } else {
                //如果不等于，统计+1
                count[1]++;
            }


            //单
            if (is_single(vueData.trs[k].nums[i])) {
                //如果等于，将统计保存到结果数组并置零统计
                result[2].push(count[2]);
                count[2] = 0;
            } else {
                //如果不等于，统计+1
                count[2]++;
            }


            //双
            if (is_double(vueData.trs[k].nums[i])) {
                //如果等于，将统计保存到结果数组并置零统计
                result[3].push(count[3]);
                count[3] = 0;
            } else {
                //如果不等于，统计+1
                count[3]++;
            }

            if (i < 5) {
                //龙
                if (is_loong(vueData.trs[k].nums, i)) {
                    //如果等于，将统计保存到结果数组并置零统计
                    result[4].push(count[4]);
                    count[4] = 0;
                } else {
                    //如果不等于，统计+1
                    count[4]++;
                }


                //虎
                if (is_tiger(vueData.trs[k].nums, i)) {
                    //如果等于，将统计保存到结果数组并置零统计
                    result[5].push(count[5]);
                    count[5] = 0;
                } else {
                    //如果不等于，统计+1
                    count[5]++;
                }
            }
        }
    }

    //排序
    for (var i = 0; i < result.length; i++) {
        result[i].sort(function sortNumber(a, b) {
            return a - b;
        });
    }


    // *****

    //计算相同元素的数量
    var miss = [
        {name: '大', miss: []},
        {name: '小', miss: []},
        {name: '单', miss: []},
        {name: '双', miss: []},
        {name: '龙', miss: []},
        {name: '虎', miss: []}
    ];

    for (var i = 0; i < result.length; i++) {

// ***
        for (var j = 0; j < result[i].length;) {
            count = 0;
            for (var k = j; k < result[i].length; k++) {
                if (result[i][j] === result[i][k]) {
                    count++;
                }
            }
            miss[i].miss.push({
                num: result[i][j],
                count: count
            });
            j += count;
        }

// ***

    }

    // *****
    outObj(miss)

}


//计算1~10名遗漏
function countOneToTenMiss() {

    //存储遗漏值 [10,60,5,56,2,0,1,56,45,65]
    var result = [];

    var count = 0;//记录遗漏值

    //遍历 1~10 名，从冠军开始，作为号码数组取值的索引
    for (var i = 0; i < 10; i++) {
        //遍历 1~10 个号码
        for (var j = 1; j <= 10; j++) {
            //遍历所有数据
            for (var k = 0; k < vueData.trs.length; k++) {
                //nums[] 使用名次索引 i
                // j = 范围1~10，要比较的号码
                if (vueData.trs[k].nums[i] === j) {
                    //如果等于，将统计保存到结果数组并置零统计
                    result.push(count);
                    count = 0;
                } else {
                    //如果不等于，统计+1
                    count++;
                }
            }
        }
    }


    //排序
    result.sort(function sortNumber(a, b) {
        return a - b;
    });


    // *****

    //计算相同元素的数量
    var miss = [];

    for (var i = 0; i < result.length;) {
        count = 0;
        for (var j = i; j < result.length; j++) {
            if (result[i] === result[j]) {
                count++;
            }
        }
        miss.push({
            num: result[i],
            count: count
        })
        i += count;
    }


    // *****
    outObj(miss)

}


//二叉树算法
function BinaryTree() {
    //构造节点
    var Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }

    //根节点
    var root = null;

    //插入节点（父节点，新节点）
    var insertNode = function (node, newNode) {
        if (newNode.key.issue > node.key.issue) {
            //新节点值大于父节点向左传递
            if (node.left === null) {
                //如果左节点为空则插入到左边
                node.left = newNode;
            } else {
                //否则向左下递归
                insertNode(node.left, newNode);
            }
        } else {
            //新节点值小于等于父节点向右传递
            if (node.right === null) {
                //如果右节点为空则插入到右边
                node.right = newNode;
            } else {
                //否则向右下递归
                insertNode(node.right, newNode);
            }
        }
    }

    //插入值
    this.insert = function (key) {
        //构造一个新节点
        var newNode = new Node(key);
        if (root === null) {
            //如果没有根节点，赋值到根
            root = newNode;
        } else {
            //向根节点下面添加子节点
            insertNode(root, newNode);
        }
    };

    //中序遍历节点（节点， 回调函数）
    var inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);//左下递归
            callback(node.key);//将节点的值传入回调函数
            inOrderTraverseNode(node.right, callback);//右下递归
        }
    };

    //中序遍历
    this.inOrderTraverse = function (callback) {
        //从根节点开始，并传入回调函数
        inOrderTraverseNode(root, callback);
    }
}

/**
 * 拆分号码字符串并转整型
 * @param str
 * @returns {*|string[]}
 */
function splitNumsToInt(str) {
    str = str.split(',');
    for (var i = 0; i < str.length; i++) {
        str[i] = parseInt(str[i]);
    }
    return str;
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
        this.src = url[0] + '?_t=' + new Date().getTime();
    });
}, 5000);


function compute() {

    //两面参数
    var num = parseInt($('#num').val());
    var add = parseInt($('#add').val());
    var max = parseInt($('#max').val());
    var miss = parseInt($('#miss').val());

    //1~10名参数
    var num_1_10 = parseInt($('#num_1_10').val());//初始投注额
    var min_1_10 = parseInt($('#min_1_10').val());//最低收益
    var max_miss_1_10 = parseInt($('#max_miss_1_10').val());//最大遗漏
    var miss_1_10 = parseInt($('#miss_1_10').val());//最小遗漏


    var method = $("input[name='method']:checked").val();//方法

    if (isNaN(num) || isNaN(add) || isNaN(max) || isNaN(miss) || isNaN(num_1_10) || isNaN(min_1_10) || isNaN(max_miss_1_10) || isNaN(miss_1_10)) {
        showMsg('参数不全', 2, 1000);
        return;
    }

    if (vueData.trs.length === 0) {
        showMsg('请录入数据', 2, 1000);
        return;
    }


    if (!vueData.check()) {
        if (!confirm('数据断层是否继续？')) {
            return;
        }
    }


    var twoSidesResultArr = [];
    var oneToTenResultArr = [];

    var nameArr = ['冠军', '亚军', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'];

    //以最新的数据遍历车道，从冠军到第十名
    for (var i = 0; i < vueData.trs[0].nums.length; i++) {

        // 计算两面结果
        twoSidesResultArr.push(computeTwoSides(i, nameArr[i], num, add, max, miss, method));

        // 计算 1-10 结果
        oneToTenResultArr.push(computeOneToTen(i, nameArr[i], num_1_10, min_1_10, max_miss_1_10, miss_1_10, method));
    }

    //组织结果对象
    var resultObj = {
        issue: vueData.trs[0].issue + 1,//最新期号 + 1
        twoSides: twoSidesResultArr,
        oneToTen: oneToTenResultArr,
    };

    vueResult.add(resultObj);
    // outObj(vueResult.result);
}

/**
 *
 * @param index
 * @param name
 * @param num 大小
 * @param min 保底收益
 * @param max 封顶
 * @param miss 遗漏
 * @param method
 * @returns {{name: *, nums: Array}}
 */
function computeOneToTen(index, name, num, min, max_miss, miss, method) {

    var numObj = function (number) {
        return {
            number: number,
            betting: false,
            num: 0,//当期投注金额
            miss: null,//当期遗漏值
            frequency: 0,//当期投注次数
            total_sum: 0//本轮投注总金额
        }
    }

    var countMiss = function (number) {
        for (var i = 0; i < vueData.trs.length; i++) {
            if (vueData.trs[i].nums[index] === number) {
                return i;
            }
        }
        // return null;
    }

    var temp = {
        name: name,
        nums: []
    };

    //创建十个号码对象
    for (var i = 0; i < 10; i++) {
        temp.nums[i] = numObj(i + 1);
    }

    //获取上一期的投注方案
    var preData = vueResult.get(vueData.trs[0].issue);

    //和往期数据对比，计算出 10 个号码的遗漏值
    for (var i = 0; i < temp.nums.length; i++) {
        temp.nums[i].miss = countMiss(temp.nums[i].number);


        //在最小遗漏和最大遗漏之间才能投注
        if (temp.nums[i].miss >= miss && temp.nums[i].miss <= max_miss) {

            temp.nums[i].betting = true;//开启投注

            var start = true;//起始投注

            if (preData != null) { //有上期的投注方案


                //如果遗漏 = 0，说明上期中奖了
                if (temp.nums[i].miss === 0) {
                    preData.oneToTen[index].nums[i].total_sum = 0;//截止到上期投注总额设置为 0
                    preData.oneToTen[index].nums[i].frequency = 0;//截止到上期投注次数设置为 0
                }


                var preNum = preData.oneToTen[index].nums[i].num;//上期投注额
                var total_sum = preData.oneToTen[index].nums[i].total_sum;//截止到上期投注总额
                var preFrequency = preData.oneToTen[index].nums[i].frequency;//上期的投注次数

                if (preNum !== 0) {
                    start = false;//上期投注额不等于0，非起始投注
                    var nowNum = num;//初始投注额
                    var odds = 9.99;//赔率
                    var flag = true;
                    while (flag) {

                        //本次投注额 * 赔率 > 截止上期的投注总额 + 本次投注额 + 最低收益
                        if (nowNum * odds > total_sum + nowNum + min) {
                            flag = false;//已计算出本次投注额
                        } else {
                            nowNum++;//不满足条件，本次投注额 + 1
                        }
                    }


                    //投注
                    temp.nums[i].num = nowNum;
                    temp.nums[i].frequency = preFrequency + 1;
                    temp.nums[i].total_sum = total_sum + nowNum;


                } else {//上期没有投注该号码，为起始投注


                }


            } else {
                //没有上期的投注方案，为起始投注

            }


            //起始投注
            if (start) {
                temp.nums[i].num = num;
                temp.nums[i].frequency = 1;
                temp.nums[i].total_sum = num;


                //如果是收尾并且为起始投注，取消投注
                if (method == '2') {
                    temp.nums[i].betting = false;
                    temp.nums[i].num = 0;
                    temp.nums[i].frequency = 0;
                    temp.nums[i].total_sum = 0;
                }
            }


        }

    }


    outObj(temp)
    // stop()

    return temp;
}

function stop() {
    throw '手动停止脚本';
}


function outObj(obj) {
    $('#out-obj').val(JSON.stringify(obj));
}

/**
 * 计算两面
 * @param index
 * @param name
 * @param num
 * @param add
 * @param max
 * @param miss
 * @returns {{name: *, big: boolean, small: boolean, single: boolean, _double: boolean, _big: number, _small: number, _single: number, __double: number}}
 */
function computeTwoSides(index, name, num, add, max, miss, method) {

    var subObj = function (name) {
        return {
            name: name,//名字：大小单双龙虎
            miss: null, //遗漏
            betting_amount: 0,//投注额
            total_sum: 0,//总金额
            is_betting: false,//是否投注
            betting_count: 0,//投注次数
        }
    }

    var temp = {
        name: name,
        item: []
    };

    for (var i = 0; i < 6; i++) {
        var name = ['大', '小', '单', '双', '龙', '虎'];
        if (i < 4) {//大小单双
            temp.item[i] = subObj(name[i]);
        } else {//龙虎
            if (index < 5) {//前5个名次有龙虎
                temp.item[i] = subObj(name[i]);
            }
        }
    }

    //找出上一期的投注数据
    var preArr = vueResult.get(vueData.trs[0].issue);

    //计算投注额
    var computeBettingAmount = function (subObjIndex, miss2) {

        temp.item[subObjIndex].miss = miss2;
        if (miss2 >= miss) {//子对象中的遗漏值大于等于设定遗漏值时开启投注

            temp.item[subObjIndex].is_betting = true;

            //没有之前的投注数据，或者上次投注的期号和最新开奖的期号不一致
            if (preArr == null || preArr.issue !== vueData.trs[0].issue) {

                //如果方法是收尾，则取消新的投注项目
                if (method == '2') {
                    temp.item[subObjIndex].is_betting = false;
                    temp.item[subObjIndex].betting_amount = 0;
                } else {
                    temp.item[subObjIndex].betting_amount = num;
                }

            } else {//之前有投注数据

                var preNum = preArr.twoSides[index].item[subObjIndex].betting_amount;//上期的投注额

                if (preNum === 0) {//上次没有投注这个项目
                    temp.item[subObjIndex].betting_amount = num;
                } else {
                    var temp2 = preNum * 2 + add;
                    if (temp2 > max) {//封顶
                        // showMsg('已亏损', 5, 2000);
                        temp2 = num;
                    }
                    temp.item[subObjIndex].betting_amount = temp2;
                }
            }
        }
    };

    //大遗漏
    for (var i = 0; i < vueData.trs.length; i++) {
        if (is_big(vueData.trs[i].nums[index])) {
            computeBettingAmount(0, i);
            break;
        }
    }

    //小遗漏
    for (var i = 0; i < vueData.trs.length; i++) {
        if (is_small(vueData.trs[i].nums[index])) {
            computeBettingAmount(1, i);
            break;
        }
    }

    //单遗漏
    for (var i = 0; i < vueData.trs.length; i++) {
        if (is_single(vueData.trs[i].nums[index])) {
            computeBettingAmount(2, i);
            break;
        }
    }


    //双遗漏
    for (var i = 0; i < vueData.trs.length; i++) {
        if (is_double(vueData.trs[i].nums[index])) {
            computeBettingAmount(3, i);
            break;
        }
    }


    if (index < 5) {
        //龙遗漏
        for (var i = 0; i < vueData.trs.length; i++) {
            if (is_loong(vueData.trs[i].nums, index)) {
                computeBettingAmount(4, i);
                break;
            }
        }

        //虎遗漏
        for (var i = 0; i < vueData.trs.length; i++) {
            if (is_tiger(vueData.trs[i].nums, index)) {
                computeBettingAmount(5, i);
                break;
            }
        }
    }

    return temp;
}


var vueResult = new Vue({
    el: '#vue-result',
    data: {
        info: '录入数据',
        result: [],
        panel: {
            two_sides: true,
            one_to_ten: true
        }
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
            // el.select();//选中文本
            el.zclip({
                path: '/static/zclip/ZeroClipboard.swf',
                copy: function () { //复制内容
                    return el.val();
                },
                afterCopy: function () {
                    showMsg('复制成功', 1, 500);
                }
            });
        },

        /**
         * 获取期号索引
         * @param issue
         * @returns {number}
         */
        getIndex: function (issue) {
            for (var i = 0; i < this.result.length; i++) {
                if (this.result[i].issue === issue) {
                    return i;
                }
            }
            return -1;
        },
        get: function (issue) {
            for (var i = 0; i < this.result.length; i++) {
                if (this.result[i].issue === issue) {
                    return this.result[i];
                }
            }
            return null;
        },
        add: function (obj) {
            var index = this.getIndex(obj.issue);
            if (index > -1) {
                this.result.unshift(obj);
                // this.result[index] = obj;
            } else {
                this.result.unshift(obj);
            }
        }
    }
});

window.onbeforeunload = function (e) {
    // return '';
}

function showMsg(msg, icon, time) {
    layer.msg(msg, {
        icon: icon,
        time: time //默认3秒关闭
    });
}


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

//开奖数据
var vueData = new Vue({
    el: '#vue-data',
    data: {
        trs: []
    },
    methods: {

        /**
         * 添加一条数据，如果已存在则不添加并返回 false
         * @param issue
         * @param nums
         * @returns {boolean}
         */
        add: function (issue, nums) {
            if (this.get(issue) == null) {
                this.trs.unshift({issue: issue, nums: nums});
                return true;
            } else {
                return false;
            }
        },

        /**
         * 通过期号获取数据，不存在返回 null
         * @param issue
         * @returns {*}
         */
        get: function (issue) {
            for (var i = 0; i < this.trs.length; i++) {
                if (this.trs[i].issue == issue) {
                    return this.trs[i];
                }
            }
            return null;
        },

        /**
         * 采用二叉树算法
         */
        sort: function () {
            //二叉树排序
            var binaryTree = new BinaryTree();
            for (var i = 0; i < this.trs.length; i++) {
                binaryTree.insert(this.trs[i]);//将数组元素插入二叉树
            }
            //中序遍历，传入回调函数
            var tempArr = [];
            binaryTree.inOrderTraverse(function (key) {
                tempArr.push(key);
            });


            this.trs = tempArr;
            //二叉树结束
        },

        /**
         * 检查数据是否缺失
         * @returns {boolean}
         */
        check: function () {
            for (var i = 0; i < this.trs.length; i++) {
                if (i + 1 === this.trs.length) {//最后的索引，全部检查通过
                    return true;
                }
                if (this.trs[i].issue !== this.trs[i + 1].issue + 1) {
                    if (this.get(this.trs[i].issue - 1) == null) {
                        alert((this.trs[i].issue - 1) + ' 期数据不存在');
                        return false;
                    }
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