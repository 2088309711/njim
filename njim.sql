# Host: localhost  (Version 5.5.53)
# Date: 2019-03-11 15:25:04
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "im_example"
#

DROP TABLE IF EXISTS `im_example`;
CREATE TABLE `im_example` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` int(1) NOT NULL DEFAULT '1' COMMENT '实例功能：1=启用，0=禁用',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '实例名',
  `phone` varchar(20) NOT NULL DEFAULT '' COMMENT '手机号，移动端可拨打',
  `user_name` varchar(50) NOT NULL DEFAULT '' COMMENT '负责人',
  `access` varchar(30) NOT NULL DEFAULT '' COMMENT '接入口',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  `description` text NOT NULL COMMENT '实例描述',
  `staff_pk` text NOT NULL COMMENT '可接入的客服，主键，分割符 |',
  `invitation_switch` int(1) NOT NULL DEFAULT '0' COMMENT '邀请功能：1=启用，0=禁用',
  `invitation_switch_m` int(1) NOT NULL DEFAULT '0' COMMENT '手机邀请功能：1=打开，0=关闭',
  `invitation_first` int(6) NOT NULL DEFAULT '10' COMMENT '首次邀请延迟，默认10秒',
  `invitation_first_m` int(6) NOT NULL DEFAULT '10' COMMENT '手机首次邀请延迟，默认10秒',
  `invitation_after` int(6) NOT NULL DEFAULT '20' COMMENT '后续邀请延迟，默认20秒',
  `invitation_after_m` int(6) NOT NULL DEFAULT '20' COMMENT '手机后续邀请延迟，默认20秒',
  `invitation_num` int(11) NOT NULL DEFAULT '0' COMMENT '邀请次数，0=不限制',
  `invitation_num_m` int(11) NOT NULL DEFAULT '0' COMMENT '手机邀请次数，0=不限制',
  `invitation_time` varchar(20) NOT NULL DEFAULT '' COMMENT '时间范围内邀请',
  `invitation_time_m` varchar(20) NOT NULL DEFAULT '' COMMENT '手机时间范围内邀请',
  `invitation_week` varchar(20) NOT NULL DEFAULT '' COMMENT '星期范围，周一至周末(1-7)，分割符 |',
  `invitation_week_m` varchar(20) NOT NULL DEFAULT '' COMMENT '手机星期范围，周一至周末(1-7)，分割符 |',
  `invitation_auto_close` int(11) NOT NULL DEFAULT '0' COMMENT '自动关闭邀请延迟，0=不限制',
  `invitation_auto_close_m` int(11) NOT NULL DEFAULT '0' COMMENT '手机自动关闭邀请延迟，0=不限制',
  `color` varchar(7) NOT NULL DEFAULT '' COMMENT '主题色',
  `color_m` varchar(7) NOT NULL DEFAULT '' COMMENT '手机主题色',
  `icon_code` text NOT NULL COMMENT '挂件代码',
  `icon_code_m` text NOT NULL COMMENT '手机挂件代码',
  `invitation_code` text NOT NULL COMMENT '邀请框代码',
  `invitation_code_m` text NOT NULL COMMENT '手机邀请框代码',
  `robot` int(1) NOT NULL DEFAULT '1' COMMENT '机器人，启用=1，禁用=0',
  `public_corpus` int(1) NOT NULL DEFAULT '1' COMMENT '公共语料库，启用=1，禁用=0',
  `robot_name` varchar(20) NOT NULL DEFAULT '' COMMENT '机器人名字',
  `welcome` text NOT NULL COMMENT '欢迎语',
  PRIMARY KEY (`id`),
  UNIQUE KEY `access` (`access`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COMMENT='实例';

#
# Data for table "im_example"
#

/*!40000 ALTER TABLE `im_example` DISABLE KEYS */;
INSERT INTO `im_example` VALUES (11,1,'测试实例','17602373802','2088309711','5c1d0e79ecd6f',1545408121,1552009391,'系统自动填写的实例，请根据实际需求修改。','18',1,1,2,2,1,1,3,3,'00:00:00-23:59:59','00:00:00-23:59:59','7|1|2|3|4|5|6','7|1|2|3|4|5|6',3,3,'#aaaaaa','#dddddd','<div id=\"njim_open_click\" style=\"width:80px; height:80px; position:fixed; bottom:50px; right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;\"><img src=\"http://serve.njim.vip/static/images/staff-icon.png\" style=\"position:absolute; top:13px; left:14px; width:50px; margin:0; padding:0;\"/><span style=\"position:absolute; bottom:6px; color:#fff; text-align:center; width:100%; font:15px \'宋体\'; margin:0; padding:0;\">在线客服</span></div>','<div id=\"njim_open_click\" style=\"width:50px; height:50px; position:fixed; top:80px; right:10px; background:{njim:color}; border-radius: 25px; margin:0; padding:0;\"><img src=\"http://serve.njim.vip/static/images/staff-icon.png\" style=\"position:absolute; top:16px; left:10px; width:30px; margin:0; padding:0;\"/></div>','<div style=\"width: 340px; height: 200px; background: #282828 url(http://serve.njim.vip/static/images/invitation.jpg) no-repeat;position: fixed; top:50%; left:50%; margin: -100px 0 0 -170px;\"><div style=\"position: absolute;bottom: 5px;right: 5px;\"><button id=\"njim_invitation_open_chat\" style=\"float: left; margin: 5px; border: 1px solid #b3a800;background: #fff000; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">现在咨询</button><button id=\"njim_invitation_continue\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">稍后再说</button><button id=\"njim_invitation_close\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">不在提示</button></div></div>','<div style=\"width: 100%; height: 200px; background: #00bdff; position: fixed; top:0; left:0;\"><div id=\"njim_invitation_icon\" style=\"background: url(http://serve.njim.vip/static/images/icon-desktop.png) -24px -150px no-repeat; width: 16px; height: 16px; position: absolute; top:10px; right:10px;\"></div><div style=\"color:#fff; font: 20px \'微软雅黑\'; text-align: center; margin-top: 80px;\">搜索百遍？不如咨询一遍！</div><div style=\"position: absolute;bottom: 5px;right: 5px;\"><button id=\"njim_invitation_open_chat\" style=\"float: left; margin: 5px; border: 1px solid #fff;background: #fff; padding: 3px 10px; font:12px \'宋体\'; color: #007cff;\">现在咨询</button><button id=\"njim_invitation_continue\"style=\"float: left; margin: 5px; border: 1px solid #fff;background: #00bdff; padding: 3px 10px; font:12px \'宋体\'; color: #fff;\">稍后再说</button><button id=\"njim_invitation_close\" style=\"float: left; margin: 5px; border: 1px solid #fff;background: #00bdff; padding: 3px 10px; font:12px \'宋体\'; color: #fff;\">不在提示</button></div></div>',0,1,'33333','4444');
/*!40000 ALTER TABLE `im_example` ENABLE KEYS */;

#
# Structure for table "im_example_corpus"
#

DROP TABLE IF EXISTS `im_example_corpus`;
CREATE TABLE `im_example_corpus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '标题',
  `ask` text NOT NULL COMMENT '问题',
  `text` text NOT NULL COMMENT '回复内容',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `example_id` int(11) NOT NULL DEFAULT '0' COMMENT '实例ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED COMMENT='语库组';

