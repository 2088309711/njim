var cookie_prefix = 'count_2_';

$(function () {

    load_cookie('method');

    //单项遗漏
    load_cookie('num');
    load_cookie('add');
    load_cookie('max');
    load_cookie('miss');

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
    //单项遗漏 end


    //一大一小
    load_cookie('one_big_one_small_num');
    load_cookie('one_big_one_small_add');
    load_cookie('one_big_one_small_max');

    $('#one_big_one_small_num').blur(function () {
        ckNum('one_big_one_small_num');
        compute();
    });

    $('#one_big_one_small_add').blur(function () {
        ckNum('one_big_one_small_add');
        compute();
    });

    $('#one_big_one_small_max').blur(function () {
        ckNum('one_big_one_small_max');
        compute();
    });

    //一大一小  end

    //双大双小
    load_cookie('double_big_double_small_num');
    load_cookie('double_big_double_small_add');
    load_cookie('double_big_double_small_max');

    $('#double_big_double_small_num').blur(function () {
        ckNum('double_big_double_small_num');
        compute();
    });

    $('#double_big_double_small_add').blur(function () {
        ckNum('double_big_double_small_add');
        compute();
    });

    $('#double_big_double_small_max').blur(function () {
        ckNum('double_big_double_small_max');
        compute();
    });

    //双大双小 end


    //三大三小
    load_cookie('three_big_three_small_num');
    load_cookie('three_big_three_small_add');
    load_cookie('three_big_three_small_max');

    $('#three_big_three_small_num').blur(function () {
        ckNum('three_big_three_small_num');
        compute();
    });

    $('#three_big_three_small_add').blur(function () {
        ckNum('three_big_three_small_add');
        compute();
    });

    $('#three_big_three_small_max').blur(function () {
        ckNum('three_big_three_small_max');
        compute();
    });

    //三大三小 end


    //1~10 名遗漏
    load_cookie('num_1_10');
    load_cookie('min_1_10');
    load_cookie('miss_1_10');

    $('#num_1_10').blur(function () {
        ckNum('num_1_10');
        compute();
    });

    $('#min_1_10').blur(function () {
        ckNum('min_1_10');
        compute();
    });


    $('#miss_1_10').blur(function () {
        ckNum('miss_1_10');
        compute();
    });
    //1~10 名遗漏 end

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

    // 统计一大一小
    $('#count-one-big-one-small').click(function () {
        countOneBigOneSmall();
    });

    //统计双大双小
    $('#count-double-big-double-small').click(function () {
        countDoubleBigDoubleSmall();
    });

    //统计三大三小
    $('#count-three-big-three-small').click(function () {
        countThreeBigThreeSmall();
    });

    $('#close-betting-panel').click(function () {
        openOrClosebettingPanel(false);
    });

});


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


