"use strict";
//客服脚本
var im_object = {
    data: {
        session_list: [],//储存所有客户消息
        new_msg_id: [],//储存新消息id
        last_msg: '',//最后一条发送出的消息
        staff_id: '',
    },
    state: {
        is_open_emo_panel: false,// 标记打开表情面板
        get_old_msg: true,//是否获取旧消息
        is_add_msg_num: false// 控制是否增加消息数量
    },
    el: {
        data_el: null
    }
};

var $ = null;
var layer = null;

layui.use('layer', function () {
    layer = layui.layer;
    $ = layui.$;

    $(function () {
        im_object.el.data_el = $('#data');
        im_object.data.staff_id = im_object.el.data_el.attr('staff_id');


        // 点击发送
        $("#send").click(function () {
            sendMsg();
        });

        // 键盘发送
        $('#edit').keydown(function (e) {
            if (e.ctrlKey && e.which == 13) {
                // Ctrl+Enter
                sendMsg();
            }
        });

        // 打开表情面板
        $("#open-emo-panel").click(function () {
            $("#emo-panel").show();
            im_object.state.is_open_emo_panel = true;
        });

        // 选取表情
        $("#emo-box>img").click(function () {
            // 追加到输入框
            $("#edit").val($("#edit").val() + $(this).attr("title"));
        });

        // 关闭表情面板
        $("#close-emo-panel").click(closeEmoPanel);

        // 点击消息框
        $("#show-message").click(closeEmoPanel);

        // 点击输入框
        $("#edit").click(closeEmoPanel);

        //打开备注弹层
        $('#open-remarks').click(function () {

            var client = clientList.findClient(display.id);

            var layerIndex = layer.open({
                type: 1,
                title: '填写备注',
                btn: '确定',
                yes: function () {
                    var value = $('#remarks-input').val();
                    client.name = value;
                    $.get('/staff/chat/remarks/client_id/' + client.id + '/name/' + value);
                    layer.close(layerIndex);
                },
                content: '<div id="remarks"><input id="remarks-input" value="' + client.name + '" type="text" placeholder="请输入备注" class="layui-input"></div>'
            });
        });

        setTimeout(function () {
            $('#now-chat-list').show();
        }, 1000);
    });
});

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
        if (newNode.key.id < node.key.id) {
            //新节点值小于父节点向左传递
            if (node.left === null) {
                //如果左节点为空则插入到左边
                node.left = newNode;
            } else {
                //否则向左下递归
                insertNode(node.left, newNode);
            }
        } else {
            //新节点值大于等于父节点向右传递
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


// 客户列表实例
var clientList = new Vue({
    el: '#now-chat-list',
    data: {
        list: []
    },
    methods: {
        /**
         * 严格按格式输入来自服务端的数据
         * @param data 服务端源数据
         */
        inputData: function (data) {

            im_object.data.new_msg_id = [];

            if (data == null || data.length == 0) {// 空数据
                return;
            }

            // 部署列表
            for (var i = 0; i < data.client_list.length; i++) {
                this.inputItem({
                    id: data.client_list[i].client_id,
                    name: data.client_list[i].name,
                    date: getDateFormat(data.client_list[i].active_time),
                    lastMsg: '',
                    newMsgNum: data.client_list[i].unread_num,
                    messages: []
                });
            }

            // 部署消息
            for (var i = 0; i < data.messages.length; i++) {
                im_object.data.new_msg_id.push(data.messages[i].id);
                // var time = data.messages[i].create_time.split(" ");
                this.inputMsg({
                    id: data.messages[i].id,
                    clientId: data.messages[i].client_id,
                    content: data.messages[i].content,
                    sendDate: data.messages[i].create_time,
                    sendType: data.messages[i].send_type,
                    sRead: data.messages[i].s_read
                });
            }
            im_object.state.is_add_msg_num = true;
            this.forMsg();
        },
        inputItem: function (obj) {
            // 处理已存在的数据
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id === obj.id) {
                    //更新列表数据
                    this.list[i].name = obj.name;
                    this.list[i].date = obj.date;
                    this.list[i].newMsgNum = obj.newMsgNum;
                    return;
                }
            }
            this.list.push(obj);
        },
        inputMsg: function (obj) {
            // 从列表中找到对应客户
            for (var i = 0; i < this.list.length; i++) {
                if (obj.clientId === this.list[i].id) {
                    // 判断消息是否存在
                    var noExist = true;// 默认不存在
                    for (var j = 0; j < this.list[i].messages.length; j++) {
                        // 比对已存在消息的ID
                        if (this.list[i].messages[j].id === obj.id) {
                            noExist = false;
                            break;// 已存在跳出
                        }
                    }

                    if (noExist) {// 消息不存在，添加消息
                        this.list[i].messages.push(obj);

                        // 判断插入的消息是否为正在显示的访客
                        if (display.id === this.list[i].id) {
                            // 是显示访客，将滚动条拉到底部
                            display.$nextTick(function () {
                                displayScrollBottom();
                            });
                        }
                    }
                    break;// 找到相应访客部署完成跳出
                }
            }
        },
        forMsg: function () {
            var unreadAll = 0;//所有未读消息数量
            for (var i = 0; i < this.list.length; i++) {//遍历列表

                //二叉树排序
                var binaryTree = new BinaryTree();
                for (var j = 0; j < this.list[i].messages.length; j++) {
                    binaryTree.insert(this.list[i].messages[j]);//将数组元素插入二叉树
                }
                //中序遍历，传入回调函数
                var tempArr = [];
                binaryTree.inOrderTraverse(function (key) {
                    tempArr.push(key);
                });
                this.list[i].messages = tempArr;
                //二叉树结束

                //设置最后一条消息
                try {
                    this.list[i].lastMsg = this.list[i].messages[this.list[i].messages.length - 1].content;
                } catch (e) {//这里有 undefined 异常
                }

                //统计所有未读消息数量
                unreadAll += this.list[i].newMsgNum;
            }

            if (unreadAll > 0) {//显示所有未读消息数量的徽章
                $('#unread-all').text(unreadAll).show();
            } else {
                $('#unread-all').hide();
            }

        },
        open: function (item) { // 打开会话
            // 改变列表样式
            $('#id_' + item.id).addClass('active').siblings().removeClass('active');

            // 将打开的访客新消息数量置0
            item.newMsgNum = 0;

            $('#mask-layer').hide();

            // 将打开的访客消息数据传给显示区
            display.assign(item);
        },
        findClient: function (id) {//通过ID查找访客
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id === id) {
                    return this.list[i];
                }
            }
        }
    }

});


