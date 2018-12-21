<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:67:"F:\phpStudy\WWW\njim/tp5/application/staff\view\example\update.html";i:1545377101;s:57:"F:\phpStudy\WWW\njim\tp5\application\staff\view\base.html";i:1545289220;s:63:"F:\phpStudy\WWW\njim\tp5\application\staff\view\left_admin.html";i:1545276348;}*/ ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>修改实例 - 客服控制台</title>
    <meta name="description" content="">
    <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <link rel="apple-touch-icon-precomposed" href="/static/assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI"/>
    <script src="/static/assets/js/echarts.min.js"></script>
    <link rel="stylesheet" href="/static/layui/css/layui.css">
    <link rel="stylesheet" href="/static/assets/css/amazeui.min.css"/>
    <link rel="stylesheet" href="/static/assets/css/amazeui.datatables.min.css"/>
    <link rel="stylesheet" href="/static/assets/css/app.css">
    <script src="/static/assets/js/jquery.min.js"></script>
</head>

<body data-type="index">
<script src="/static/assets/js/theme.js"></script>
<div class="am-g tpl-g">
    <!-- 头部 -->
    <header>
        <!-- logo -->
        <div class="am-fl tpl-header-logo">
            <a href="javascript:;"><img src="/static/assets/img/logo.png" alt=""></a>
        </div>
        <!-- 右侧内容 -->
        <div class="tpl-header-fluid">
            <!-- 侧边切换 -->
            <div class="am-fl tpl-header-switch-button am-icon-list">
                    <span>
                </span>
            </div>
            <!-- 搜索 -->
            <div class="am-fl tpl-header-search">
                <form class="tpl-header-search-form" action="javascript:;">
                    <button class="tpl-header-search-btn am-icon-search"></button>
                    <input class="tpl-header-search-box" type="text" placeholder="搜索内容...">
                </form>
            </div>
            <!-- 其它功能-->
            <div class="am-fr tpl-header-navbar">
                <ul>
                    <!-- 欢迎语 -->
                    <li class="am-text-sm tpl-header-navbar-welcome">
                        <a href="javascript:;">欢迎你，<span><?php echo $staff['name']; ?></span> </a>
                    </li>

                    <!-- 新邮件 -->
                    <li class="am-dropdown tpl-dropdown" data-am-dropdown>
                        <a href="javascript:;" class="am-dropdown-toggle tpl-dropdown-toggle" data-am-dropdown-toggle>
                            <i class="am-icon-envelope"></i>
                            <span class="am-badge am-badge-success am-round item-feed-badge">4</span>
                        </a>
                        <!-- 弹出列表 -->
                        <ul class="am-dropdown-content tpl-dropdown-content">
                            <li class="tpl-dropdown-menu-messages">
                                <a href="javascript:;" class="tpl-dropdown-menu-messages-item am-cf">
                                    <div class="menu-messages-ico">
                                        <img src="/static/assets/img/user04.png" alt="">
                                    </div>
                                    <div class="menu-messages-time">
                                        3小时前
                                    </div>
                                    <div class="menu-messages-content">
                                        <div class="menu-messages-content-title">
                                            <i class="am-icon-circle-o am-text-success"></i>
                                            <span>夕风色</span>
                                        </div>
                                        <div class="am-text-truncate"> Amaze UI 的诞生，依托于 GitHub 及其他技术社区上一些优秀的资源；Amaze UI
                                            的成长，则离不开用户的支持。
                                        </div>
                                        <div class="menu-messages-content-time">2016-09-21 下午 16:40</div>
                                    </div>
                                </a>
                            </li>

                            <li class="tpl-dropdown-menu-messages">
                                <a href="javascript:;" class="tpl-dropdown-menu-messages-item am-cf">
                                    <div class="menu-messages-ico">
                                        <img src="/static/assets/img/user02.png" alt="">
                                    </div>
                                    <div class="menu-messages-time">
                                        5天前
                                    </div>
                                    <div class="menu-messages-content">
                                        <div class="menu-messages-content-title">
                                            <i class="am-icon-circle-o am-text-warning"></i>
                                            <span>禁言小张</span>
                                        </div>
                                        <div class="am-text-truncate"> 为了能最准确的传达所描述的问题， 建议你在反馈时附上演示，方便我们理解。</div>
                                        <div class="menu-messages-content-time">2016-09-16 上午 09:23</div>
                                    </div>
                                </a>
                            </li>
                            <li class="tpl-dropdown-menu-messages">
                                <a href="javascript:;" class="tpl-dropdown-menu-messages-item am-cf">
                                    <i class="am-icon-circle-o"></i> 进入列表…
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- 新提示 -->
                    <li class="am-dropdown" data-am-dropdown>
                        <a href="javascript:;" class="am-dropdown-toggle" data-am-dropdown-toggle>
                            <i class="am-icon-bell"></i>
                            <span class="am-badge am-badge-warning am-round item-feed-badge">5</span>
                        </a>

                        <!-- 弹出列表 -->
                        <ul class="am-dropdown-content tpl-dropdown-content">
                            <li class="tpl-dropdown-menu-notifications">
                                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                                    <div class="tpl-dropdown-menu-notifications-title">
                                        <i class="am-icon-line-chart"></i>
                                        <span> 有6笔新的销售订单</span>
                                    </div>
                                    <div class="tpl-dropdown-menu-notifications-time">
                                        12分钟前
                                    </div>
                                </a>
                            </li>
                            <li class="tpl-dropdown-menu-notifications">
                                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                                    <div class="tpl-dropdown-menu-notifications-title">
                                        <i class="am-icon-star"></i>
                                        <span> 有3个来自人事部的消息</span>
                                    </div>
                                    <div class="tpl-dropdown-menu-notifications-time">
                                        30分钟前
                                    </div>
                                </a>
                            </li>
                            <li class="tpl-dropdown-menu-notifications">
                                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                                    <div class="tpl-dropdown-menu-notifications-title">
                                        <i class="am-icon-folder-o"></i>
                                        <span> 上午开会记录存档</span>
                                    </div>
                                    <div class="tpl-dropdown-menu-notifications-time">
                                        1天前
                                    </div>
                                </a>
                            </li>


                            <li class="tpl-dropdown-menu-notifications">
                                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                                    <i class="am-icon-bell"></i> 进入列表…
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- 退出 -->
                    <li class="am-text-sm">
                        <a href="/index.php/staff/login/logout">
                            <span class="am-icon-sign-out"></span> 退出
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    </header>
    <!-- 风格切换 -->
    <div class="tpl-skiner">
        <div class="tpl-skiner-toggle am-icon-cog">
        </div>
        <div class="tpl-skiner-content">
            <div class="tpl-skiner-content-title">
                选择主题
            </div>
            <div class="tpl-skiner-content-bar">
                <span class="skiner-color skiner-white" data-color="theme-white"></span>
                <span class="skiner-color skiner-black" data-color="theme-black"></span>
            </div>
        </div>
    </div>
    <!-- 侧边导航栏 -->
    <div class="left-sidebar">
    <!-- 用户信息 -->
    <div class="tpl-sidebar-user-panel">
        <div class="tpl-user-panel-slide-toggleable">
            <div class="tpl-user-panel-profile-picture">
                <img src="/static/assets/img/user04.png" alt="">
            </div>
            <span class="user-panel-logged-in-text">
              <i class="am-icon-circle-o am-text-success tpl-user-panel-status-icon"></i>
              <?php echo $staff['name']; ?>
          </span>
            <a href="javascript:;" class="tpl-user-panel-action-link"> <span class="am-icon-pencil"></span> 账号设置</a>
        </div>
    </div>

    <!-- 菜单 -->
    <ul class="sidebar-nav">
        <li class="sidebar-nav-heading">Components <span class="sidebar-nav-heading-info"> 附加组件</span></li>
        <li class="sidebar-nav-link">
            <a href="/index.php/staff/admin" <?php if($menu == 'index'): ?>class="active" <?php endif; ?>>
            <i class="am-icon-home sidebar-nav-link-logo"></i>控制台首页
            </a>
        </li>
        <li class="sidebar-nav-link">
            <a href="/index.php/staff">
                <i class="am-icon-table sidebar-nav-link-logo"></i>工作台
            </a>
        </li>
        <li class="sidebar-nav-link">
            <a href="/index.php/staff/Staff_Manage/index" <?php if($menu == 'staff_manage'): ?>class="active" <?php endif; ?>>
            <i class="am-icon-calendar sidebar-nav-link-logo"></i>客服管理
            </a>
        </li>
        <li class="sidebar-nav-link">
            <a href="/index.php/staff/example/index" <?php if($menu == 'example'): ?>class="active" <?php endif; ?>>
            <i class="am-icon-wpforms sidebar-nav-link-logo"></i>实例管理
            </a>
        </li>

    </ul>
