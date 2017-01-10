var commonEnums = {
	// 书单状态
	EBOOK_BOOKLIST_STATUS: [
	   {value: '0', text: '下架'},
	   {value: '1', text: '上架'}
	],

    // 书单状态
    EBOOK_BOOKLIST_TYPE: [
        {value: '1', text: '专题'},
        {value: '2', text: '书集'}
    ],

    // 书单状态
    EBOOK_BOOKLIST_SORT_TYPE: [
        {value: '1', text: '收藏人数'},
        {value: '2', text: '点击次数'},
        {value: '3', text: '发布时间'}
    ],
    // 用户类型
    USER_TYPE: [
        {value: '1', text: '男频'},
        {value: '2', text: '女频'},
        {value: '4', text: '出版物'}
    ],
    // 奖品类型
    AWARD_TYPE: [
        {value: '0', text: '其他'},
        {value: '1', text: '优惠券'},
        {value: '9', text: '实物'}
    ],
    USERTYPE: {"1":"男频","2":"女频","4":"出版物"},
    // CP类型
    CP_TYPE: [
        {value: '1', text: '中文'},
        {value: '2', text: '阅文'}
    ],
    CPTYPE: {"1":"中文","2":"阅文","100":""},
    /**
     * 根据值获取text
     * @param arrayName {!string} 枚举key
     * @param value {!number|string}
     * @returns {string}
     */
    getText:function(arrayName, value) {
        var array = commonEnums[arrayName];
        if(!array) {
            console.log("名称为[" + arrayName + "]的数组不存在于Enums中");
            return;
        }

        var text = '';
        $.each(array, function (i, n) {
            if (n.value == value) {
                text = n.text;
            }
        });

        return text;
    },

    getColumnText:function(val){
	    return val;
    }

};