// 显示区滚动条拉倒底部
function displayScrollBottom() {
    var showMessage = $("#show-message");
    showMessage.scrollTop(showMessage[0].scrollHeight);
}

// 显示区实例
var display = new Vue({
    el: '#show-message',
    data: {
        id: '',
        openChat: false,
        messages: [],
        outMsgCount: 0
    },
    methods: {
        assign: function (item) {
            this.id = item.id;
            this.messages = item.messages;
            this.openChat = true;
            this.$nextTick(function () {
                displayScrollBottom();// 下拉滚动条
            });
        },
        display_time: function () {
            this.outMsgCount++;
            return this.outMsgCount % 3 == 0;
        }
    }
});

// 关闭表情面板
function closeEmoPanel() {
    if (im_object.state.is_open_emo_panel) {
        $("#emo-panel").hide();
        im_object.state.is_open_emo_panel = false;
    }
}

// 发送消息 - 客服发送到客户
function sendMsg() {

    closeEmoPanel();

    if (!display.openChat) {
        layer.msg('当前没有和访客建立对话');
        return;
    }

    // 获取数据
    var clientId = display.id;// 接收者
    var content = $("#edit").val();// 内容
    var staffId = im_object.data.staff_id;

    // 检查数据
    if (content == '' || staffId.length < 5 || staffId.length > 14 || clientId.length != 40) {
        return;
    }

    // 清空输入框
    setInputToEmpty();

    var rContent = replaceMsgContent(content);

    // 发送
    $.ajax({
        url: "/index.php/staff/chat/sendmsg",
        type: "POST",
        data: {
            client_id: clientId,
            content: rContent
        },
        dataType: "json",
        success: function (data) {
            if (!data.succ) {
                // 发送失败
                layer.msg('发送失败');
                // 将发送时清空的数据还原
                setLastMsg();
            }
        }
    });
}