</div>

    <!-- 内容区域 -->
    
<div class="tpl-content-wrapper">
    <div class="container-fluid am-cf">
        <div class="row">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-9">
                <div class="page-header-heading"><span class="am-icon-home page-header-heading-icon"></span> 设置实例
                    <small>Set example</small>
                </div>
                <p class="page-header-description">皮肤，邀请功能，参与客服等相关参数设置。</p>
            </div>
            <div class="am-u-lg-3 tpl-index-settings-button">
                <button type="button" class="page-header-button"><span class="am-icon-paint-brush"></span> 设置
                </button>
            </div>
        </div>
    </div>

    <div class="row-content am-cf">
        <div class="row">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                <div class="widget am-cf">
                    <div class="widget-head am-cf">
                        <div class="widget-title am-fl">请设置以下参数</div>
                        <div class="widget-function am-fr">
                            <a href="javascript:;" class="am-icon-cog"></a>
                        </div>
                    </div>
                    <div class="widget-body am-fr">
                        <form class="am-form tpl-form-border-form tpl-form-border-br" onsubmit="return false">
                            <input type="hidden" id="id" value="<?php echo $example['id']; ?>">
                            <div class="am-tabs" data-am-tabs="{noSwipe: 1}">
                                <ul class="am-tabs-nav am-nav am-nav-tabs">
                                    <li class="am-active"><a href="#tab1">基本</a></li>
                                    <li><a href="#tab2">皮肤</a></li>
                                    <li><a href="#tab3">邀请</a></li>
                                    <li><a href="#tab4">客服</a></li>
                                </ul>
                                <div class="am-tabs-bd">
                                    <div class="am-tab-panel am-fade am-in am-active" id="tab1">

                                        <div class="am-form-group">
                                            <label class="am-u-sm-3 am-form-label">启用实例</label>
                                            <div class="am-u-sm-9">
                                                <div class="tpl-switch">
                                                    <input type="checkbox" id="example-switch"
                                                           class="ios-switch bigswitch tpl-switch-btn"
                                                           <?php if($example['state'] == '1'): ?>checked<?php endif; ?>>
                                                    <div class="tpl-switch-btn-view">
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="am-form-group">
                                            <label class="am-u-sm-3 am-form-label">实例名称</label>
                                            <div class="am-u-sm-9">
                                                <input type="text" class="tpl-form-input" id="example-name"
                                                       placeholder="请输入实例名称" value="<?php echo $example['name']; ?>">
                                            </div>
                                        </div>

                                        <div class="am-form-group">
                                            <label class="am-u-sm-3 am-form-label">描述</label>
                                            <div class="am-u-sm-9">
                                                    <textarea class="" rows="10" id="description"
                                                              placeholder="请输入描述内容"><?php echo $example['description']; ?></textarea>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="am-tab-panel am-fade" id="tab2">

                                        <div class="am-tabs" data-am-tabs="{noSwipe: 1}">
                                            <ul class="am-tabs-nav am-nav am-nav-tabs">
                                                <li class="am-active"><a href="#tab21">PC端</a></li>
                                                <li><a href="#tab22">移动端</a></li>
                                            </ul>

                                            <div class="am-tabs-bd">
                                                <div class="am-tab-panel am-fade am-in am-active" id="tab21">

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">主题色</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="color" value="<?php echo $example['color']; ?>"
                                                                   placeholder="请输入十六进制颜色值">
                                                            <small>请填写十六进制颜色值，如：#1c97f5</small>
                                                        </div>
                                                    </div>
                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">挂件代码</label>
                                                        <div class="am-u-sm-9">
                                                                <textarea id="icon-code" rows="10"
                                                                          placeholder="请输入HTML内容"><?php echo $example['icon_code']; ?></textarea>
                                                            <div class="am-margin-top-sm">
                                                                <button type="button"
                                                                        class="am-btn am-btn-primary am-btn-xs">
                                                                    <i class="am-icon-code"></i>
                                                                    默认代码
                                                                </button>
                                                                <button type="button"
                                                                        class="am-btn am-btn-success am-btn-xs am-margin-left-xs">
                                                                    <i class="am-icon-pencil"></i>
                                                                    编写说明
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">邀请框代码</label>
                                                        <div class="am-u-sm-9">
                                                                <textarea id="invitation-code" rows="10"
                                                                          placeholder="请输入HTML内容"><?php echo $example['invitation_code']; ?></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="am-tab-panel am-fade" id="tab22">


                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">主题色</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="color-m" value="<?php echo $example['color_m']; ?>"
                                                                   placeholder="请输入十六进制颜色值">
                                                            <small>请填写十六进制颜色值，如：#1c97f5</small>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">挂件代码</label>
                                                        <div class="am-u-sm-9">
                                                                <textarea id="icon-code-m" rows="10"
                                                                          placeholder="请输入HTML内容"><?php echo $example['icon_code_m']; ?></textarea>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">邀请框代码</label>
                                                        <div class="am-u-sm-9">
                                                                <textarea id="invitation-code-m" rows="10"
                                                                          placeholder="请输入HTML内容"><?php echo $example['invitation_code_m']; ?></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div class="am-tab-panel am-fade" id="tab3">

                                        <div class="am-tabs" data-am-tabs="{noSwipe: 1}">
                                            <ul class="am-tabs-nav am-nav am-nav-tabs">
                                                <li class="am-active"><a href="#tab31">PC端</a></li>
                                                <li><a href="#tab32">移动端</a></li>
                                            </ul>

                                            <div class="am-tabs-bd">
                                                <div class="am-tab-panel am-fade am-in am-active" id="tab31">


                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">启用邀请</label>
                                                        <div class="am-u-sm-9">
                                                            <div class="tpl-switch">
                                                                <input type="checkbox" id="invitation-switch"
                                                                       class="ios-switch bigswitch tpl-switch-btn"
                                                                       <?php if($example['invitation_switch'] == '1'): ?>checked<?php endif; ?>>
                                                                <div class="tpl-switch-btn-view">
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">星期范围</label>
                                                        <div class="am-u-sm-9">
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="7"
                                                                       class="invitation-week-checkbox"
                                                                       name="invitation_week"
                                                                       <?php if(is_array($example['invitation_week']) || $example['invitation_week'] instanceof \think\Collection || $example['invitation_week'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '7'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周日
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="1"
                                                                       class="invitation-week-checkbox"
                                                                       name="invitation_week"
                                                                       <?php if(is_array($example['invitation_week']) || $example['invitation_week'] instanceof \think\Collection || $example['invitation_week'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '1'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周一
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="2"
                                                                       class="invitation-week-checkbox"
                                                                       name="invitation_week"
                                                                       <?php if(is_array($example['invitation_week']) || $example['invitation_week'] instanceof \think\Collection || $example['invitation_week'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '2'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周二
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="3"
                                                                       class="invitation-week-checkbox"
                                                                       name="invitation_week"
                                                                       <?php if(is_array($example['invitation_week']) || $example['invitation_week'] instanceof \think\Collection || $example['invitation_week'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '3'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周三
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="4"
                                                                       class="invitation-week-checkbox"
                                                                       name="invitation_week"
                                                                       <?php if(is_array($example['invitation_week']) || $example['invitation_week'] instanceof \think\Collection || $example['invitation_week'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '4'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周四
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="5"
                                                                       class="invitation-week-checkbox"
                                                                       name="invitation_week"
                                                                       <?php if(is_array($example['invitation_week']) || $example['invitation_week'] instanceof \think\Collection || $example['invitation_week'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '5'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周五
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="6"
                                                                       class="invitation-week-checkbox"
                                                                       name="invitation_week"
                                                                       <?php if(is_array($example['invitation_week']) || $example['invitation_week'] instanceof \think\Collection || $example['invitation_week'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '6'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周六
                                                            </label>

                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">时间范围</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-time" placeholder="请输入时间范围"
                                                                   value="<?php echo $example['invitation_time']; ?>">
                                                            <small>在某个时间段内发起邀请，请填写有效的时间范围，格式：00:00:00-23:59:59</small>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">邀请次数</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-num" placeholder="请输入正整数"
                                                                   value="<?php echo $example['invitation_num']; ?>">
                                                            <small>邀请次数达到设定值后不再邀请，如果不限制请输入：0</small>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">首次邀请延迟</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-first" placeholder="请输入正整数"
                                                                   value="<?php echo $example['invitation_first']; ?>">
                                                            <small>延迟多少秒发起第一次邀请？</small>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">后续邀请延迟</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-after" placeholder="请输入正整数"
                                                                   value="<?php echo $example['invitation_after']; ?>">
                                                            <small>首次邀请除外，之后的邀请需要延迟多少秒？</small>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">自动关闭延迟</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-auto-close" placeholder="请输入正整数"
                                                                   value="<?php echo $example['invitation_auto_close']; ?>">
                                                            <small>向访客发起邀请后，如果访客没有响应，在多少秒后自动关闭邀请框？如果不关闭请输入：0</small>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="am-tab-panel am-fade" id="tab32">

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">启用邀请</label>
                                                        <div class="am-u-sm-9">
                                                            <div class="tpl-switch">
                                                                <input type="checkbox" id="invitation-switch-m"
                                                                       class="ios-switch bigswitch tpl-switch-btn"
                                                                       <?php if($example['invitation_switch_m'] == '1'): ?>checked<?php endif; ?>>
                                                                <div class="tpl-switch-btn-view">
                                                                    <div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">星期范围</label>
                                                        <div class="am-u-sm-9">
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="7"
                                                                       class="invitation-week-m-checkbox"
                                                                       name="invitation_week_m"
                                                                       <?php if(is_array($example['invitation_week_m']) || $example['invitation_week_m'] instanceof \think\Collection || $example['invitation_week_m'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week_m'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '7'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周日
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="1"
                                                                       class="invitation-week-m-checkbox"
                                                                       name="invitation_week_m"
                                                                       <?php if(is_array($example['invitation_week_m']) || $example['invitation_week_m'] instanceof \think\Collection || $example['invitation_week_m'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week_m'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '1'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周一
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="2"
                                                                       class="invitation-week-m-checkbox"
                                                                       name="invitation_week_m"
                                                                       <?php if(is_array($example['invitation_week_m']) || $example['invitation_week_m'] instanceof \think\Collection || $example['invitation_week_m'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week_m'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '2'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周二
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="3"
                                                                       class="invitation-week-m-checkbox"
                                                                       name="invitation_week_m"
                                                                       <?php if(is_array($example['invitation_week_m']) || $example['invitation_week_m'] instanceof \think\Collection || $example['invitation_week_m'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week_m'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '3'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周三
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="4"
                                                                       class="invitation-week-m-checkbox"
                                                                       name="invitation_week_m"
                                                                       <?php if(is_array($example['invitation_week_m']) || $example['invitation_week_m'] instanceof \think\Collection || $example['invitation_week_m'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week_m'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '4'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周四
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="5"
                                                                       class="invitation-week-m-checkbox"
                                                                       name="invitation_week_m"
                                                                       <?php if(is_array($example['invitation_week_m']) || $example['invitation_week_m'] instanceof \think\Collection || $example['invitation_week_m'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week_m'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '5'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周五
                                                            </label>
                                                            <label class="am-checkbox-inline">
                                                                <input type="checkbox" value="6"
                                                                       class="invitation-week-m-checkbox"
                                                                       name="invitation_week_m"
                                                                       <?php if(is_array($example['invitation_week_m']) || $example['invitation_week_m'] instanceof \think\Collection || $example['invitation_week_m'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['invitation_week_m'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;if($vo == '6'): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>周六
                                                            </label>

                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">时间范围</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-time-m" placeholder="请输入时间范围"
                                                                   value="<?php echo $example['invitation_time_m']; ?>">
                                                            <small>在某个时间段内发起邀请，请填写有效的时间范围，格式：00:00:00-23:59:59</small>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">邀请次数</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-num-m" placeholder="请输入正整数"
                                                                   value="<?php echo $example['invitation_num_m']; ?>">
                                                            <small>邀请次数达到设定值后不再邀请，如果不限制请输入：0</small>
                                                        </div>
                                                    </div>


                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">首次邀请延迟</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-first-m" placeholder="请输入正整数"
                                                                   value="<?php echo $example['invitation_first_m']; ?>">
                                                            <small>延迟多少秒发起第一次邀请？</small>
                                                        </div>
                                                    </div>

                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">后续邀请延迟</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-after-m" placeholder="请输入正整数"
                                                                   value="<?php echo $example['invitation_after_m']; ?>">
                                                            <small>首次邀请除外，之后的邀请需要延迟多少秒？</small>
                                                        </div>
                                                    </div>
                                                    <div class="am-form-group">
                                                        <label
                                                                class="am-u-sm-3 am-form-label">自动关闭延迟</label>
                                                        <div class="am-u-sm-9">
                                                            <input type="text" class="tpl-form-input"
                                                                   id="invitation-auto-close-m" placeholder="请输入正整数"
                                                                   value="<?php echo $example['invitation_auto_close_m']; ?>">
                                                            <small>向访客发起邀请后，如果访客没有响应，在多少秒后自动关闭邀请框？如果不关闭请输入：0</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="am-tab-panel am-fade" id="tab4">
                                        <div class="am-form-group">
                                            <label class="am-u-sm-3 am-form-label">选择客服</label>
                                            <div class="am-u-sm-9">
                                                <table class="am-table am-table-bordered" style="margin-bottom: 0;">
                                                    <thead>
                                                    <tr>
                                                        <th width="30"></th>
                                                        <th width="80">编号</th>
                                                        <th width="160">用户名</th>
                                                        <th>客服名称</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <?php if(is_array($staff_list) || $staff_list instanceof \think\Collection || $staff_list instanceof \think\Paginator): $i = 0; $__LIST__ = $staff_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
                                                    <tr>
                                                        <td><input type="checkbox" value="<?php echo $vo['id']; ?>"
                                                                   class="staff-list-checkbox" name="staff_pk"
                                                                   <?php if(is_array($example['staff_pk']) || $example['staff_pk'] instanceof \think\Collection || $example['staff_pk'] instanceof \think\Paginator): $i = 0; $__LIST__ = $example['staff_pk'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v2): $mod = ($i % 2 );++$i;if($v2 == $vo['id']): ?>checked<?php endif; endforeach; endif; else: echo "" ;endif; ?>>
                                                        </td>
                                                        <td><?php echo $vo['id']; ?></td>
                                                        <td><?php echo $vo['user_name']; ?></td>
                                                        <td><?php echo $vo['name']; ?></td>
                                                    </tr>
                                                    <?php endforeach; endif; else: echo "" ;endif; ?>
                                                    </tbody>
                                                </table>
                                                <small>
                                                    被勾选的客服才能参与该实例的工作任务
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/static/layui/layui.js"></script>
<script src="/static/js/example_update.js"></script>

</div>
<script src="/static/assets/js/amazeui.min.js"></script>
<script src="/static/assets/js/amazeui.datatables.min.js"></script>
<script src="/static/assets/js/dataTables.responsive.min.js"></script>
<script src="/static/assets/js/app.js"></script>
</body>
</html>