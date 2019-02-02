var play_audio, audio = new Audio('/js_tool/audio/1.mp3'), headColor = {
    'background': '#ff6e00',
    'color': '#fff'
};

function cut(id) {
    if (id == 1) {
        audio = new Audio('/js_tool/audio/1.mp3')
    } else if (id == 2) {
        audio = new Audio('/js_tool/audio/2.mp3')
    } else {
        return '不存在'
    }
    return '切换成功'
}


function compute() {

    play_audio = false;

    var headColor1 = {
        'background': 'none',
        'color': '#000'
    };


    // $('#head-1').css(headColor1);
    // $('#head-2').css(headColor1);
    // $('#head-3').css(headColor1);
    // $('#head-4').css(headColor1);
    // $('#head-5').css(headColor1);
    // $('#head-6').css(headColor1);
    // $('#head-7').css(headColor1);
    // $('#head-8').css(headColor1);


    //单项
    // var num = getIntVal('#num')
    // var add = getIntVal('#add')
    // var max = getIntVal('#max')
    // var miss = getIntVal('#miss')

    //1~10名参数
    var num_1_10 = getIntVal('#num_1_10')//初始投注额


    //一大一小
    // var one_big_one_small_num = getIntVal('#one_big_one_small_num')
    // var one_big_one_small_add = getIntVal('#one_big_one_small_add')
    // var one_big_one_small_max = getIntVal('#one_big_one_small_max')


    var method = $("input[name='method']:checked").val();//方法

    if (
        // isNaN(num) || isNaN(add) || isNaN(max) || isNaN(miss)//单项遗漏
        isNaN(num_1_10)//1~10名遗漏
    // || isNaN(one_big_one_small_num) || isNaN(one_big_one_small_add) || isNaN(one_big_one_small_max)//一大一小
    ) {
        showMsg('参数不全', 2, 1000);
        return;
    }

    if (vueData.trs.length === 0) {
        showMsg('请录入数据', 2, 1000);
        return;
    }

    if (!vueData.check()) {
        alert('数据断层，不能计算');
        return;
    }

    // var oneBigAndOneSmall = [];//一大一小
    // var doubleBigDoubleSmall = [];//双大双小
    // var threeBigThreeSmall = [];//三大三小
    var individual = [];//单项遗漏
    var oneToTenMiss = [];//1~10名遗漏
    // var twoBigAndOneSmall = [];//双大一小
    // var threeBigAndOneSmall = [];//三大一小
    // var fourBigAndOneSmall = [];//四大一小

    var nameArr = ['冠军', '亚军', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'];

    //以最新的数据遍历车道，从冠军到第十名
    for (var i = 0; i < vueData.trs[0].nums.length; i++) {

        //一大一小
        // oneBigAndOneSmall.push(vueOneBigAndOneSmall.compute(i, nameArr[i],
        //     one_big_one_small_num, one_big_one_small_add, one_big_one_small_max, method))


        //双大双小
        // doubleBigDoubleSmall.push(vueDoubleBigDoubleSmall.compute(i, nameArr[i],
        //     one_big_one_small_num, one_big_one_small_add, one_big_one_small_max, method))

        //三大三小
        // threeBigThreeSmall.push(vueThreeBigThreeSmall.compute(i, nameArr[i],
        //     one_big_one_small_num, one_big_one_small_add, one_big_one_small_max, method))

        //单项遗漏
        individual.push(vueIndividual.compute(i, nameArr[i], 1, 1, 200, 3, method))


        //1~10 名遗漏
        // oneToTenMiss.push(vueOneToTenMiss.compute(i, nameArr[i], num_1_10))


        //两大一小
        // twoBigAndOneSmall.push(vueTwoBigAndOneSmall.compute(i, nameArr[i],
        //     one_big_one_small_num, one_big_one_small_add, one_big_one_small_max, method))


        //三大一小
        // threeBigAndOneSmall.push(vueThreeBigAndOneSmall.compute(i, nameArr[i],
        //     one_big_one_small_num, one_big_one_small_add, one_big_one_small_max, method))


        //四大一小
        // fourBigAndOneSmall.push(vueFourBigAndOneSmall.compute(i, nameArr[i],
        //     one_big_one_small_num, one_big_one_small_add, one_big_one_small_max, method))

    }


    // outObj(oneToTenMiss);
    // stop();

    //一大一小
    // vueOneBigAndOneSmall.result.unshift({
    //     issue: vueData.trs[0].issue + 1,
    //     betting: oneBigAndOneSmall
    // });

    //双大双小
    // vueDoubleBigDoubleSmall.result.unshift({
    //     issue: vueData.trs[0].issue + 1,
    //     betting: doubleBigDoubleSmall
    // });


    //三大三小
    // vueThreeBigThreeSmall.result.unshift({
    //     issue: vueData.trs[0].issue + 1,
    //     betting: threeBigThreeSmall
    // });

    // 单项遗漏
    vueIndividual.result.unshift({
        issue: vueData.trs[0].issue + 1,
        betting: individual
    });


    //1~10名遗漏
    // vueOneToTenMiss.result.unshift({
    //     issue: vueData.trs[0].issue + 1,
    //     betting: oneToTenMiss
    // });

    //两大一小
    // vueTwoBigAndOneSmall.result.unshift({
    //     issue: vueData.trs[0].issue + 1,
    //     betting: twoBigAndOneSmall
    // });

    //三大一小
    // vueThreeBigAndOneSmall.result.unshift({
    //     issue: vueData.trs[0].issue + 1,
    //     betting: threeBigAndOneSmall
    // });


    //四大一小
    // vueFourBigAndOneSmall.result.unshift({
    //     issue: vueData.trs[0].issue + 1,
    //     betting: fourBigAndOneSmall
    // });


    if (play_audio) {
        audio.play(); //播放
    }


    openOrClosebettingPanel(true);
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


function getIntVal(elId) {
    return parseInt($(elId).val());
}


function copyInputVal(e) {
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
}

function openOrClosebettingPanel(open) {

    if (open) {
        $('#betting-panel').fadeIn();
        $('body').css('overflow', 'hidden');
    } else {
        $('#betting-panel').fadeOut();
        $('body').css('overflow', 'auto');
    }

}


function showMsg(msg, icon, time) {
    layer.msg(msg, {
        icon: icon,
        time: time //默认3秒关闭
    });
}


function stop() {
    throw '手动停止脚本';
}


function outObj(obj) {
    $('#out-obj').val(JSON.stringify(obj));
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
    if (index == null) {
        alert('龙必须加索引')
    }
    return arr[index] > arr[9 - index];
}

function is_tiger(arr, index) {
    if (index == null) {
        alert('虎必须加索引')
    }
    return arr[index] < arr[9 - index];
}


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