#
# Data for table "im_example_corpus"
#

/*!40000 ALTER TABLE `im_example_corpus` DISABLE KEYS */;
INSERT INTO `im_example_corpus` VALUES (39,'1232','1232@06#2@06#3','4@06#5@06#6@06#16516',1551921426,1551924688,11),(40,'1111','1111@06#2222@06#3333@06#4444@06#5555','111@06#222@06#333@06#444@06#555',1551922199,1551924510,11),(41,'111','111','111@06#222@06#333@06#444@06#555@06#你好',1551923360,1551923360,11),(42,'444','444@06#555@06#6665','111@06#222@06#333',1551923392,1551924574,11);
/*!40000 ALTER TABLE `im_example_corpus` ENABLE KEYS */;

#
# Structure for table "im_example_style"
#

DROP TABLE IF EXISTS `im_example_style`;
CREATE TABLE `im_example_style` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '样式名',
  `user_name` varchar(50) NOT NULL DEFAULT '' COMMENT '负责人',
  `color` varchar(7) NOT NULL DEFAULT '' COMMENT '主题色',
  `color_m` varchar(7) NOT NULL DEFAULT '' COMMENT '主题色，手机',
  `icon_code` text NOT NULL COMMENT '挂件代码',
  `icon_code_m` text NOT NULL COMMENT '挂件代码，手机',
  `invitation_code` text NOT NULL COMMENT '邀请框代码',
  `invitation_code_m` text NOT NULL COMMENT '邀请框代码，手机',
  `style_type` int(1) NOT NULL DEFAULT '0' COMMENT '官方样式=1，用户样式=2',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  `description` text NOT NULL COMMENT '样式描述',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='实例样式';