//统计规律
function countOneBigOneSmall() {

    var result = {
        size: 0,
        single_double: 0,
        dragon_tiger: 0,
        issue: [],
        num: 0
    };

    //遍历开奖每行结果
    for (var i = 0; i < vueData.trs.length; i++) {
        //遍历一行中的10个号码
        for (var j = 0; j < vueData.trs[i].nums.length; j++) {

            if (i + 7 >= vueData.trs.length) {
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


            if (
                is_big(temp[0][j]) &&
                is_small(temp[1][j]) &&
                is_big(temp[2][j]) &&
                is_small(temp[3][j]) &&
                is_big(temp[4][j]) &&
                is_small(temp[5][j]) &&
                is_big(temp[6][j]) &&
                is_small(temp[7][j])
            ) {
                result.size++;
                result.issue.push(vueData.trs[i].issue);
            }


            if (
                is_small(temp[0][j]) &&
                is_big(temp[1][j]) &&
                is_small(temp[2][j]) &&
                is_big(temp[3][j]) &&
                is_small(temp[4][j]) &&
                is_big(temp[5][j]) &&
                is_small(temp[6][j]) &&
                is_big(temp[7][j])
            ) {
                result.size++;
                result.issue.push(vueData.trs[i].issue);
            }


            if (
                is_single(temp[0][j]) &&
                is_double(temp[1][j]) &&
                is_single(temp[2][j]) &&
                is_double(temp[3][j]) &&
                is_single(temp[4][j]) &&
                is_double(temp[5][j]) &&
                is_single(temp[6][j]) &&
                is_double(temp[7][j])
            ) {
                result.single_double++;
                result.issue.push(vueData.trs[i].issue);
            }


            if (
                is_double(temp[0][j]) &&
                is_single(temp[1][j]) &&
                is_double(temp[2][j]) &&
                is_single(temp[3][j]) &&
                is_double(temp[4][j]) &&
                is_single(temp[5][j]) &&
                is_double(temp[6][j]) &&
                is_single(temp[7][j])
            ) {
                result.single_double++;
                result.issue.push(vueData.trs[i].issue);
            }


            if (j < 5) {
                if (
                    is_loong(temp[0], j) &&
                    is_tiger(temp[1], j) &&
                    is_loong(temp[2], j) &&
                    is_tiger(temp[3], j) &&
                    is_loong(temp[4], j) &&
                    is_tiger(temp[5], j) &&
                    is_loong(temp[6], j) &&
                    is_tiger(temp[7], j)
                ) {
                    result.dragon_tiger++;
                    result.issue.push(vueData.trs[i].issue);
                }


                if (
                    is_tiger(temp[0], j) &&
                    is_loong(temp[1], j) &&
                    is_tiger(temp[2], j) &&
                    is_loong(temp[3], j) &&
                    is_tiger(temp[4], j) &&
                    is_loong(temp[5], j) &&
                    is_tiger(temp[6], j) &&
                    is_loong(temp[7], j)
                ) {
                    result.dragon_tiger++;
                    result.issue.push(vueData.trs[i].issue);
                }


            }

            result.num++

        }
    }

    outObj(result);

}


//统计双大双小
function countDoubleBigDoubleSmall() {

    var result = {
        size: 0,
        single_double: 0,
        dragon_tiger: 0,
        issue: [],
        num: 0
    };

    //遍历开奖每行结果
    for (var i = 0; i < vueData.trs.length; i++) {
        //遍历一行中的10个号码
        for (var j = 0; j < vueData.trs[i].nums.length; j++) {

            if (i + 7 >= vueData.trs.length) {
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


            if (
                is_big(temp[0][j]) &&
                is_big(temp[1][j]) &&
                is_small(temp[2][j]) &&
                is_small(temp[3][j]) &&
                is_big(temp[4][j]) &&
                is_big(temp[5][j]) &&
                is_small(temp[6][j]) &&
                is_small(temp[7][j])
            ) {
                result.size++;
                result.issue.push(vueData.trs[i].issue);
            }


            if (
                is_small(temp[0][j]) &&
                is_small(temp[1][j]) &&
                is_big(temp[2][j]) &&
                is_big(temp[3][j]) &&
                is_small(temp[4][j]) &&
                is_small(temp[5][j]) &&
                is_big(temp[6][j]) &&
                is_big(temp[7][j])
            ) {
                result.size++;
                result.issue.push(vueData.trs[i].issue);
            }

            if (
                is_single(temp[0][j]) &&
                is_single(temp[1][j]) &&
                is_double(temp[2][j]) &&
                is_double(temp[3][j]) &&
                is_single(temp[4][j]) &&
                is_single(temp[5][j]) &&
                is_double(temp[6][j]) &&
                is_double(temp[7][j])
            ) {
                result.single_double++;
                result.issue.push(vueData.trs[i].issue);
            }


            if (
                is_double(temp[0][j]) &&
                is_double(temp[1][j]) &&
                is_single(temp[2][j]) &&
                is_single(temp[3][j]) &&
                is_double(temp[4][j]) &&
                is_double(temp[5][j]) &&
                is_single(temp[6][j]) &&
                is_single(temp[7][j])
            ) {
                result.single_double++;
                result.issue.push(vueData.trs[i].issue);
            }


            if (j < 5) {
                if (
                    is_loong(temp[0], j) &&
                    is_loong(temp[1], j) &&
                    is_tiger(temp[2], j) &&
                    is_tiger(temp[3], j) &&
                    is_loong(temp[4], j) &&
                    is_loong(temp[5], j) &&
                    is_tiger(temp[6], j) &&
                    is_tiger(temp[7], j)
                ) {
                    result.dragon_tiger++;
                    result.issue.push(vueData.trs[i].issue);
                }


                if (
                    is_tiger(temp[0], j) &&
                    is_tiger(temp[1], j) &&
                    is_loong(temp[2], j) &&
                    is_loong(temp[3], j) &&
                    is_tiger(temp[4], j) &&
                    is_tiger(temp[5], j) &&
                    is_loong(temp[6], j) &&
                    is_loong(temp[7], j)
                ) {
                    result.dragon_tiger++;
                    result.issue.push(vueData.trs[i].issue);
                }

            }

            result.num++

        }
    }

    outObj(result);

}


//统计三大三小
function countThreeBigThreeSmall() {

    var result = {
        size: {
            issue: [],
            count: 0
        },
        single_double: {
            issue: [],
            count: 0
        },
        dragon_tiger: {
            issue: [],
            count: 0
        },
        num: 0
    };


    //遍历开奖每行结果
    for (var i = 0; i < vueData.trs.length; i++) {
        //遍历一行中的10个号码
        for (var j = 0; j < vueData.trs[i].nums.length; j++) {

            if (i + 8 >= vueData.trs.length) {
                break;
            }

            //选出需要比对的号码
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
            // temp[9] = vueData.trs[i + 9].nums;
            // temp[10] = vueData.trs[i + 10].nums;
            // temp[11] = vueData.trs[i + 11].nums;
            // temp[12] = vueData.trs[i + 12].nums;
            // temp[13] = vueData.trs[i + 13].nums;
            // temp[14] = vueData.trs[i + 14].nums;
            // temp[15] = vueData.trs[i + 15].nums;
            // temp[16] = vueData.trs[i + 16].nums;
            // temp[17] = vueData.trs[i + 17].nums;


            if (
                is_big(temp[0][j]) &&
                is_big(temp[1][j]) &&
                is_big(temp[2][j]) &&
                is_small(temp[3][j]) &&
                is_small(temp[4][j]) &&
                is_small(temp[5][j]) &&
                is_big(temp[6][j]) &&
                is_big(temp[7][j]) &&
                is_big(temp[8][j]) //&&
                // is_small(temp[9][j]) &&
                // is_small(temp[10][j]) &&
                // is_small(temp[11][j]) //&&
                // is_big(temp[12][j]) &&
                // is_big(temp[13][j]) &&
                // is_big(temp[14][j]) &&
                // is_small(temp[15][j]) &&
                // is_small(temp[16][j]) &&
                // is_small(temp[17][j])
            ) {
                result.size.count++;
                result.size.issue.push(vueData.trs[i].issue + ':' + (j + 1));
            }


            if (
                is_small(temp[0][j]) &&
                is_small(temp[1][j]) &&
                is_small(temp[2][j]) &&
                is_big(temp[3][j]) &&
                is_big(temp[4][j]) &&
                is_big(temp[5][j]) &&
                is_small(temp[6][j]) &&
                is_small(temp[7][j]) &&
                is_small(temp[8][j]) //&&
                // is_big(temp[9][j]) &&
                // is_big(temp[10][j]) &&
                // is_big(temp[11][j]) //&&
                // is_small(temp[12][j]) &&
                // is_small(temp[13][j]) &&
                // is_small(temp[14][j]) &&
                // is_big(temp[15][j]) &&
                // is_big(temp[16][j]) &&
                // is_big(temp[17][j])
            ) {
                result.size.count++;
                result.size.issue.push(vueData.trs[i].issue + ':' + (j + 1));
            }


            if (
                is_single(temp[0][j]) &&
                is_single(temp[1][j]) &&
                is_single(temp[2][j]) &&
                is_double(temp[3][j]) &&
                is_double(temp[4][j]) &&
                is_double(temp[5][j]) &&
                is_single(temp[6][j]) &&
                is_single(temp[7][j]) &&
                is_single(temp[8][j]) //&&
                // is_double(temp[9][j]) &&
                // is_double(temp[10][j]) &&
                // is_double(temp[11][j]) //&&
                // is_single(temp[12][j]) &&
                // is_single(temp[13][j]) &&
                // is_single(temp[14][j]) &&
                // is_double(temp[15][j]) &&
                // is_double(temp[16][j]) &&
                // is_double(temp[17][j])
            ) {
                result.single_double.count++;
                result.single_double.issue.push(vueData.trs[i].issue + ':' + (j + 1));
            }


            if (
                is_double(temp[0][j]) &&
                is_double(temp[1][j]) &&
                is_double(temp[2][j]) &&
                is_single(temp[3][j]) &&
                is_single(temp[4][j]) &&
                is_single(temp[5][j]) &&
                is_double(temp[6][j]) &&
                is_double(temp[7][j]) &&
                is_double(temp[8][j]) //&&
                // is_single(temp[9][j]) &&
                // is_single(temp[10][j]) &&
                // is_single(temp[11][j]) //&&
                // is_double(temp[12][j]) &&
                // is_double(temp[13][j]) &&
                // is_double(temp[14][j]) &&
                // is_single(temp[15][j]) &&
                // is_single(temp[16][j]) &&
                // is_single(temp[17][j])
            ) {
                result.single_double.count++;
                result.single_double.issue.push(vueData.trs[i].issue + ':' + (j + 1));
            }


            if (j < 5) {
                if (
                    is_loong(temp[0], j) &&
                    is_loong(temp[1], j) &&
                    is_loong(temp[2], j) &&
                    is_tiger(temp[3], j) &&
                    is_tiger(temp[4], j) &&
                    is_tiger(temp[5], j) &&
                    is_loong(temp[6], j) &&
                    is_loong(temp[7], j) &&
                    is_loong(temp[8], j) //&&
                    // is_tiger(temp[9], j) &&
                    // is_tiger(temp[10], j) &&
                    // is_tiger(temp[11], j) //&&
                    // is_loong(temp[12], j) &&
                    // is_loong(temp[13], j) &&
                    // is_loong(temp[14], j) &&
                    // is_tiger(temp[15], j) &&
                    // is_tiger(temp[16], j) &&
                    // is_tiger(temp[17], j)
                ) {
                    result.dragon_tiger.count++;
                    result.dragon_tiger.issue.push(vueData.trs[i].issue + ':' + (j + 1));
                }


                if (
                    is_tiger(temp[0], j) &&
                    is_tiger(temp[1], j) &&
                    is_tiger(temp[2], j) &&
                    is_loong(temp[3], j) &&
                    is_loong(temp[4], j) &&
                    is_loong(temp[5], j) &&
                    is_tiger(temp[6], j) &&
                    is_tiger(temp[7], j) &&
                    is_tiger(temp[8], j) //&&
                    // is_loong(temp[9], j) &&
                    // is_loong(temp[10], j) &&
                    // is_loong(temp[11], j) //&&
                    // is_tiger(temp[12], j) &&
                    // is_tiger(temp[13], j) &&
                    // is_tiger(temp[14], j) &&
                    // is_loong(temp[15], j) &&
                    // is_loong(temp[16], j) &&
                    // is_loong(temp[17], j)
                ) {
                    result.dragon_tiger.count++;
                    result.dragon_tiger.issue.push(vueData.trs[i].issue + ':' + (j + 1));
                }

            }

            result.num++

        }
    }

    outObj(result);

}


setInterval(function () {
    $('#data').children('iframe').each(function () {
        var url = this.src.split('?');
        this.src = url[0] + '?_t=' + new Date().getTime();
    });
}, 5000);


window.onbeforeunload = function (e) {
    // return '';
}
