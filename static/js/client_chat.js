!function () {
    "use strict";

    // msg
    var new_msg_id = [],
        last_msg = '',
        get_old_msg = true,

        // el
        is_open_emo_panel = false,

        // data
        is_phone = !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i),
        staff_id = '',
        staff_name = '',
        client_id = '',
        access = ''

    $(function () {
        var dataElem = $('#data');
        staff_id = dataElem.attr('staff_id');
        staff_name = dataElem.attr('staff_name');
        client_id = dataElem.attr('client_id');
        access = dataElem.attr('access');


        init();

        // 点击发送
        $("#send").click(sendMsg);

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
            is_open_emo_panel = true;
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

    });


    var show_msg = new Vue({
        el: "#show-message",
        data: {
            messages: [],
            outMsgCount: 0
        },
        methods: {
            add: function (ojb) {

                // 过滤消息
                for (var i = 0; i < this.messages.length; i++) {
                    if (this.messages[i].id === ojb.id) {// 过滤
                        return;
                    }
                }

                this.messages.push(ojb);


                //二叉树排序
                var binaryTree = new BinaryTree();
                for (var i = 0; i < this.messages.length; i++) {
                    binaryTree.insert(this.messages[i]);//将数组元素插入二叉树
                }
                //中序遍历，传入回调函数
                var tempArr = [];
                binaryTree.inOrderTraverse(function (key) {
                    tempArr.push(key);
                });

                this.messages = tempArr;
                //二叉树结束


                this.$nextTick(function () {
                    // 将滚动条拉到底部
                    var showMessage = $("#show-message");
                    showMessage.scrollTop(showMessage[0].scrollHeight);
                })
            },
            display_time: function () {
                this.outMsgCount++;
                return this.outMsgCount % 3 == 0;
            }
        }
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

    // 关闭表情面板
    function closeEmoPanel() {
        if (is_open_emo_panel) {
            $("#emo-panel").hide();
            is_open_emo_panel = false;
        }
    }

    // 初始化
    function init() {
        show_msg.add({
            id: -2,
            type: 2,
            content: "系统：" + staff_name + "为您服务",
            time: ""
        });
    }

    // 发送消息 - 客户发送到客服
    function sendMsg() {

        closeEmoPanel();

        // 获取信息
        var content = getInputText();

        // 检查数据
        if (content == '' || staff_id.length < 5 ||
            staff_id.length > 14 || client_id.length != 40) {
            return;
        }

        setInputToEmpty();// 清空输入框

        var rContent = replaceMsgContent(content);// 替换信息内容

        // 发送
        $.post("/index.php/client/message/send", {
            staff_id: staff_id,
            client_id: client_id,
            content: rContent
        });
    }

    setInterval(get_data, 1000);// 轮询接收数据

    // 接收数据
    function get_data() {

        // 检查条件
        if (staff_id.length < 5 || staff_id.length > 14 || client_id.length != 40) {
            return;
        }

        var getType = 'n';// 只获取新记录
        if (get_old_msg) {
            getType = 'o';// 获取旧记录
            get_old_msg = false;
        }

        $.ajax({
            url: "/index.php/client/message/get/s/" + staff_id +
            "/c/" + client_id + "/t/" + getType + "/b/" + getBackMsgId(),
            type: "GET",
            dataType: "json",
            success: function (data) {
                input_data(data);
            }
        });
    }

    // 部署服务器端数据到客户端
    function input_data(data) {
        new_msg_id = [];
        if (data == null || data.length == 0) {// 数据空
            return;
        }

        for (var i = 0; i < data.length; i++) {
            new_msg_id.push(data[i].id);// 将新消息ID保存用于下次发送到服务器
            var time = data[i].send_time.split(" ");
            show_msg.add({
                id: parseInt(data[i].id),
                type: data[i].send_type,
                content: data[i].content,
                time: time[1]
            });
        }
    }

    // 获取反馈消息ID
    function getBackMsgId() {
        var ids = '';
        for (var i = 0; i < new_msg_id.length; i++) {
            ids += new_msg_id[i];
            if (i != new_msg_id.length - 1) {
                ids += ':';
            }
        }
        return ids;
    }

    // 获取输入框内容
    function getInputText() {
        return $.trim($("#edit").val());
    }

    // 清空输入区
    function setInputToEmpty() {
        last_msg = getInputText();
        $("#edit").val("");
    }

    function log(ojb) {
        console.log(ojb)
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

    if (is_phone) {
        setInterval(function () {
            updateMessageBoxHeight();
        }, 1000);
    }

    function updateMessageBoxHeight() {
        var h1 = $(window).height();//可视高度
        var h2 = $(document).height();//文档高度
        //取出最小的高度
        var _h = (h1 < h2 ? h1 : h2) - 124;
        $('#show-message').css('height', _h + 'px');
    }

}();