#
# Data for table "im_example_style"
#

/*!40000 ALTER TABLE `im_example_style` DISABLE KEYS */;
INSERT INTO `im_example_style` VALUES (4,'test','2088309711','#eeeeee','','<div id=\"njim_open_click\" style=\"width:80px; height:80px; position:fixed; bottom:50px; right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;\"><img src=\"http://njim.com/static/images/staff-icon.png\" style=\"position:absolute; top:13px; left:14px; width:50px; margin:0; padding:0;\"/><span style=\"position:absolute; bottom:6px; color:#fff; text-align:center; width:100%; font:15px \'宋体\'; margin:0; padding:0;\">在线客服</span></div>','','<div style=\"width: 340px; height: 200px; background: #282828 url(http://njim.com/static/images/invitation.jpg) no-repeat;position: fixed; top:50%; left:50%; margin: -100px 0 0 -170px;\"><div style=\"position: absolute;bottom: 5px;right: 5px;\"><button id=\"njim_invitation_open_chat\" style=\"float: left; margin: 5px; border: 1px solid #b3a800;background: #fff000; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">现在咨询</button><button id=\"njim_invitation_continue\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">稍后再说</button><button id=\"njim_invitation_close\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">不在提示</button></div></div>','',2,1542248439,1543570855,'000'),(6,'002','2088309711','#eeeeee','','<div id=\"njim_open_click\" style=\"width:80px; height:80px; position:fixed; bottom:50px; right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;\"><img src=\"http://njim.com/static/images/staff-icon.png\" style=\"position:absolute; top:13px; left:14px; width:50px; margin:0; padding:0;\"/><span style=\"position:absolute; bottom:6px; color:#fff; text-align:center; width:100%; font:15px \'宋体\'; margin:0; padding:0;\">在线客服</span></div>','','','',2,1543050772,1543054856,'和规范化股份');
/*!40000 ALTER TABLE `im_example_style` ENABLE KEYS */;

#
# Structure for table "im_msg"
#

