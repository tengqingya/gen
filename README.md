[![Build Status](https://travis-ci.org/tengqingya/gen.svg?branch=dev)]
���ֹ�����ʾ��ַ��tqyebook.duapp.com/manage/fileUpload.html
����1��
���ȣ�ֻҪ��mysql���ݿ⽨����䣬���¸�ʽ
CREATE TABLE comment (
COMMENT_ID int(11) NOT NULL AUTO_INCREMENT COMMENT '����ID��������',
COMMENT_COMMENTID int(11) NOT NULL COMMENT '������ID',
COMMENT_CONTENT text NOT NULL COMMENT '���۵�����',
COMMENT_PICTURE varchar(300) DEFAULT NULL COMMENT '����ʱ������ͼƬ�����ϴ�����ͼƬ',
COMMENT_TIME datetime NOT NULL COMMENT '����ʱ��',
COMMENT_TYPE int(11) NOT NULL DEFAULT '2' COMMENT '���۵����ͣ�1 ������2 ������Ĭ��Ϊ����',
COMMENT_PEOPLEID int(11) DEFAULT '0' COMMENT '������ID��Ĭ��Ϊ�ǻ�Ա�û������οͣ�',
COMMENT_POINTS int(11) DEFAULT '0' COMMENT '���۴�֣�-1��5�֣�',
COMMENT_BASICID int(11) NOT NULL COMMENT '�����¡���Ʒ...����basicId�������',
COMMENT_APPID int(11) DEFAULT NULL COMMENT '(���¡���Ʒ���󶨵�Ӧ�ñ��',
COMMENT_FILE_NAME varchar(255) DEFAULT NULL COMMENT '�����ļ�����',
COMMENT_FILE_PATH varchar(255) DEFAULT NULL COMMENT '�����ļ�·��',
PRIMARY KEY (COMMENT_ID),
KEY index2 (COMMENT_BASICID) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=78 DEFAULT CHARSET=utf8 COMMENT='���۱�'
��Ҫ�����£�����
����������������������model�����֣� �� ����ֶΣ���������Ľ�����䣬û��idֻ��commentId�����Կ����� commentId ��ע�����������model������ֶ� ֱ����дCOMMENT_ID����id���߽��������û�е��ֶ� ���ᱨ��
����Ϊ�κ��ļ�������ϴ��󣬵����ʼ���ɣ���������model��sql��䡣
����2��
�����ʼ���ɺ�ҳ���ϻ�����һЩ�������������ģ���ļ�������ֶ�
ģ���ļ������Զ��壬���ɷ�ʽ�������Զ���(Ŀǰ���ֻ��ӡ�ڿ���̨)
��һ��ѡ��Ҫ���ɵ�radio
�ڶ����������
������������ɣ���������button��checkbox�ȣ�/����2����������table��
