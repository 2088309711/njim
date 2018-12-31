# Host: localhost  (Version 5.5.53)
# Date: 2019-01-01 00:34:41
# Generator: MySQL-Front 6.1  (Build 1.15)


#
# Structure for table "im_corpus_data"
#

DROP TABLE IF EXISTS `im_corpus_data`;
CREATE TABLE `im_corpus_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL COMMENT '匹配内容',
  `content` text NOT NULL COMMENT '回复内容',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL COMMENT '组ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED COMMENT='语库组';

#
# Data for table "im_corpus_data"
#

/*!40000 ALTER TABLE `im_corpus_data` DISABLE KEYS */;
INSERT INTO `im_corpus_data` VALUES (25,'dgsg','jtyj',1546273845,1546273991,11),(26,'jhjgfhj','vdsfgh',1546273925,1546273998,11),(27,'hjty','jghjnghj',1546273952,1546274003,11),(28,'gdfg','gdfg',1546273956,1546273956,11),(29,'ngdhn','nghdn',1546273959,1546273959,11);
/*!40000 ALTER TABLE `im_corpus_data` ENABLE KEYS */;

#
# Structure for table "im_corpus_group"
#

DROP TABLE IF EXISTS `im_corpus_group`;
CREATE TABLE `im_corpus_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '组名',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `user_name` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='语库组';

#
# Data for table "im_corpus_group"
#