// 获取数据
setInterval(function () {

    // 检查数据
    if (im_object.data.staff_id.length < 5 || im_object.data.staff_id.length > 14) {
        // 数据不合法
        return;
    }

    var getType = 'n';// 只获取新记录

    if (im_object.state.get_old_msg) {
        getType = 'o';// 获取旧记录
        im_object.state.get_old_msg = false;
    }


    /*
     * s=staff_id
     * t=get_type
     * r=display_client_id
     * b=new_msg_ids
     */
    $.ajax({
        url: "/index.php/staff/chat/getmsg/s/" + im_object.data.staff_id + "/t/" + getType
        + "/r/" + (display.id !== '' ? display.id : '-') + "/b/" + getNewMsgIdStr(),
        dataType: "json",
        success: function (data) {
            clientList.inputData(data);
        }
    });
}, 1000);

// 时间戳转时间格式
function getDateFormat(time) {
    var date = new Date(Number(time) * 1000);
    // var y = date.getFullYear();
    // var m = date.getMonth() + 1;
    // m = m < 10 ? ('0' + m) : m;
    // var d = date.getDate();
    // d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    return h + ':' + minute + ':' + second;
}

function getNewMsgIdStr() {
    var ids = '';
    for (var i = 0; i < im_object.data.new_msg_id.length; i++) {
        ids += im_object.data.new_msg_id[i];
        if (i != im_object.data.new_msg_id.length - 1) {
            ids += ':';
        }
    }
    return ids;
}


// 把最后一条信息还原
function setLastMsg() {
    $("#edit").val(im_object.data.last_msg);
}

// 清空输入区
function setInputToEmpty() {
    im_object.data.last_msg = $("#edit").val();
    $("#edit").val("");
}

