/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50550
Source Host           : 127.0.0.1:3306
Source Database       : nodesql

Target Server Type    : MYSQL
Target Server Version : 50550
File Encoding         : 65001

Date: 2018-07-26 20:17:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account_list
-- ----------------------------
DROP TABLE IF EXISTS `account_list`;
CREATE TABLE `account_list` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `accountType` varchar(1) NOT NULL COMMENT '收支类型0花费1收入',
  `money` int(9) NOT NULL COMMENT '金额',
  `type` varchar(10) DEFAULT NULL COMMENT '类别',
  `createdate` datetime NOT NULL COMMENT '日期',
  `des` varchar(50) DEFAULT NULL COMMENT '备注',
  `spare` varchar(255) DEFAULT NULL COMMENT '备用',
  PRIMARY KEY (`id`,`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of account_list
-- ----------------------------
INSERT INTO `account_list` VALUES ('5', 'undefined', '1', '1', '衣', '2016-09-02 00:00:00', '1', null);
INSERT INTO `account_list` VALUES ('6', 'o8P_-0KQydsHLbfawFUzImkhuceg', '1', '1', '衣', '2016-09-01 00:00:00', '1', null);
INSERT INTO `account_list` VALUES ('7', 'o8P_-0KQydsHLbfawFUzImkhuceg', '0', '1', '衣', '2018-07-26 00:00:00', '1', null);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `content` varchar(40) NOT NULL,
  `postid` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '1', '321', 'writeJournal');
INSERT INTO `comment` VALUES ('2', '1', '321', 'writeJournal');
INSERT INTO `comment` VALUES ('3', '1', '发送', 'writeJournal');
INSERT INTO `comment` VALUES ('4', '1', '发送', 'writeJournal');
INSERT INTO `comment` VALUES ('5', '1', 'bb', 'journal');
INSERT INTO `comment` VALUES ('6', '1', 'vv', 'journal');
INSERT INTO `comment` VALUES ('7', '2', '2', 'createOne');
INSERT INTO `comment` VALUES ('8', '2', '2', 'createOne');

-- ----------------------------
-- Table structure for journal
-- ----------------------------
DROP TABLE IF EXISTS `journal`;
CREATE TABLE `journal` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` varchar(255) NOT NULL,
  `userid` varchar(10) NOT NULL,
  `insert_date` varchar(50) NOT NULL,
  `del_flag` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of journal
-- ----------------------------
INSERT INTO `journal` VALUES ('10', 'Fred', 'Flintstone', '1', '2018-01-05 15:24', '0');
INSERT INTO `journal` VALUES ('11', 'Fred', 'Flintstone', '1', '2018-01-05 15:25', '0');
INSERT INTO `journal` VALUES ('12', 'Fred', 'Flintstone', '1', '2018-01-05 17:00', '0');
INSERT INTO `journal` VALUES ('19', '1', '11111111111', '14', '2018-05-24 14:52', '0');

-- ----------------------------
-- Table structure for memo
-- ----------------------------
DROP TABLE IF EXISTS `memo`;
CREATE TABLE `memo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `userid` varchar(10) NOT NULL,
  `insert_date` varchar(50) NOT NULL,
  `del_flag` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of memo
-- ----------------------------
INSERT INTO `memo` VALUES ('21', '11', '11', '2018-01-09 10:38', '0');
INSERT INTO `memo` VALUES ('22', '11', '11', '2018-01-09 10:39', '0');
INSERT INTO `memo` VALUES ('23', '11', '11', '2018-01-09 10:39', '0');
INSERT INTO `memo` VALUES ('24', '11', '11', '2018-01-09 10:39', '0');
INSERT INTO `memo` VALUES ('25', '11', '11', '2018-01-09 17:41', '0');
INSERT INTO `memo` VALUES ('26', '11', '11', '2018-01-09 17:41', '0');
INSERT INTO `memo` VALUES ('27', '11', '11', '2018-01-09 17:41', '0');
INSERT INTO `memo` VALUES ('28', '11', '11', '2018-01-09 17:42', '0');
INSERT INTO `memo` VALUES ('29', '11', '11', '2018-01-09 17:43', '0');
INSERT INTO `memo` VALUES ('30', '11', '11', '2018-01-09 17:44', '0');
INSERT INTO `memo` VALUES ('55', '111111111111111111111', '14', '2018-02-02 16:10', '0');
INSERT INTO `memo` VALUES ('56', '222222222', '14', '2018-02-02 16:11', '0');
INSERT INTO `memo` VALUES ('57', '333333', '14', '2018-02-02 16:11', '0');
INSERT INTO `memo` VALUES ('58', '1111111111111', '14', '2018-05-24 15:10', '0');
INSERT INTO `memo` VALUES ('59', '2222222222222', '14', '2018-05-24 15:10', '0');
INSERT INTO `memo` VALUES ('60', '333333333333333', '14', '2018-05-24 15:10', '0');

-- ----------------------------
-- Table structure for mood
-- ----------------------------
DROP TABLE IF EXISTS `mood`;
CREATE TABLE `mood` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `userid` varchar(10) NOT NULL,
  `insert_date` varchar(50) NOT NULL,
  `del_flag` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of mood
-- ----------------------------
INSERT INTO `mood` VALUES ('79', '222222222222222222222222222', '14', '2018-01-29 15:45', '0');
INSERT INTO `mood` VALUES ('84', '222222', '14', '2018-02-02 15:52', '0');
INSERT INTO `mood` VALUES ('85', '111122222', '14', '2018-02-06 10:27', '0');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `title` varchar(40) NOT NULL,
  `content` varchar(40) NOT NULL,
  `uid` varchar(40) NOT NULL,
  `moment` varchar(40) NOT NULL,
  `comments` varchar(40) NOT NULL DEFAULT '0',
  `pv` varchar(40) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('9', '1', '1ads', 'das', '1', '2018-01-05 11:19', '0', '1');
INSERT INTO `posts` VALUES ('13', '2', '3', '3', '2', '2018-01-05 17:23', '0', '0');
INSERT INTO `posts` VALUES ('14', '2', '4', '4', '2', '2018-01-05 17:24', '0', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `pass` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('14', 'admin', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `users` VALUES ('15', 'a', '96e79218965eb72c92a549dd5a330112');
INSERT INTO `users` VALUES ('16', '111', '96e79218965eb72c92a549dd5a330112');

-- ----------------------------
-- Table structure for _mysql_session_store
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store` (
  `id` varchar(255) NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of _mysql_session_store
-- ----------------------------
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:-MHbwFKKz5ZnvI-vfC7PZwyqcRj3SlTq', '1517968941762', '{\"user\":\"admin\",\"id\":14}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:5U0rInggvpal0zsT5FG-P8FQYWfTP0Ey', '1516700885189', '{\"user\":\"admin\",\"id\":14}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:ny_39a9eOShyKeyhvSWirxM7NLSQKI8l', '1515635268832', '{\"user\":\"admin\",\"id\":14}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:Sam3QnpXdkPoPjklE8uPuKpP_SWhy5Ip', '1517279311337', '{\"user\":\"admin\",\"id\":14}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:Tb5CiqhRwZNTXiD4GCrae_pl17Rb82It', '1527230931616', '{\"user\":\"admin\",\"id\":14}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:tUz1KOQj68l5mET7LllcV7liHHtLD8dY', '1515576900047', '{\"user\":\"admin\",\"id\":14}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:UQlqfJ_1SO-c6We8QlX88_w_HvFHMVl4', '1517644161107', '{\"user\":\"admin\",\"id\":14}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:Z9tr5HpCmWv9IpW-LNFJ2jIRBJ7EAyr2', '1517969403784', '{\"user\":\"admin\",\"id\":14}');
