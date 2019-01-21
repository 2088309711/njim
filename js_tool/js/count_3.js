var cookie_prefix = 'count_3_';

$(function () {

    load_cookie('num');
    load_cookie('add');
    load_cookie('max');

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


    $(":radio").click(function () {
        set_cookie($(this).attr('name'), $(this).val());
        compute();
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


    // 统计规律发生次数
    $('#count-law').click(function () {
        countLaw();
    });


    $('#count-continuity').click(function () {
        countContinuity();
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
    }


    outObj(miss)

}


function countContinuity() {

    var result = {
        item: [],
        count: 0
    };

    //遍历开奖每行结果
    for (var i = 0; i < vueData.trs.length; i++) {

        if (i + 2 >= vueData.trs.length) {
            break;
        }

        var temp = [];

        temp[0] = vueData.trs[i].nums[0];
        temp[1] = vueData.trs[i + 1].nums[0];
        temp[2] = vueData.trs[i + 2].nums[0];

        if (temp[0] === 9) {
            if (temp[1] === 10) {
                if (temp[2] === 1) {
                    result.count++;

                    result.item.push({
                        issue: vueData.trs[i + 2].issue,
                        nums: temp[0] + '-' + temp[1] + '-' + temp[2]
                    })

                }
            }
        } else if (temp[0] === 10) {
            if (temp[1] === 1) {
                if (temp[2] === 2) {
                    result.count++;

                    result.item.push({
                        issue: vueData.trs[i + 2].issue,
                        nums: temp[0] + '-' + temp[1] + '-' + temp[2]
                    })

                }
            }
        } else {
            if (temp[0] === temp[1] - 1) {
                if (temp[1] === temp[2] - 1) {
                    result.count++;

                    result.item.push({
                        issue: vueData.trs[i + 2].issue,
                        nums: temp[0] + '-' + temp[1] + '-' + temp[2]
                    })

                }
            }
        }
    }

    outObj(result);
}


//统计规律
function countLaw() {

    var result = {
        size: 0,
        single_double: 0,
        dragon_tiger: 0,
        num: 0
    };

    //遍历开奖每行结果
    for (var i = 0; i < vueData.trs.length; i++) {
        //遍历一行中的10个号码
        for (var j = 0; j < vueData.trs[i].nums.length; j++) {

            if (i + 8 >= vueData.trs.length) {
                break;
            }

            //选出6个需要比对的号码
            var temp = [];
            temp[0] = vueData.trs[i].nums;
            temp[1] = vueData.trs[i + 1].nums;
            temp[2] = vueData.trs[i + 2].nums;
            temp[3] = vueData.trs[i + 3].nums;
            temp[4] = vueData.trs[i + 4].nums;
            temp[5] = vueData.trs[i + 5].nums;
            temp[6] = vueData.trs[i + 6].nums;
            temp[7] = vueData.trs[i + 7].nums;
            temp[8] = vueData.trs[i + 8].nums;

            //第一个是大
            if (is_big(temp[0][j])) {
                if (is_big(temp[1][j])) {
                    if (is_small(temp[2][j])) {
                        if (is_small(temp[3][j])) {
                            if (is_big(temp[4][j])) {
                                if (is_big(temp[5][j])) {
                                    if (is_small(temp[6][j])) {
                                        if (is_small(temp[7][j])) {
                                            if (is_big(temp[8][j])) {
                                                result.size++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            //第一个是小
            if (is_small(temp[0][j])) {
                if (is_small(temp[1][j])) {//大
                    if (is_big(temp[2][j])) {
                        if (is_big(temp[3][j])) {
                            if (is_small(temp[4][j])) {
                                if (is_small(temp[5][j])) {
                                    if (is_big(temp[6][j])) {
                                        if (is_big(temp[7][j])) {
                                            if (is_small(temp[8][j])) {
                                                result.size++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }


            //第一个是单
            if (is_single(temp[0][j])) {
                if (is_single(temp[1][j])) {
                    if (is_double(temp[2][j])) {
                        if (is_double(temp[3][j])) {
                            if (is_single(temp[4][j])) {
                                if (is_single(temp[5][j])) {
                                    if (is_double(temp[6][j])) {
                                        if (is_double(temp[7][j])) {
                                            if (is_single(temp[8][j])) {
                                                result.single_double++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            //第一个是双
            if (is_double(temp[0][j])) {
                if (is_double(temp[1][j])) {
                    if (is_single(temp[2][j])) {
                        if (is_single(temp[3][j])) {
                            if (is_double(temp[4][j])) {
                                if (is_double(temp[5][j])) {
                                    if (is_single(temp[6][j])) {
                                        if (is_single(temp[7][j])) {
                                            if (is_double(temp[8][j])) {
                                                result.single_double++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }


            if (j < 5) {
                //第一个是龙
                if (is_loong(temp[0], j)) {
                    if (is_loong(temp[1], j)) {
                        if (is_tiger(temp[2], j)) {
                            if (is_tiger(temp[3], j)) {
                                if (is_loong(temp[4], j)) {
                                    if (is_loong(temp[5], j)) {
                                        if (is_tiger(temp[6], j)) {
                                            if (is_tiger(temp[7], j)) {
                                                if (is_loong(temp[8], j)) {
                                                    result.dragon_tiger++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


                //第一个是虎
                if (is_tiger(temp[0], j)) {
                    if (is_tiger(temp[1], j)) {
                        if (is_loong(temp[2], j)) {
                            if (is_loong(temp[3], j)) {
                                if (is_tiger(temp[4], j)) {
                                    if (is_tiger(temp[5], j)) {
                                        if (is_loong(temp[6], j)) {
                                            if (is_loong(temp[7], j)) {
                                                if (is_tiger(temp[8], j)) {
                                                    result.dragon_tiger++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }

            result.num++

        }
    }

    outObj(result);

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


    var method = $("input[name='method']:checked").val();//方法

    if (isNaN(num) || isNaN(add) || isNaN(max)) {
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


    var nameArr = ['冠军', '亚军', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'];

    //以最新的数据遍历车道，从冠军到第十名
    for (var i = 0; i < vueData.trs[0].nums.length; i++) {

        // 计算两面结果
        twoSidesResultArr.push(computeTwoSides(i, nameArr[i], num, add, max, method));

    }

    //组织结果对象
    var resultObj = {
        issue: vueData.trs[0].issue + 1,//最新期号 + 1
        twoSides: twoSidesResultArr
    };

    vueResult.add(resultObj);
    // outObj(vueResult.result);
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
function computeTwoSides(index, name, num, add, max, method) {

    var subObj = function (name) {
        return {
            name: name,//名字：大小单双龙虎
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

    //给一个名次分配6个对象
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
    var computeBettingAmount = function (itemIndex) {

        temp.item[itemIndex].is_betting = true;//开启投注

        var start = true;

        //没有之前的投注数据，或者上次投注的期号和最新开奖的期号不一致
        if (preArr != null && preArr.issue === vueData.trs[0].issue) {
            //之前有投注数据并且有效

            var preItemIndex = -1;
            //取上期的投注额   0大 1小 2单 3双 4龙 5虎
            if (itemIndex === 0) {//如果本期投注大，取上期的小 1
                preItemIndex = 1;
            } else if (itemIndex === 1) {//取大 0
                preItemIndex = 0;
            } else if (itemIndex === 2) {
                preItemIndex = 3;
            } else if (itemIndex === 3) {
                preItemIndex = 2;
            } else if (itemIndex === 4) {
                preItemIndex = 5;
            } else if (itemIndex === 5) {
                preItemIndex = 4;
            }

            var preNum = preArr.twoSides[index].item[preItemIndex].betting_amount;//上期的投注额
            if (preNum > 0) {//上次有投注这个项目
                var betting_amount = preNum * 2 + add;
                if (betting_amount <= max) {//没超过封顶
                    start = false;//非初始投注
                    temp.item[itemIndex].betting_amount = betting_amount;
                }
            }
        }

        //初始投注
        if (start) {
            temp.item[itemIndex].betting_amount = num;

            //如果方法是收尾，取消新的投注项目
            if (method == '2') {
                temp.item[itemIndex].is_betting = false;
                temp.item[itemIndex].betting_amount = 0;
            }
        }

    };

    if (is_big(vueData.trs[0].nums[index])) {
        if (is_small(vueData.trs[1].nums[index])) {
            if (is_big(vueData.trs[2].nums[index])) {
                if (is_small(vueData.trs[3].nums[index])) {
                    if (is_big(vueData.trs[4].nums[index])) {
                        if (is_small(vueData.trs[5].nums[index])) {
                            //投注大
                            computeBettingAmount(0);
                        }
                    }
                }
            }
        }
    }

    if (is_small(vueData.trs[0].nums[index])) {
        if (is_big(vueData.trs[1].nums[index])) {
            if (is_small(vueData.trs[2].nums[index])) {
                if (is_big(vueData.trs[3].nums[index])) {
                    if (is_small(vueData.trs[4].nums[index])) {
                        if (is_big(vueData.trs[5].nums[index])) {
                            //投注小
                            computeBettingAmount(1);
                        }
                    }
                }
            }
        }
    }

    if (is_single(vueData.trs[0].nums[index])) {
        if (is_double(vueData.trs[1].nums[index])) {
            if (is_single(vueData.trs[2].nums[index])) {
                if (is_double(vueData.trs[3].nums[index])) {
                    if (is_single(vueData.trs[4].nums[index])) {
                        if (is_double(vueData.trs[5].nums[index])) {
                            //投注单
                            computeBettingAmount(2);
                        }
                    }
                }
            }
        }
    }

    if (is_double(vueData.trs[0].nums[index])) {
        if (is_single(vueData.trs[1].nums[index])) {
            if (is_double(vueData.trs[2].nums[index])) {
                if (is_single(vueData.trs[3].nums[index])) {
                    if (is_double(vueData.trs[4].nums[index])) {
                        if (is_single(vueData.trs[5].nums[index])) {
                            //投注双
                            computeBettingAmount(3);
                        }
                    }
                }
            }
        }
    }

    if (index < 5) {//龙虎

        if (is_loong(vueData.trs[0].nums, index)) {
            if (is_tiger(vueData.trs[1].nums, index)) {
                if (is_loong(vueData.trs[2].nums, index)) {
                    if (is_tiger(vueData.trs[3].nums, index)) {
                        if (is_loong(vueData.trs[4].nums, index)) {
                            if (is_tiger(vueData.trs[5].nums, index)) {
                                //投注龙
                                computeBettingAmount(4);
                            }
                        }
                    }
                }
            }
        }

        if (is_tiger(vueData.trs[0].nums, index)) {
            if (is_loong(vueData.trs[1].nums, index)) {
                if (is_tiger(vueData.trs[2].nums, index)) {
                    if (is_loong(vueData.trs[3].nums, index)) {
                        if (is_tiger(vueData.trs[4].nums, index)) {
                            if (is_loong(vueData.trs[5].nums, index)) {
                                //投注虎
                                computeBettingAmount(5);
                            }
                        }
                    }
                }
            }
        }

    }

    return temp;
}


var vueResult = new Vue({
    el: '#vue-result',
    data: {
        info: '录入数据',
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