DROP TABLE IF EXISTS `im_msg`;
CREATE TABLE `im_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(50) NOT NULL DEFAULT '' COMMENT '客户ID',
  `staff_id` varchar(20) NOT NULL DEFAULT '' COMMENT '客服ID',
  `content` text NOT NULL COMMENT '信息内容',
  `send_type` int(1) NOT NULL DEFAULT '0' COMMENT '客户发送=0，客服发送=1，系统消息=2，机器人发送=3',
  `s_get` int(1) NOT NULL DEFAULT '0' COMMENT '客服收到=1，没收到=0',
  `c_get` int(1) NOT NULL DEFAULT '0' COMMENT '客户收到=1，没收到=0',
  `s_read` int(1) NOT NULL DEFAULT '0' COMMENT '客服已读=1，未读=0',
  `c_read` int(1) NOT NULL DEFAULT '0' COMMENT '客户已读=1，未读=0',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=374 DEFAULT CHARSET=utf8;

#
# Data for table "im_msg"
#

/*!40000 ALTER TABLE `im_msg` DISABLE KEYS */;
INSERT INTO `im_msg` VALUES (176,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552035989,1552271912),(177,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552035989,1552271912),(178,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','fsdf',0,0,1,0,1,1552036428,1552271912),(179,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552036428,1552271912),(180,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','fsdfsdf',0,0,1,0,1,1552271915,1552271917),(181,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552271915,1552271917),(182,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','safds',0,0,1,0,1,1552271960,1552271961),(183,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552271960,1552271961),(184,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','fsdf',0,0,1,0,1,1552271970,1552271972),(185,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552271970,1552271972),(186,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','fsdf',0,0,1,0,1,1552271990,1552271992),(187,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552271990,1552271992),(188,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','fsd',0,0,1,0,1,1552272304,1552272306),(189,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552272305,1552272306),(190,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','fsdf',0,0,1,0,1,1552273120,1552273122),(191,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552273120,1552273122),(192,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','fsdf',0,0,1,0,1,1552273141,1552273142),(193,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552273141,1552273142),(194,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','dsfd',0,0,1,0,1,1552273251,1552273253),(195,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552273251,1552273253),(196,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','dsdf',0,0,1,0,1,1552273439,1552273441),(197,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552273439,1552273441),(198,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','fsd',0,0,1,0,1,1552273602,1552273604),(199,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552273602,1552273604),(200,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552273611,1552273613),(201,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552273611,1552273613),(202,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552273992,1552273994),(203,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552273992,1552273994),(204,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274073,1552274075),(205,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552274073,1552274075),(206,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274116,1552274118),(207,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552274116,1552274118),(208,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274348,1552274349),(209,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552274348,1552274349),(210,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274366,1552274368),(211,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552274366,1552274368),(212,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274380,1552274382),(213,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552274380,1552274382),(214,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274573,1552274574),(215,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274610,1552274612),(216,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552274611,1552274612),(217,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274623,1552274625),(218,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552274623,1552274625),(219,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274648,1552274650),(220,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274667,1552274669),(221,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','',2,0,1,0,0,1552274667,1552274669),(222,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274681,1552274683),(223,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','',2,0,1,0,0,1552274681,1552274683),(224,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274688,1552274690),(225,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','',2,0,1,0,0,1552274688,1552274690),(226,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274694,1552274696),(227,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','',2,0,1,0,0,1552274694,1552274696),(228,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274751,1552274753),(229,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','机器人发送的内容',2,0,1,0,0,1552274751,1552274753),(230,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274958,1552274960),(231,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','1',2,0,1,0,0,1552274958,1552274960),(232,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552274970,1552274972),(233,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','2',2,0,1,0,0,1552274970,1552274972),(234,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','1919616',0,0,1,0,1,1552275358,1552275360),(235,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','',2,0,1,0,0,1552275358,1552275360),(236,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275501,1552275502),(237,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','4',2,0,1,0,0,1552275501,1552275502),(238,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275503,1552275505),(239,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275541,1552275543),(240,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','4',2,0,1,0,0,1552275541,1552275543),(241,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275544,1552275546),(242,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','2',2,0,1,0,0,1552275544,1552275546),(243,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275547,1552275548),(244,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275619,1552275621),(245,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','4',2,0,1,0,0,1552275619,1552275621),(246,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275625,1552275627),(247,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','1111',0,0,1,0,1,1552275660,1552275662),(248,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275671,1552275673),(249,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','3',2,0,1,0,0,1552275671,1552275673),(250,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275676,1552275678),(251,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','1',2,0,1,0,0,1552275676,1552275678),(252,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275683,1552275685),(253,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275749,1552275751),(254,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','2',2,0,1,0,0,1552275749,1552275751),(255,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275873,1552275875),(256,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275889,1552275891),(257,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552275894,1552275895),(258,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','4',2,0,1,0,0,1552275894,1552275895),(259,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276082,1552276083),(260,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552276082,1552276083),(261,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276085,1552276087),(262,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552276085,1552276087),(263,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276088,1552276090),(264,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552276088,1552276090),(265,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276093,1552276095),(266,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552276093,1552276095),(267,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276100,1552276102),(268,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276100,1552276102),(269,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276103,1552276105),(270,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276128,1552276129),(271,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276128,1552276129),(272,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276130,1552276132),(273,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552276130,1552276132),(274,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276132,1552276134),(275,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','333',2,0,1,0,0,1552276132,1552276134),(276,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276134,1552276136),(277,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','333',2,0,1,0,0,1552276134,1552276136),(278,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276137,1552276138),(279,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276137,1552276138),(280,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276138,1552276140),(281,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','333',2,0,1,0,0,1552276138,1552276140),(282,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276140,1552276142),(283,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276140,1552276142),(284,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276142,1552276144),(285,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','222',2,0,1,0,0,1552276142,1552276144),(286,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276144,1552276146),(287,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','222',2,0,1,0,0,1552276144,1552276146),(288,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276146,1552276148),(289,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276146,1552276148),(290,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276148,1552276150),(291,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276149,1552276150),(292,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276151,1552276152),(293,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','222',2,0,1,0,0,1552276151,1552276152),(294,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276152,1552276154),(295,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','222',2,0,1,0,0,1552276152,1552276154),(296,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276155,1552276156),(297,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552276155,1552276156),(298,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276157,1552276159),(299,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276157,1552276159),(300,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276160,1552276162),(301,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276160,1552276162),(302,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276163,1552276165),(303,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276163,1552276165),(304,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276166,1552276167),(305,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552276166,1552276167),(306,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276168,1552276170),(307,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276168,1552276170),(308,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276171,1552276173),(309,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276171,1552276173),(310,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276175,1552276176),(311,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276175,1552276176),(312,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276177,1552276179),(313,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552276177,1552276179),(314,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276179,1552276181),(315,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276179,1552276181),(316,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276182,1552276183),(317,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276182,1552276183),(318,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276184,1552276186),(319,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276184,1552276186),(320,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276230,1552276232),(321,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276230,1552276232),(322,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276232,1552276234),(323,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276233,1552276234),(324,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276235,1552276236),(325,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','222',2,0,1,0,0,1552276235,1552276236),(326,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','1111',0,0,1,0,1,1552276237,1552276239),(327,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','333',2,0,1,0,0,1552276237,1552276239),(328,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276240,1552276242),(329,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','333',2,0,1,0,0,1552276240,1552276242),(330,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276242,1552276244),(331,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','333',2,0,1,0,0,1552276242,1552276244),(332,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276245,1552276246),(333,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','222',2,0,1,0,0,1552276245,1552276246),(334,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276323,1552285175),(335,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276324,1552285175),(336,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276343,1552285175),(337,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276343,1552285175),(338,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276391,1552285175),(339,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552276391,1552285175),(340,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276429,1552285175),(341,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','333',2,0,1,0,0,1552276429,1552285175),(342,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276432,1552285175),(343,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','333',2,0,1,0,0,1552276432,1552285175),(344,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276435,1552285175),(345,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','你好',2,0,1,0,0,1552276435,1552285175),(346,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276437,1552285175),(347,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','222',2,0,1,0,0,1552276437,1552285175),(348,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276440,1552285175),(349,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552276440,1552285175),(350,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276443,1552285175),(351,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','555',2,0,1,0,0,1552276443,1552285175),(352,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552276445,1552288646),(353,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','你好',2,0,1,0,0,1552276445,1552288646),(354,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552285180,1552288646),(355,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552285196,1552288646),(356,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552285215,1552288646),(357,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552285260,1552288646),(358,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552285367,1552288646),(359,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552285806,1552288646),(360,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552285852,1552288646),(361,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552286054,1552288646),(362,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552286086,1552288646),(363,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552286102,1552288646),(364,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552286121,1552288646),(365,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552286149,1552288646),(366,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552286399,1552288646),(367,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552286519,1552288646),(368,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552286693,1552288646),(369,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','444',2,0,1,0,0,1552286693,1552288646),(370,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552286891,1552288646),(371,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',2,0,1,0,0,1552286891,1552288646),(372,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','111',0,0,1,0,1,1552288647,1552288649),(373,'36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711','222',3,0,1,0,0,1552288647,1552288649);
/*!40000 ALTER TABLE `im_msg` ENABLE KEYS */;

#
# Structure for table "im_server_list"
#

DROP TABLE IF EXISTS `im_server_list`;
CREATE TABLE `im_server_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '备注客户',
  `access` varchar(255) NOT NULL DEFAULT '' COMMENT '接口名',
  `client_id` varchar(50) NOT NULL DEFAULT '' COMMENT '客户ID',
  `staff_id` varchar(14) NOT NULL DEFAULT '' COMMENT '客服ID',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  `active_time` int(11) NOT NULL DEFAULT '0' COMMENT '活动时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=867 DEFAULT CHARSET=utf8 COMMENT='接入列表';