/*!40000 ALTER TABLE `im_corpus_group` DISABLE KEYS */;
INSERT INTO `im_corpus_group` VALUES (11,'001',1546266042,1546266053,'2088309711');
/*!40000 ALTER TABLE `im_corpus_group` ENABLE KEYS */;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `access` (`access`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='实例';

#
# Data for table "im_example"
#

/*!40000 ALTER TABLE `im_example` DISABLE KEYS */;
INSERT INTO `im_example` VALUES (3,1,'测试实例','17602373802','2088309711','5beac60b0e049',1542112779,1543651958,'开发测试使用','18|29',0,0,10,10,20,20,0,0,'00:00:00 - 23:59:59','','7|1|2|3|4|5|6','',0,0,'','','','','',''),(4,1,'132','','2088309711','5bed4e0413843',1542278660,1542278660,'','',0,0,0,10,10000,20,0,0,'0','','0','',0,0,'','','','','',''),(5,1,'1','','2088309711','5bed4e0c681f5',1542278668,1545462081,'123','18|29',0,0,0,10,10000,20,0,0,'0','','0','',0,0,'','','<div id=\"njim_open_click\" style=\"width:80px; height:80px; position:fixed; bottom:50px; right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;\"><img src=\"http://njim.com/static/images/staff-icon.png\" style=\"position:absolute; top:13px; left:14px; width:50px; margin:0; padding:0;\"/><span style=\"position:absolute; bottom:6px; color:#fff; text-align:center; width:100%; font:15px \'宋体\'; margin:0; padding:0;\">在线客服</span></div>','还没设计完成','<div style=\"width: 340px; height: 200px; background: #282828 url(http://njim.com/static/images/invitation.jpg) no-repeat;position: fixed; top:50%; left:50%; margin: -100px 0 0 -170px;\"><div style=\"position: absolute;bottom: 5px;right: 5px;\"><button id=\"njim_invitation_open_chat\" style=\"float: left; margin: 5px; border: 1px solid #b3a800;background: #fff000; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">现在咨询</button><button id=\"njim_invitation_continue\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">稍后再说</button><button id=\"njim_invitation_close\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">不在提示</button></div></div>','还没设计完成'),(6,1,'132123','','2088309711','5bf91e94f1f2a',1543052949,1545376000,'4654654','18|29',1,1,12,5,15,6,9,4,'08:00:00-20:30:00','00:00:00-23:50:30','','',5,7,'#ff0000','#222222','11111','333333','22222','44444'),(11,1,'测试实例','17602373802','2088309711','5c1d0e79ecd6f',1545408121,1546049883,'系统自动填写的实例，请根据实际需求修改。','18|29',1,1,2,2,1,1,3,3,'00:00:00-23:59:59','00:00:00-23:59:59','7|1|2|3|4|5|6','7|1|2|3|4|5|6',3,3,'#aaaaaa','#dddddd','<div id=\"njim_open_click\" style=\"width:80px; height:80px; position:fixed; bottom:50px; right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;\"><img src=\"http://serve.njim.vip/static/images/staff-icon.png\" style=\"position:absolute; top:13px; left:14px; width:50px; margin:0; padding:0;\"/><span style=\"position:absolute; bottom:6px; color:#fff; text-align:center; width:100%; font:15px \'宋体\'; margin:0; padding:0;\">在线客服</span></div>','<div id=\"njim_open_click\" style=\"width:50px; height:50px; position:fixed; top:80px; right:10px; background:{njim:color}; border-radius: 25px; margin:0; padding:0;\"><img src=\"http://serve.njim.vip/static/images/staff-icon.png\" style=\"position:absolute; top:16px; left:10px; width:30px; margin:0; padding:0;\"/></div>','<div style=\"width: 340px; height: 200px; background: #282828 url(http://serve.njim.vip/static/images/invitation.jpg) no-repeat;position: fixed; top:50%; left:50%; margin: -100px 0 0 -170px;\"><div style=\"position: absolute;bottom: 5px;right: 5px;\"><button id=\"njim_invitation_open_chat\" style=\"float: left; margin: 5px; border: 1px solid #b3a800;background: #fff000; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">现在咨询</button><button id=\"njim_invitation_continue\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">稍后再说</button><button id=\"njim_invitation_close\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">不在提示</button></div></div>','<div style=\"width: 100%; height: 200px; background: #00bdff; position: fixed; top:0; left:0;\"><div id=\"njim_invitation_icon\" style=\"background: url(http://serve.njim.vip/static/images/icon-desktop.png) -24px -150px no-repeat; width: 16px; height: 16px; position: absolute; top:10px; right:10px;\"></div><div style=\"color:#fff; font: 20px \'微软雅黑\'; text-align: center; margin-top: 80px;\">搜索百遍？不如咨询一遍！</div><div style=\"position: absolute;bottom: 5px;right: 5px;\"><button id=\"njim_invitation_open_chat\" style=\"float: left; margin: 5px; border: 1px solid #fff;background: #fff; padding: 3px 10px; font:12px \'宋体\'; color: #007cff;\">现在咨询</button><button id=\"njim_invitation_continue\"style=\"float: left; margin: 5px; border: 1px solid #fff;background: #00bdff; padding: 3px 10px; font:12px \'宋体\'; color: #fff;\">稍后再说</button><button id=\"njim_invitation_close\" style=\"float: left; margin: 5px; border: 1px solid #fff;background: #00bdff; padding: 3px 10px; font:12px \'宋体\'; color: #fff;\">不在提示</button></div></div>'),(12,1,'系统自动配置的实例','','2088309711','5c1dc95e4579b',1545455966,1545456028,'系统自动配置的实例，请根据实际需求修改。','18',1,1,10,10,20,20,0,0,'00:00:00-23:59:59','00:00:00-23:59:59','7|1|2|3|4|5|6','7|1|2|3|4|5|6',0,0,'#007aff','#007aff','<div id=\"njim_open_click\" style=\"width:80px; height:80px; position:fixed; bottom:50px; right:50px; background:{njim:color}; cursor:pointer; margin:0; padding:0;\"><img src=\"http://njim.com/static/images/staff-icon.png\" style=\"position:absolute; top:13px; left:14px; width:50px; margin:0; padding:0;\"/><span style=\"position:absolute; bottom:6px; color:#fff; text-align:center; width:100%; font:15px \'宋体\'; margin:0; padding:0;\">在线客服</span></div>','','<div style=\"width: 340px; height: 200px; background: #282828 url(http://njim.com/static/images/invitation.jpg) no-repeat;position: fixed; top:50%; left:50%; margin: -100px 0 0 -170px;\"><div style=\"position: absolute;bottom: 5px;right: 5px;\"><button id=\"njim_invitation_open_chat\" style=\"float: left; margin: 5px; border: 1px solid #b3a800;background: #fff000; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">现在咨询</button><button id=\"njim_invitation_continue\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">稍后再说</button><button id=\"njim_invitation_close\" style=\"float: left; margin: 5px; border: 1px solid #aaa;background: #ccc; padding: 3px 10px; font:12px \'宋体\'; color: #333;\">不在提示</button></div></div>','');
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
  `send_type` int(1) NOT NULL DEFAULT '0' COMMENT '客服发送=1，客户发送=0',
  `s_get` int(1) NOT NULL DEFAULT '0' COMMENT '客服收到=1，没收到=0',
  `c_get` int(1) NOT NULL DEFAULT '0' COMMENT '客户收到=1，没收到=0',
  `s_read` int(1) NOT NULL DEFAULT '0' COMMENT '客服已读=1，未读=0',
  `c_read` int(1) NOT NULL DEFAULT '0' COMMENT '客户已读=1，未读=0',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

#
# Data for table "im_msg"
#

/*!40000 ALTER TABLE `im_msg` DISABLE KEYS */;
INSERT INTO `im_msg` VALUES (1,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','123',0,1,1,1,0,1542789527,1545983361),(30,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','456',1,1,1,1,0,1542789527,1545988280),(31,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','发送到发送到',1,1,1,1,0,1543221604,1545988280),(32,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','防守打法大发',1,1,1,1,0,1543221710,1545988280),(33,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','撒大声地',1,1,1,1,0,1543373389,1545988280),(34,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','fsdf',1,1,1,1,0,1543392696,1545988280),(35,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','fdsfsdf',1,1,1,1,0,1543453913,1545988280),(36,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','dasda',0,1,1,1,1,1545896428,1545988280),(37,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','dasd',0,1,1,1,1,1545896440,1545988280),(38,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','<img src=\"/static/images/emo/emo_42.gif\" /><img src=\"/static/images/emo/emo_42.gif\" />',0,1,1,1,1,1545896443,1545988280),(39,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','dsadasd',1,1,1,1,0,1545896457,1545988280),(40,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','<img src=\"/static/images/emo/emo_11.gif\" /><img src=\"/static/images/emo/emo_11.gif\" /><img src=\"/static/images/emo/emo_11.gif\" />',1,1,1,1,0,1545896466,1545988280),(41,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','fsdfdsfs',0,1,1,1,1,1545896678,1545988280),(42,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','<img src=\"/static/images/emo/emo_33.gif\" /><img src=\"/static/images/emo/emo_33.gif\" /><img src=\"/static/images/emo/emo_33.gif\" />',0,1,1,1,1,1545896683,1545988280),(43,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','13212313211  cc',1,1,1,1,0,1545897376,1545988280),(44,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','fcdcdsc aa',0,1,1,1,1,1545897386,1545988280),(45,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','<img src=\"/static/images/emo/emo_60.gif\" /><img src=\"/static/images/emo/emo_50.gif\" />',0,1,1,1,1,1545897400,1545988280),(46,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','dsdas',0,0,1,0,1,1545983332,1545988280),(47,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','<img src=\"/static/images/emo/emo_54.gif\" /><img src=\"/static/images/emo/emo_54.gif\" /><img src=\"/static/images/emo/emo_54.gif\" />',0,0,1,0,1,1545983338,1545988280),(48,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','fcszdfsdf',0,0,1,0,1,1545983368,1545988280),(49,'THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711','fsdfdsf',0,0,1,0,1,1545983371,1545988280),(50,'7M1NMw5F7riJorT12lIrmiuTBfvF11gxcn6xhhtd','2088309711','dasd',0,0,1,0,1,1546044965,1546066998),(51,'7M1NMw5F7riJorT12lIrmiuTBfvF11gxcn6xhhtd','2088309711','<img src=\"/static/images/emo/emo_34.gif\" /><img src=\"/static/images/emo/emo_34.gif\" /><img src=\"/static/images/emo/emo_34.gif\" /><img src=\"/static/images/emo/emo_02.gif\" /><img src=\"/static/images/emo/emo_02.gif\" />',0,0,1,0,1,1546046203,1546066998),(52,'7M1NMw5F7riJorT12lIrmiuTBfvF11gxcn6xhhtd','2088309711','jtjrt',0,0,1,0,1,1546047674,1546066998),(53,'7M1NMw5F7riJorT12lIrmiuTBfvF11gxcn6xhhtd','2088309711','<img src=\"/static/images/emo/emo_56.gif\" /><img src=\"/static/images/emo/emo_56.gif\" />',0,0,1,0,1,1546047679,1546066998),(54,'7M1NMw5F7riJorT12lIrmiuTBfvF11gxcn6xhhtd','2088309711','dasdas',0,0,1,0,1,1546067009,1546067011),(55,'7M1NMw5F7riJorT12lIrmiuTBfvF11gxcn6xhhtd','2088309711','<img src=\"/static/images/emo/emo_41.gif\" /><img src=\"/static/images/emo/emo_41.gif\" />',0,0,1,0,1,1546067015,1546067016),(56,'7M1NMw5F7riJorT12lIrmiuTBfvF11gxcn6xhhtd','2088309711','<img src=\"/static/images/emo/emo_33.gif\" /><img src=\"/static/images/emo/emo_33.gif\" />',0,0,1,0,1,1546067029,1546067031);
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
INSERT INTO `im_server_list` VALUES (86,'0004654','5beac60b0e049','THemyTlGzjb1fNDbassoCu7HdVo7vj5J7pn2lZ17','2088309711',1542770232,1543478047,1542770232),(863,'','5beac60b0e049','sJ8KpnefXEb46H1SEc0x8dix8JmPD2WO53DrGKlh','2088309711',1543573898,1543573898,1543573898),(864,'','5c1d0e79ecd6f','7M1NMw5F7riJorT12lIrmiuTBfvF11gxcn6xhhtd','2088309711',1545991007,1545991007,1545991007),(865,'','5c1d0e79ecd6f','ArB3tHwsNmFGBRQYJo4HyESVMAqBUGQJ4Wk0fax7','2088309711',1546264168,1546264168,1546264168);
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
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

#
# Data for table "im_staff"
#

/*!40000 ALTER TABLE `im_staff` DISABLE KEYS */;
INSERT INTO `im_staff` VALUES (18,1,'11010101','',0,'2088309711','2088309711','f28fed86680bea284cf0cfe0640ec4',10,25,'userImg.jpg',1,0,1546264168,'01023130111...'),(37,1,'未设置','2088309711@qq.com',0,'12315611','12315611','35b393b97552275a93324129549294',10,0,'',1,1545555733,1545555733,'');
/*!40000 ALTER TABLE `im_staff` ENABLE KEYS */;
