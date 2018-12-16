<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:65:"D:\php-workspace\njim/tp5/application/client\view\index\pc_1.html";i:1544889351;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit"/>
    <title>咨询窗口</title>
    <link rel="stylesheet" href="/static/css/reset.css">
    <link rel="stylesheet" href="/static/css/pc_1.css">
    <link rel="stylesheet" href="/static/css/message.css">
    <script src="/static/js/jquery.js"></script>
    <script src="/static/js/vue.js"></script>
    <style type="text/css">
        .container .title-box {
            background: <?php echo $style['color']; ?>;
        }

        .container .bottom-box .send {
            border-color: <?php echo $style['color']; ?>;
            background: <?php echo $style['color']; ?>;
        }

        .container .bottom-box .send:hover {
            background: #fff;
            color: <?php echo $style['color']; ?>;
        }

        /* 消息 */
        .right .bubble {
            background: <?php echo $style['color']; ?>;
        }

        .right .arrow {
            border-left-color: <?php echo $style['color']; ?>;
        }
    </style>
</head>
<body>
<div id="on-line-staff" class="container">
    <!-- 顶部标题 -->
    <div class="title-box">
        <span class="title">柠吉在线客服</span>
    </div>

    <!-- 消息显示区 -->
    <ul id="show-message" class="message-box">
        <template v-for="item in messages">

            <!-- 时间 -->
            <template v-if="display_time()">
                <li class="system"><span class="bubble" v-html="item.time"></span></li>
            </template>

            <!-- 客服 -->
            <template
                    v-if="item.type==1">
                <li class="left" :data-id="item.id">
                    <div class="arrow"></div>
                    <div class="bubble" v-html="item.content"></div>
                    <div class="clear"></div>
                </li>
            </template>

            <!-- 客户 -->
            <template v-else-if="item.type==0">
                <li class="right" :data-id="item.id">
                    <div class="arrow"></div>
                    <div class="bubble" v-html="item.content"></div>
                    <div class="clear"></div>
                </li>
            </template>

            <!-- 系统 -->
            <template v-else-if="item.type==2">
                <li class="system" :data-id="item.id"><span class="bubble"
                                                            v-html="item.content"></span></li>
            </template>
        </template>
    </ul>
    <!-- 工具栏 -->
    <div class="tool-box">
        <!-- 表情 -->
        <div id="open-emo-panel" class="emo-icon"></div>
        <!-- 图片 -->
        <div class="pic-icon"></div>
        <!-- 评价 -->
        <div class="evaluate-icon"></div>
    </div>
    <div id="emo-panel" class="emo-panel">
        <div class="title">
            选择表情
            <div id="close-emo-panel" class="close-icon"></div>
        </div>
        <div id="emo-box" class="emo-box">
            <img title="[微笑]" src="/static/images/emo/emo_13.gif"/> <img
                title="[可怜]" src="/static/images/emo/emo_17.gif"/> <img
                title="[大笑]" src="/static/images/emo/emo_15.gif"/> <img
                title="[调皮]" src="/static/images/emo/emo_21.gif"/> <img
                title="[饥饿]" src="/static/images/emo/emo_41.gif"/> <img
                title="[再见]" src="/static/images/emo/emo_42.gif"/> <img
                title="[互粉]" src="/static/images/emo/emo_11.gif"/> <img
                title="[鼓掌]" src="/static/images/emo/emo_52.gif"/> <img
                title="[呲牙]" src="/static/images/emo/emo_14.gif"/> <img
                title="[可爱]" src="/static/images/emo/emo_16.gif"/> <img
                title="[害羞]" src="/static/images/emo/emo_20.gif"/> <img
                title="[闭嘴]" src="/static/images/emo/emo_22.gif"/> <img
                title="[鄙视]" src="/static/images/emo/emo_23.gif"/> <img
                title="[示爱]" src="/static/images/emo/emo_24.gif"/> <img
                title="[大哭]" src="/static/images/emo/emo_25.gif"/> <img
                title="[偷笑]" src="/static/images/emo/emo_26.gif"/> <img
                title="[亲亲]" src="/static/images/emo/emo_27.gif"/> <img
                title="[冷]" src="/static/images/emo/emo_28.gif"/> <img
                title="[敲打]" src="/static/images/emo/emo_29.gif"/> <img
                title="[惊讶]" src="/static/images/emo/emo_30.gif"/> <img
                title="[左哼哼]" src="/static/images/emo/emo_32.gif"/> <img
                title="[右哼哼]" src="/static/images/emo/emo_31.gif"/> <img
                title="[嘘]" src="/static/images/emo/emo_33.gif"/> <img
                title="[衰]" src="/static/images/emo/emo_34.gif"/> <img
                title="[委屈]" src="/static/images/emo/emo_35.gif"/> <img
                title="[吐]" src="/static/images/emo/emo_36.gif"/> <img
                title="[困]" src="/static/images/emo/emo_37.gif"/> <img
                title="[快乐]" src="/static/images/emo/emo_38.gif"/> <img
                title="[怒]" src="/static/images/emo/emo_39.gif"/> <img
                title="[疑问]" src="/static/images/emo/emo_40.gif"/> <img
                title="[爆筋]" src="/static/images/emo/emo_51.gif"/> <img
                title="[晕]" src="/static/images/emo/emo_53.gif"/> <img
                title="[快哭了]" src="/static/images/emo/emo_54.gif"/> <img
                title="[抓狂]" src="/static/images/emo/emo_55.gif"/> <img
                title="[尴尬]" src="/static/images/emo/emo_56.gif"/> <img
                title="[阴险]" src="/static/images/emo/emo_57.gif"/> <img
                title="[骂]" src="/static/images/emo/emo_58.gif"/> <img
                title="[爱心]" src="/static/images/emo/emo_59.gif"/> <img
                title="[心碎]" src="/static/images/emo/emo_60.gif"/> <img
                title="[抠鼻]" src="/static/images/emo/emo_18.gif"/> <img
                title="[惊]" src="/static/images/emo/emo_19.gif"/> <img
                title="[考虑]" src="/static/images/emo/emo_43.gif"/> <img
                title="[流汗]" src="/static/images/emo/emo_44.gif"/> <img
                title="[哈欠]" src="/static/images/emo/emo_45.gif"/> <img
                title="[睡觉]" src="/static/images/emo/emo_46.gif"/> <img
                title="[贪财]" src="/static/images/emo/emo_47.gif"/> <img
                title="[无奈]" src="/static/images/emo/emo_48.gif"/> <img
                title="[得意]" src="/static/images/emo/emo_49.gif"/> <img
                title="[色]" src="/static/images/emo/emo_50.gif"/> <img
                title="[礼物]" src="/static/images/emo/emo_12.gif"/> <img
                title="[狗]" src="/static/images/emo/emo_01.gif"/> <img
                title="[神马]" src="/static/images/emo/emo_02.gif"/> <img
                title="[云]" src="/static/images/emo/emo_03.gif"/> <img
                title="[给力]" src="/static/images/emo/emo_04.gif"/> <img
                title="[团结]" src="/static/images/emo/emo_05.gif"/> <img
                title="[大V]" src="/static/images/emo/emo_06.gif"/> <img
                title="[熊猫]" src="/static/images/emo/emo_07.gif"/> <img
                title="[兔]" src="/static/images/emo/emo_08.gif"/> <img
                title="[奥特曼]" src="/static/images/emo/emo_09.gif"/> <img
                title="[囧]" src="/static/images/emo/emo_10.gif"/>
        </div>
    </div>
    <!-- 输入区 -->
    <div class="input-box">
        <textarea id="edit" class="edit" placeholder="请输入您的问题（Ctrl+Enter发送）"></textarea>
    </div>
    <!-- 底栏 -->
    <div class="bottom-box">
        <span class="info">客服软件由柠吉IM免费提供</span>
        <button id="send" class="send">发送</button>
    </div>
</div>

<div id="data" staff_id="<?php echo $staff['user_name']; ?>" staff_name="<?php echo $staff['name']; ?>" client_id="<?php echo $client['client_id']; ?>"
     access="<?php echo $example['access']; ?>" style="display: none;"></div>
<script src="/static/js/client_pc.js"></script>
</body>
</html>