#
# Data for table "im_server_list"
#

/*!40000 ALTER TABLE `im_server_list` DISABLE KEYS */;
INSERT INTO `im_server_list` VALUES (86,'0004654','5beac60b0e049','THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711',1542770232,1543478047,1542770232),(863,'','5beac60b0e049','sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711',1543573898,1543573898,1543573898),(864,'','5c1d0e79ecd6f','7M1NMw5F7riJorT12lIrmiuTBfvF11gxcn6xhhtd','2088309711',1545991007,1545991007,1545991007),(865,'','5c1d0e79ecd6f','ArB3tHwsNmFGBRQYJo4HyESVMAqBUGQJ4Wk0fax7','2088309711',1546264168,1546264168,1546264168),(866,'','5c1d0e79ecd6f','36WIzNWlS6vo9iP1ZnrlAsuntUFnv3TAYOftVQJf','2088309711',1552011440,1552011440,1552011440);
/*!40000 ALTER TABLE `im_server_list` ENABLE KEYS */;

#
# Structure for table "im_staff"
#

DROP TABLE IF EXISTS `im_staff`;
CREATE TABLE `im_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` int(1) NOT NULL DEFAULT '1' COMMENT '客服状态：启用=1，禁用=0',
  `name` varchar(20) NOT NULL DEFAULT '未设置' COMMENT '客服名称',
  `e_mail` varchar(30) NOT NULL DEFAULT '' COMMENT '邮箱地址',
  `sex` int(11) NOT NULL DEFAULT '0' COMMENT '保密=0，男=1，女=2',
  `user_name` varchar(14) NOT NULL DEFAULT '' COMMENT '用户名',
  `account` varchar(20) NOT NULL DEFAULT '' COMMENT '开户用户名',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码密文',
  `max_work` int(3) NOT NULL DEFAULT '10' COMMENT '最大接待量',
  `work` int(3) NOT NULL DEFAULT '0' COMMENT '当前接待量',
  `head_img` varchar(255) NOT NULL DEFAULT '' COMMENT '头像URL',
  `power` int(1) NOT NULL DEFAULT '0' COMMENT '权限，管理员=1，子客服=0',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  `description` text NOT NULL COMMENT '描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

#
# Data for table "im_staff"
#

/*!40000 ALTER TABLE `im_staff` DISABLE KEYS */;
INSERT INTO `im_staff` VALUES (18,1,'11010101','',0,'2088309711','2088309711','f28fed86680bea284cf0cfe0640ec4',10,26,'userImg.jpg',1,0,1552011440,'01023130111...'),(37,1,'未设置','2088309711@qq.com',0,'12315611','12315611','35b393b97552275a93324129549294',10,0,'',1,1545555733,1545555733,'');
/*!40000 ALTER TABLE `im_staff` ENABLE KEYS */;