// 替换消息内容
function replaceMsgContent(content) {
    var regArr = [['\n', '<br>'],
        ['\\[微笑]', '<img src="/static/images/emo/emo_13.gif" />'],
        ['\\[可怜]', '<img src="/static/images/emo/emo_17.gif" />'],
        ['\\[大笑]', '<img src="/static/images/emo/emo_15.gif" />'],
        ['\\[调皮]', '<img src="/static/images/emo/emo_21.gif" />'],
        ['\\[饥饿]', '<img src="/static/images/emo/emo_41.gif" />'],
        ['\\[再见]', '<img src="/static/images/emo/emo_42.gif" />'],
        ['\\[互粉]', '<img src="/static/images/emo/emo_11.gif" />'],
        ['\\[鼓掌]', '<img src="/static/images/emo/emo_52.gif" />'],
        ['\\[呲牙]', '<img src="/static/images/emo/emo_14.gif" />'],
        ['\\[可爱]', '<img src="/static/images/emo/emo_16.gif" />'],
        ['\\[害羞]', '<img src="/static/images/emo/emo_20.gif" />'],
        ['\\[闭嘴]', '<img src="/static/images/emo/emo_22.gif" />'],
        ['\\[鄙视]', '<img src="/static/images/emo/emo_23.gif" />'],
        ['\\[示爱]', '<img src="/static/images/emo/emo_24.gif" />'],
        ['\\[大哭]', '<img src="/static/images/emo/emo_25.gif" />'],
        ['\\[偷笑]', '<img src="/static/images/emo/emo_26.gif" />'],
        ['\\[亲亲]', '<img src="/static/images/emo/emo_27.gif" />'],
        ['\\[冷]', '<img src="/static/images/emo/emo_28.gif" />'],
        ['\\[敲打]', '<img src="/static/images/emo/emo_29.gif" />'],
        ['\\[惊讶]', '<img src="/static/images/emo/emo_30.gif" />'],
        ['\\[左哼哼]', '<img src="/static/images/emo/emo_32.gif" />'],
        ['\\[右哼哼]', '<img src="/static/images/emo/emo_31.gif" />'],
        ['\\[嘘]', '<img src="/static/images/emo/emo_33.gif" />'],
        ['\\[衰]', '<img src="/static/images/emo/emo_34.gif" />'],
        ['\\[委屈]', '<img src="/static/images/emo/emo_35.gif" />'],
        ['\\[吐]', '<img src="/static/images/emo/emo_36.gif" />'],
        ['\\[困]', '<img src="/static/images/emo/emo_37.gif" />'],
        ['\\[快乐]', '<img src="/static/images/emo/emo_38.gif" />'],
        ['\\[怒]', '<img src="/static/images/emo/emo_39.gif" />'],
        ['\\[疑问]', '<img src="/static/images/emo/emo_40.gif" />'],
        ['\\[爆筋]', '<img src="/static/images/emo/emo_51.gif" />'],
        ['\\[晕]', '<img src="/static/images/emo/emo_53.gif" />'],
        ['\\[快哭了]', '<img src="/static/images/emo/emo_54.gif" />'],
        ['\\[抓狂]', '<img src="/static/images/emo/emo_55.gif" />'],
        ['\\[尴尬]', '<img src="/static/images/emo/emo_56.gif" />'],
        ['\\[阴险]', '<img src="/static/images/emo/emo_57.gif" />'],
        ['\\[骂]', '<img src="/static/images/emo/emo_58.gif" />'],
        ['\\[爱心]', '<img src="/static/images/emo/emo_59.gif" />'],
        ['\\[心碎]', '<img src="/static/images/emo/emo_60.gif" />'],
        ['\\[抠鼻]', '<img src="/static/images/emo/emo_18.gif" />'],
        ['\\[惊]', '<img src="/static/images/emo/emo_19.gif" />'],
        ['\\[考虑]', '<img src="/static/images/emo/emo_43.gif" />'],
        ['\\[流汗]', '<img src="/static/images/emo/emo_44.gif" />'],
        ['\\[哈欠]', '<img src="/static/images/emo/emo_45.gif" />'],
        ['\\[睡觉]', '<img src="/static/images/emo/emo_46.gif" />'],
        ['\\[贪财]', '<img src="/static/images/emo/emo_47.gif" />'],
        ['\\[无奈]', '<img src="/static/images/emo/emo_48.gif" />'],
        ['\\[得意]', '<img src="/static/images/emo/emo_49.gif" />'],
        ['\\[色]', '<img src="/static/images/emo/emo_50.gif" />'],
        ['\\[礼物]', '<img src="/static/images/emo/emo_12.gif" />'],
        ['\\[狗]', '<img src="/static/images/emo/emo_01.gif" />'],
        ['\\[神马]', '<img src="/static/images/emo/emo_02.gif" />'],
        ['\\[云]', '<img src="/static/images/emo/emo_03.gif" />'],
        ['\\[给力]', '<img src="/static/images/emo/emo_04.gif" />'],
        ['\\[团结]', '<img src="/static/images/emo/emo_05.gif" />'],
        ['\\[大V]', '<img src="/static/images/emo/emo_06.gif" />'],
        ['\\[熊猫]', '<img src="/static/images/emo/emo_07.gif" />'],
        ['\\[兔]', '<img src="/static/images/emo/emo_08.gif" />'],
        ['\\[奥特曼]', '<img src="/static/images/emo/emo_09.gif" />'],
        ['\\[囧]', '<img src="/static/images/emo/emo_10.gif" />']];

    for (var i = 0; i < regArr.length; i++) {
        content = content.replace(new RegExp(regArr[i][0], "g"), regArr[i][1]);
    }
    return content;
}

function log(obj) {
    console.log(obj);
}
