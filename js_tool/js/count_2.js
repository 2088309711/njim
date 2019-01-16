var cookie_prefix = 'count_2_';
var loss_count = 0;
$(function () {

    load_cookie('num');
    load_cookie('add');
    load_cookie('max');
    load_cookie('miss');
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
});


function parseData() {
    var value = $('#result').val();
    $('#result').val('正在解析数据');

    var issue = value.match(/\d{9}/);
    var nums = value.match(/([01][0-9],){9}[01][0-9]/);
    var allData = value.match(/\[\{"id":\d+,"betEndTime":"\d{4}(-\d{2}){2} (\d{2}:){2}\d{2}","turnNum":"\d+","openNum":"(\d{2},){9}\d{2}"/);

    if (allData != null) {//完整数据

        var data = $.parseJSON(value);

        // 时间 data[0].openTime

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

    } else {
        $('#result').val('无法识别的数据');
    }

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
    }

    //中序遍历节点（节点， 回调函数）
    var inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);//左下递归
            callback(node.key);//将节点的值传入回调函数
            inOrderTraverseNode(node.right, callback);//右下递归
        }
    }

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
    var num = parseInt($('#num').val());
    var add = parseInt($('#add').val());
    var max = parseInt($('#max').val());
    var miss = parseInt($('#miss').val());
    var method = $("input[name='method']:checked").val();//方法

    if (isNaN(num) || isNaN(add) || isNaN(max) || isNaN(miss)) {
        showMsg('参数不全', 2, 1000);
        return;
    }

    //检查数据量是否足够
    if (vueData.trs.length < miss || vueData.trs.length == 0) {
        showMsg('数据量不足，无法计算', 2, 1000);
        return;
    }

    //检查数据是否断层
    for (var i = 0; i < miss - 1; i++) {
        if (vueData.trs[i].issue !== vueData.trs[i + 1].issue + 1) {
            showMsg('数据断层，停止计算', 2, 1000);
            return;
        }
    }

    var resultArr = [];

    var nameArr = ['冠军', '亚军', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'];

    //以最新的数据遍历车道，从冠军到第十名
    for (var i = 0; i < vueData.trs[0].nums.length; i++) {


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
            temp._loong = 0;
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

        //找出上一期的投注数据
        var preArr = null;
        for (var j = 0; j < vueResult.result.length; j++) {
            if (vueResult.result[j].issue === vueData.trs[0].issue) {
                preArr = vueResult.result[j];//上一期的投注期号必须和本期开奖期号一致
            }
        }


        //没有之前的投注数据，或者上次投注的期号和最新开奖的期号不一致
        if (vueResult.result.length == 0 || preArr === null || preArr.issue !== vueData.trs[0].issue) {

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
                temp._big = getNum(preArr.betting[i]._big, num, add, max);
            }
            if (temp.small) {
                temp._small = getNum(preArr.betting[i]._small, num, add, max);
            }
            if (temp.single) {
                temp._single = getNum(preArr.betting[i]._single, num, add, max);
            }
            if (temp._double) {
                temp.__double = getNum(preArr.betting[i].__double, num, add, max);
            }
            if (i < 5) {
                if (temp.loong) {
                    temp._loong = getNum(preArr.betting[i]._loong, num, add, max);
                }
                if (temp.tiger) {
                    temp._tiger = getNum(preArr.betting[i]._tiger, num, add, max);
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
            showMsg('已亏损：' + (++loss_count) + '次', 5, 2000);
            temp = num;
        }
        return temp;
    }
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
            el.select();

            el.zclip({
                path: '/static/zclip/ZeroClipboard.swf',
                copy: function () { //复制内容
                    return el.val();
                },
                afterCopy: function () {
                    showMsg('复制成功', 1, 500);
                }
            });
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

            log(tempArr);

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