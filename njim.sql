﻿# Host: localhost  (Version 5.5.53)
# Date: 2018-12-15 22:44:44
# Generator: MySQL-Front 6.1  (Build 1.15)


#
# Structure for table "im_example"
#

DROP TABLE IF EXISTS `im_example`;
CREATE TABLE `im_example` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '实例名',
  `user_name` varchar(50) NOT NULL DEFAULT '' COMMENT '负责人',
  `access` varchar(30) NOT NULL DEFAULT '' COMMENT '接入口',
  `style_id` int(11) NOT NULL DEFAULT '0' COMMENT '样式ID',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  `description` text NOT NULL COMMENT '实例描述',
  `staff_pk` text NOT NULL COMMENT '可接入的客服，主键，分割符 |',
  `invitation_switch` int(1) NOT NULL DEFAULT '0' COMMENT '邀请功能：1=打开，0=关闭',
  `invitation_first` int(6) NOT NULL DEFAULT '10' COMMENT '首次邀请延迟，默认10秒',
  `invitation_after` int(6) NOT NULL DEFAULT '20' COMMENT '后续邀请延迟，默认20秒',
  `invitation_num` int(11) NOT NULL DEFAULT '0' COMMENT '邀请次数，0=不限制',
  `invitation_time` varchar(20) NOT NULL DEFAULT '' COMMENT '时间范围内邀请',
  `invitation_week` varchar(20) NOT NULL DEFAULT '' COMMENT '星期范围，周一至周末(1-7)，分割符 |',
  `invitation_auto_close` int(11) NOT NULL DEFAULT '0' COMMENT '自动关闭邀请延迟，0=不限制',
  PRIMARY KEY (`id`),
  UNIQUE KEY `access` (`access`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='实例';

#
# Data for table "im_example"
#

/*!40000 ALTER TABLE `im_example` DISABLE KEYS */;
INSERT INTO `im_example` VALUES (3,'测试实例','2088309711','5beac60b0e049',4,1542112779,1543651958,'开发测试使用','18|29',1,10,20,0,'00:00:00 - 23:59:59','7|1|2|3|4|5|6',0),(4,'132','2088309711','5bed4e0413843',4,1542278660,1542278660,'','',0,0,10000,0,'0','0',0),(5,'1','2088309711','5bed4e0c681f5',4,1542278668,1542280970,'123','',0,0,10000,0,'0','0',0),(6,'1561615','2088309711','5bf91e94f1f2a',4,1543052949,1543052949,'1321165','18|29',0,0,10000,0,'0','0',0),(7,'1321123333','2088309711','5bf92437080f6',4,1543054391,1543054400,'1221213213','18|29',0,0,10000,0,'0','0',0),(8,'111','2088309711','5c00e917821a6',7,1543563543,1543636692,'1351','18|29',1,10,20,30,'12:05:03 - 14:29:01','7|1|2|3|4|5|6',30);
/*!40000 ALTER TABLE `im_example` ENABLE KEYS */;

#
# Structure for table "im_example_style"
#

DROP TABLE IF EXISTS `im_example_style`;
CREATE TABLE `im_example_style` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '样式名',
  `user_name` varchar(50) NOT NULL DEFAULT '' COMMENT '负责人',
  `color` varchar(7) NOT NULL DEFAULT '' COMMENT '主题色',
  `icon_code` text NOT NULL COMMENT '挂件代码',
  `invitation_code` text NOT NULL COMMENT '邀请框代码',
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
INSERT INTO `im_example_style` VALUES (4,'test','2088309711','#41b300','<div id=\"njim_open_click\" style=\"width:80px; height:80px; position:fixed; bottom:50px; right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;\"><img src=\"http://njim.com/static/images/staff-icon.png\" style=\"position:absolute; top:13px; left:14px; width:50px; margin:0; padding:0;\"/><span style=\"position:absolute; bottom:6px; color:#fff; text-align:center; width:100%; font:15px \'宋体\'; margin:0; padding:0;\">在线客服</span></div>','<div style=\"width: 340px; height: 200px; background: #282828 url(http://njim.com/static/images/invitation.jpg) no-repeat;position: fixed; top:50%; left:50%; margin: -100px 0 0 -170px;\"><div style=\"position: absolute;bottom: 5px;right: 5px;\"><button id=\"njim_invitation_open_chat\" style=\"float: left; margin: 5px; border: 1px solid #b3a800;background: #fff000; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">现在咨询</button><button id=\"njim_invitation_continue\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">稍后再说</button><button id=\"njim_invitation_close\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">不在提示</button></div></div>',2,1542248439,1543570855,'000'),(6,'002','2088309711','#eeeeee','<div id=\"njim_open_click\" style=\"width:80px; height:80px; position:fixed; bottom:50px; right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;\"><img src=\"http://njim.com/static/images/staff-icon.png\" style=\"position:absolute; top:13px; left:14px; width:50px; margin:0; padding:0;\"/><span style=\"position:absolute; bottom:6px; color:#fff; text-align:center; width:100%; font:15px \'宋体\'; margin:0; padding:0;\">在线客服</span></div>','',2,1543050772,1543054856,'和规范化股份');
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
  `send_type` int(1) NOT NULL DEFAULT '0' COMMENT '客服发送=1，客户发送=0',
  `s_get` int(1) NOT NULL DEFAULT '0' COMMENT '客服收到=1，没收到=0',
  `c_get` int(1) NOT NULL DEFAULT '0' COMMENT '客户收到=1，没收到=0',
  `s_read` int(1) NOT NULL DEFAULT '0' COMMENT '客服已读=1，未读=0',
  `c_read` int(1) NOT NULL DEFAULT '0' COMMENT '客户已读=1，未读=0',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

#
# Data for table "im_msg"
#

/*!40000 ALTER TABLE `im_msg` DISABLE KEYS */;
INSERT INTO `im_msg` VALUES (1,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','123',0,1,1,1,0,1542789527,1544863162),(30,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','456',1,1,1,1,0,1542789527,1544863162),(31,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','发送到发送到',1,1,1,1,0,1543221604,1544863162),(32,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','防守打法大发',1,1,1,1,0,1543221710,1544863162),(33,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','撒大声地',1,1,1,1,0,1543373389,1544863162),(34,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','fsdf',1,1,1,1,0,1543392696,1544863162),(35,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','fdsfsdf',1,1,1,1,0,1543453913,1544863162),(36,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','gdfg',0,1,1,1,1,1544858110,1544884672),(37,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','fsdfsd',0,1,1,1,1,1544858278,1544884672),(38,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','fsdfsdf',0,1,1,1,1,1544858282,1544884672),(39,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','fsdfdsf',0,1,1,1,1,1544858284,1544884672),(40,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','dfbdfb',0,1,1,1,1,1544858287,1544884672),(41,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','tsdr  g fg h fgdh fhf',0,1,1,1,1,1544858292,1544884672),(42,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','hfbfbrh<br>gdfgrethfh<br>vsrdegfghf<br>gsedrg',0,1,1,1,1,1544858299,1544884672),(43,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','<img src=\"/static/images/emo/emo_30.gif\" />',0,1,1,1,1,1544859723,1544884672),(44,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','<img src=\"/static/images/emo/emo_13.gif\" /><img src=\"/static/images/emo/emo_17.gif\" /><img src=\"/static/images/emo/emo_15.gif\" /><img src=\"/static/images/emo/emo_21.gif\" /><img src=\"/static/images/emo/emo_41.gif\" /><img src=\"/static/images/emo/emo_42.gif\" /><img src=\"/static/images/emo/emo_11.gif\" /><img src=\"/static/images/emo/emo_52.gif\" /><img src=\"/static/images/emo/emo_14.gif\" />',0,1,1,1,1,1544859736,1544884672),(45,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','<img src=\"/static/images/emo/emo_60.gif\" /><img src=\"/static/images/emo/emo_60.gif\" /><img src=\"/static/images/emo/emo_60.gif\" /><img src=\"/static/images/emo/emo_60.gif\" /><img src=\"/static/images/emo/emo_60.gif\" />',0,1,1,1,1,1544860435,1544884672),(46,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','<img src=\"/static/images/emo/emo_18.gif\" /><img src=\"/static/images/emo/emo_18.gif\" /><img src=\"/static/images/emo/emo_18.gif\" />',0,1,1,1,1,1544860445,1544884672),(47,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','156165165<br>165161',0,1,1,1,1,1544860475,1544884672),(48,'lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789','申达股份设定',0,0,1,0,1,1544862037,1544862038),(49,'lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789','防守打法',0,0,1,0,1,1544862041,1544862042),(50,'lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789','fdsfds',0,0,1,0,1,1544862043,1544862045),(51,'lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789','fsdfsd',0,0,1,0,1,1544862045,1544862046),(52,'lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789','fsdfsd',0,0,1,0,1,1544862046,1544862047),(53,'lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789','gsdgfds',0,0,1,0,1,1544862047,1544862048),(54,'lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789','fsdfsdf',0,0,1,0,1,1544862048,1544862049),(55,'lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789','fsdgdsfg',0,0,1,0,1,1544862049,1544862051),(56,'lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789','dfsfsdf',0,0,1,0,1,1544862051,1544862052),(57,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','fsdfsdf',1,1,1,1,0,1544862389,1544884672),(58,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','fdsf',1,1,1,1,0,1544862394,1544884672),(59,'sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711','rdsgdr',0,1,1,1,1,1544862900,1544884672);
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
) ENGINE=MyISAM AUTO_INCREMENT=866 DEFAULT CHARSET=utf8 COMMENT='接入列表';

#
# Data for table "im_server_list"
#

/*!40000 ALTER TABLE `im_server_list` DISABLE KEYS */;
INSERT INTO `im_server_list` VALUES (86,'0004654','5beac60b0e049','THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711',1542770232,1543478047,1542770232),(863,'2424','5beac60b0e049','sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711',1543573898,1543573898,1543573898),(864,'2452','5beac60b0e049','lXlhhlkrqseC4SgBq0Q6BFznkSzdjqRpqLuFkuCa','123456789',1544857157,1544857157,1544857157),(865,'2452','5beac60b0e049','anngQIWNKrslevLnqmYxCXDW8mvCR7FmAynIMexY','2088309711',1544857438,1544857438,1544857438);
/*!40000 ALTER TABLE `im_server_list` ENABLE KEYS */;

#
# Structure for table "im_staff"
#

DROP TABLE IF EXISTS `im_staff`;
CREATE TABLE `im_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open` int(1) NOT NULL DEFAULT '1' COMMENT '开启=1，禁用=0',
  `name` varchar(20) NOT NULL DEFAULT '未设置' COMMENT '客服名称',
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
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

#
# Data for table "im_staff"
#

/*!40000 ALTER TABLE `im_staff` DISABLE KEYS */;
INSERT INTO `im_staff` VALUES (18,1,'333333',0,'2088309711','2088309711','f28fed86680bea284cf0cfe0640ec4',10,24,'userImg.jpg',1,0,1544857438,'010231301'),(29,1,'fdfsdf',2,'123456789','2088309711','0200e00a005aac207704e7aabbaafb',10,24,'',0,1542517645,1544857157,'fsdfdsf'),(35,1,'未设置',0,'20883097111','','2b82a68d7ae470b115262975c25732',10,0,'',1,1544884442,1544884442,''),(36,1,'未设置',0,'2088309712','2088309712','2b82a68d7ae470b115262975c25732',10,0,'',1,1544884515,1544884515,''),(37,1,'未设置',0,'12345678','12345678','35b393b97552275a93324129549294',10,0,'',1,1544884667,1544884667,''),(38,1,'未设置',0,'141651','141651','2b82a68d7ae470b115262975c25732',10,0,'',1,1544884726,1544884726,''),(39,1,'未设置',0,'156416541654','156416541654','2b82a68d7ae470b115262975c25732',10,0,'',1,1544884830,1544884830,''),(40,1,'未设置',0,'2088309711112','2088309711112','2b82a68d7ae470b115262975c25732',10,0,'',1,1544884853,1544884853,'');
/*!40000 ALTER TABLE `im_staff` ENABLE KEYS */;
