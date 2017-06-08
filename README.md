在线使用地址：[DEMO](http://tqyebook.duapp.com/manage/fileUpload.html)

演示demo：
![](https://p.pstatp.com/large/243a00025b19387225be)

功能1：

- 首先，只要有mysql数据库建表语句，如下格式

     CREATE TABLE comment ( COMMENT_ID int(11) NOT NULL AUTO_INCREMENT COMMENT '评论ID（主键）', COMMENT_COMMENTID int(11) NOT NULL COMMENT '父评论ID', COMMENT_CONTENT text NOT NULL COMMENT '评论的内容', COMMENT_PICTURE varchar(300) DEFAULT NULL COMMENT '评论时发布的图片，可上传多张图片', COMMENT_TIME datetime NOT NULL COMMENT '评论时间', COMMENT_TYPE int(11) NOT NULL DEFAULT '2' COMMENT '评论的类型：1 匿名，2 公开，默认为公开', COMMENT_PEOPLEID int(11) DEFAULT '0' COMMENT '评论者ID，默认为非会员用户（即游客）', COMMENT_POINTS int(11) DEFAULT '0' COMMENT '评价打分（-1至5分）', COMMENT_BASICID int(11) NOT NULL COMMENT '（文章、商品...）绑定basicId（外键）', COMMENT_APPID int(11) DEFAULT NULL COMMENT '(文章、商品）绑定的应用编号', COMMENT_FILE_NAME varchar(255) DEFAULT NULL COMMENT '附件文件名称', COMMENT_FILE_PATH varchar(255) DEFAULT NULL COMMENT '附件文件路径', PRIMARY KEY (COMMENT_ID), KEY index2 (COMMENT_BASICID) USING BTREE ) ENGINE=MyISAM AUTO_INCREMENT=78 DEFAULT CHARSET=utf8 COMMENT='评论表'
需要配置下，比如 批量更新语句条件（填的是model的名字） ： 这个字段，按照上面的建表语句，没有id只有commentId，所以可以填 commentId （注意这里填的是model里面的字段 直接填写COMMENT_ID或者id或者建表语句中没有的字段 都会报错）
- 点击上传后，点击开始生成，即可下载model和sql语句。

功能2： 点击开始生成后，页面上会生成一些配置项，这是配置模版文件里面的字段 模版文件可以自定义，生成方式都可以自定义(目前结果只打印在控制台) 第一步选中要生成的radio 第二步点击配置 第三步点击生成（用于生成button、checkbox等）/生成2（用于生成table）

qq:475804848