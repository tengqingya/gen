var Enums = {
    product: [
        {"value": "themes", "text": "个性化中心", "data": "THEME", "alias":"THEME", "id":5},
        {"value": "wallpapers", "text": "壁纸", "data": "WALLPAPER", "alias":"WALLPAPER", "id":7},
        {"value": "ringtones", "text": "铃声", "data": "RINGTONE", "alias":"RINGTONE", "id":8},
    ],
    
    realProduct:[
        {"bizType": "THEME_themes", "text": "个性化中心-主题", "data": "THEME", "product": "themes", "bizId":5},
        {"bizType": "THEME_wallpapers", "text": "个性化中心-壁纸", "data": "WALLPAPER", "product": "wallpapers", "bizId":7},
        {"bizType": "THEME_ringtones", "text": "个性化中心-铃声", "data": "RINGTONE", "product": "ringtones", "bizId":8},
        {"bizType": "PORTAL_THEME_themes", "text": "个性化商店-主题", "data": "THEME", "product": "portal_theme", "bizId":5},
        {"bizType": "PORTAL_THEME_wallpapers", "text": "个性化商店-壁纸", "data": "WALLPAPER", "product": "portal_wallpaper", "bizId":7},
        {"bizType": "PORTAL_THEME_ringtones", "text": "个性化商店-铃声", "data": "RINGTONE", "product": "portal_ringtone", "bizId":8}
    ],
    
    //type属性指定到对应页面，all代表所有，多个用逗号分隔"a,b"
    statusData: [
        {"value": "", "text": "全部", "selected": true, type:"all"},
        {"value": "5", "text": "创建中", "data": "CREATING", type:"application"},
        {"value": "10", "text": "新建", "data": "NEW", type:"application"},
        {"value": "15", "text": "一审待审核", "data": "FIRSTAUDIT", type:"application"},
        {"value": "20", "text": "待审核", "data": "AUDIT_WAIT", type:"application"},
        {"value": "100", "text": "审核中", "data": "AUDITING", type:"application"},
        {"value": "30", "text": "预审不通过", "data": "AUDIT_FAILED", type:"application"},
        {"value": "50", "text": "上架", "data": "FOR_SALE", type:"application"},
        {"value": "60", "text": "下架审核中", "data": "SUSPEND_AUDIT", type:"application"},
        {"value": "70", "text": "下架", "data": "SUSPENDED", type:"application"},
        {"value": "0", "text": "暂存", "data": "TEMPORARY", type:"application"},
        {"value": "110", "text": "编辑中", "data": "EDITING", type:"other"},
        {"value": "1", "text": "解除暂存", "data": "REMOVETEMP", type:"other"}
    ],
    
    statusData4ZCool: [
       {"value": "", "text": "全部", "selected": true, type:"all"},
       {"value": "10", "text": "新建", "data": "NEW", type:"application"},
       {"value": "15", "text": "一审待审核", "data": "FIRSTAUDIT", type:"application"},
       {"value": "20", "text": "二审待审核", "data": "AUDIT_WAIT", type:"application"},
       {"value": "100", "text": "审核中", "data": "AUDITING", type:"application"},
       {"value": "30", "text": "预审不通过", "data": "AUDIT_FAILED", type:"application"},
       {"value": "50", "text": "上架", "data": "FOR_SALE", type:"application"},
       {"value": "60", "text": "下架审核中", "data": "SUSPEND_AUDIT", type:"application"},
       {"value": "70", "text": "下架", "data": "SUSPENDED", type:"application"}
   ],
  
    sourceData: [
        {"value": "", "text": "全部", "selected": true},
        {"value": "0", "text": "个性化中心", "data": "MEIZU"},
        {"value": "1", "text": "站酷网", "data": "ZCOOL"}
    ],
    
    blockType: [
        {"value": "banner", "text": "轮播区", "data": "BANNER", "type": "ad", "columns":-1},
        {"value": "advertise", "text": "广告", "data": "AD", "type": "ad", "columns":-1},

        {"value": "row1_col3", "text": "推荐合集1行3列", "data": "RANK_ROW1_COL3", "type": "rank", "columns":3, "bizType":"themes"},
        {"value": "rank", "text": "主题排行", "data": "RANK", "type": "rank", "columns":3, "bizType":"themes"},
        {"value": "pap_rank", "text": "壁纸排行", "data": "WALLPAPER_RANK", "type": "pap_rank", "columns":3, "bizType":"wallpapers"},
        {"value": "ring_rank", "text": "铃声排行", "data": "RINGTONE_RANK", "type": "ring_rank", "columns":1, "bizType":"ringtones"},

        {"value": "special", "text": "专题", "data": "SPECIAL", "type": "special", "columns":-1},
        {"value": "category", "text": "菜单分类", "data": "CATEGORY", "type": "other", "columns":-1}
    ],

    adType: [
        {"value": "app", "text": "主题", "data": "APP", "type": "theme", "bizType":"themes", "withContent":1},
        {"value": "special", "text": "主题专题", "data": "SPECIAL", "type": "theme_special", "bizType":"themes", "withContent":1},
        {"value": "theme_category", "text": "主题分类", "data": "THEME_CATEGORY", "type": "theme_category", "bizType":"themes", "withContent":0 },
        {"value": "theme_rank", "text": "主题排行", "data": "THEME_RANK", "type": "theme_rank", "bizType":"themes", "withContent":0},
        {"value": "theme_special_list", "text": "主题专题列表", "data": "THEME_SPECIAL_LIST", "type": "theme_special_list", "bizType":"themes", "withContent":0},

        {"value": "ringtone_special", "text": "铃声专题", "data": "RINGTONE_SPECIAL", "type": "ringtone_special", "bizType":"ringtones", "withContent":1},
        {"value": "ringtone_category", "text": "铃声分类", "data": "RINGTONE_CATEGORY", "type": "ringtone_category", "bizType":"ringtones", "withContent":0 },
        {"value": "ringtone_rank", "text": "铃声排行", "data": "RINGTONE_RANK", "type": "ringtone_rank", "bizType":"ringtones", "withContent":0 },
        {"value": "ringtone_special_list", "text": "铃声专题列表", "data": "RINGTONE_SPECIAL_LIST", "type": "ringtone_special_list", "bizType":"ringtones", "withContent":0},

        {"value": "wallpaper_special", "text": "壁纸专题", "data": "WALLPAPER_SPECIAL", "type": "wallpaper_special", "bizType":"wallpapers", "withContent":1},
        {"value": "wallpaper_category", "text": "壁纸分类", "data": "WALLPAPER_CATEGORY", "type": "wallpaper_category", "bizType":"wallpapers", "withContent":0 },
        {"value": "wallpaper_rank", "text": "壁纸排行", "data": "WALLPAPER_RANK", "type": "wallpaper_rank", "bizType":"wallpapers", "withContent":0},
        {"value": "wallpaper_special_list", "text": "壁纸专题列表", "data": "WALLPAPER_SPECIAL_LIST", "type": "wallpaper_special_list", "bizType":"wallpapers", "withContent":0}
        
    ],
    
    adSizeType: [
         {"value": "4", "text": "大图", "type": "一行一张", "data":"BIG" },
         {"value": "2", "text": "中图", "type": "一行两张", "data":"MIDDLE" },
         {"value": "3", "text": "中小图", "type": "一行三张", "data":"TRIPLE" },
         {"value": "1", "text": "小图", "type": "一行四张", "data":"SMALL" },
    ],
    
    category: [
        {"value": "1", "text": "应用", "data": "APP"},
        {"value": "2", "text": "游戏", "data": "GAME"},
        {"value": "5", "text": "主题", "data": "THEME"},
        {"value": "7", "text": "壁纸", "data": "WALLPAPER"},
        {"value": "8", "text": "铃声", "data": "RINGTONE"},
        {"value": "1", "text": "应用", "data": "APPV3"},
        {"value": "1", "text": "应用", "data": "PORTAL_APP"},
        {"value": "2", "text": "游戏", "data": "PORTAL_GAME"},
        {"value": "5", "text": "主题", "data": "PORTAL_THEME"},
        {"value": "1", "text": "应用", "data": "APP_ALI"},
    ],
    
    wordType: [
        {"value": "1", "text": "软件", "data": "CONTENT"},
        {"value": "2", "text": "搜索关键字", "data": "WORD"}
    ],
    
    rankType: [
        {"value": "1", "text": "自动精品", "data": "AUTO_FEED"},
        {"value": "2", "text": "自动最热", "data": "AUTO_HOT"},
        {"value": "3", "text": "自动新品", "data": "AUTO_NEW"},
        {"value": "4", "text": "手动", "data": "MANUAL"},
        {"value": "5", "text": "混合精品", "data": "MIX_FEED"},
        {"value": "6", "text": "混合最热", "data": "MIX_HOT"},
        {"value": "7", "text": "混合新品", "data": "MIX_NEW"}
    ],
    
    priceType: [
        {"value": "0", "text": "全部", "data": "0"},
        {"value": "1", "text": "收费", "data": "1"},
        {"value": "2", "text": "免费", "data": "2"}
    ],

    // 权限树
    privilegeTree: [
        {"value": "CONTENT", "text": "内容管理", "menus":[{"value": "ENTER", "text": "内容管理", "module" : "CONTENT"}]},
        {"value": "SALE", "text": "销售管理", "menus":[{"value": "ENTER", "text": "销售管理"}]},
        {"value": "COLUMN", "text": "栏目管理", "menus":[{"value": "ENTER", "text": "栏目管理"}, {"value": "PAGE", "text": "页面管理", "module" : "PAGE"},{"value": "ACTIVITY", "text": "活动管理", "module" : "ACTIVITY"}]},
        {"value": "CONFIG", "text": "基础设置", "menus":[{"value": "ENTER", "text": "基础设置"}]},
        {"value": "PERMISSION", "text": "权限管理", "menus":[{"value": "ENTER", "text": "权限管理"}]}
    ],
    
    defaultNum : [
                  {  value:30, data:"blockMax"  },
                  {  value:300, data:"rankMax"  },
    ],
    
    status4RingAndPaper : [
         {"value": "0", "text": "下架"},
         {"value": "1", "text": "上架"}
   ],

    PAGE_MODULE_TYPE : {
    /**
     *  0--首页
     */
    "INDEX" : 0,
    /**
     *  1--排行榜
     */
    "RANK" : 1, // 排行榜
    /**
     *  2--分类
     */
    "CATEGORY" : 2, // 分类
    /**
     *  3--限免
     */
    "LIMIT" : 3, // 限免
    /**
     *  4--特价
     */
    "SPECIAL" : 4, // 特价
    /**
     *  5--栏目、作者
     */
    "COLUMN_AND_AUTHOR" : 5 // 栏目、作者
    },

   PAGE_TYPE : {
    /**
     *  0-- 顶级页面
     */
    "TOP" : 0,  // 顶级页面
    /**
     *  1-- 父页面
     */
    "PARENT" : 1, // 父页面
    /**
     *  2-- 入口位
     */
    "ENTRY" : 2, // 入口位
    /**
     *  3-- banner
     */
    "BANNER" : 3, // banner
    /**
     *  4-- 排行榜
     */
    "RANK" : 4, // 排行榜
    /**
     *  5-- 分类
     */
    "CATEGORY" : 5, // 分类
    /**
     *  6-- 限免
     */
    "LIMIT" : 6, // 限免
    /**
     *  7-- 特价
     */
    "SPECIAL" : 7, // 特价
    /**
     *  8-- 栏目
     */
    "COLUMN" : 8, // 栏目
    /**
     *  9-- 作者
     */
    "AUTHOR" : 9
    //   ,  // 作者
    ///**
    // *  10-- 新限免
    // */
    //"NEW_LIMIT" : 10,
    ///**
    // *  11-- 许愿墙
    // */
    //"WISHING_WALL" : 11
    },

    /**
     * 限免的模块类型
     */
    PAGE_LIMIT_MODULE_TYPE : {
        /**
         *  1--老限免
         */
        "OLD_LIMIT" : 1,
        /**
         *  2--新限免
         */
        "NEW_LIMIT" : 2,
        /**
         *  3--许愿墙
         */
        "WISHING_WALL" : 3
    },
    /**
     * 特价的模块类型
     */
    PAGE_SPECIAL_MODULE_TYPE : {
        /**
         *  1--老特价
         */
        "OLD_SPECIAL" : 1,
        /**
         *  2--新特价
         */
        "NEW_SPECIAL" : 2
    },
    /**
     * 用户选择的类型
     */
     USER_TYPE : {
        /**
         *  1--男频
         */
        "MAN_CHOICE" : 1,
        /**
         *  2--女频
         */
        "WOMAN_CHOICE" : 2,
        /**
         *  4--出版物
         */
        "PUBLICATION" : 4
    },


    getProductId: function(data) {
        var id = null;
        $.each(Enums.product, function (i, n) {
            if (n.data == data) {
                id = n.id;
            }
        });

        return id;
    },

    getProductIdByValue: function(data) {
        var id = null;
        $.each(Enums.product, function (i, n) {
            if (n.value == data) {
                id = n.id;
            }
        });
        
        return id;
    },
    
    getText:function(arrayName, value) {
        var array = Enums[arrayName];
        if(!array) {
            console.log("名称为[" + arrayName + "]的数组不存在于Enums中");
            return;
        }
        var text = null;
        $.each(array, function (i, n) {
            if (n.value == value) {
                text = n.text;
            }
            if(value == 'themes'){
                text = '主题';
            }
        });
        
        return text;
    },
    
    getTextByData:function(arrayName, data) {
        var array = Enums[arrayName];
        if(!array) {
            console.log("名称为[" + arrayName + "]的数组不存在于Enums中");
            return;
        }
        
        var text = null;
        $.each(array, function (i, n) {
            if (n.data == data) {
                text = n.text;
            }
        });
        
        return text;
    },
    
    getValueByData:function(arrayName, data) {
        var array = Enums[arrayName];
        if(!array) {
            console.log("名称为[" + arrayName + "]的数组不存在于Enums中");
            return;
        }
        
        var value = null;
        $.each(array, function (i, n) {
            if (n.data == data) {
                value = n.value;
            }
        });
        
        return value;
    },
    
    getBlockText: function (value) {
        var text = null;
        $.each(Enums.blockType, function (i, n) {
            if (n.value == value) {
                text = n.text;
            }
        });

        return text;
    },
    getBlockType: function (value) {
        var type = null;
        $.each(Enums.blockType, function (i, n) {
            if (n.value == value) {
                type = n.type;
            }
        });

        return type;
    },
    getBizTypeByBlockType: function (blockType) {
        var bizType = null;
        $.each(Enums.blockType, function (i, n) {
            if (n.value == blockType) {
                bizType = n.bizType;
            }
        });
        
        return bizType;
    },
    
    getBlockColumns: function(blockType) {
        var columns = null;
        $.each(Enums.blockType, function (i, n) {
            if (n.value == blockType) {
                columns = n.columns;
            }
        });

        return columns;
    },
    
    getStatusText: function (value) {
        var text = '暂存';
        $.each(Enums.statusData, function (i, n) {
            if (n.value == value) {
                text = n.text;
            }
        });

        return text;
    },

    getSourceText: function (value) {
        var text = null;
        $.each(Enums.product, function (i, n) {
            if (n.data == value) {
                text = n.text;
            }
        });
        return text;
    },

    getProductData: function (value) {
        var data = null;
        $.each(Enums.product, function (i, n) {
            if (n.value == value) {
                data = n.data;
            }
        });

        return data;
    },
    
    getProductDataByAlias: function(alias) {
        var data = null;
        $.each(Enums.product, function (i, n) {
            if (n.alias == alias) {
                data = n.data;
            }
        });

        if(!data) {
            data = alias;
        }
        return data;
    },
    
    getProductAlias: function(data) {
        var value = null;
        $.each(Enums.product, function (i, n) {
            if (n.data == data) {
                value = n.alias;
            }
        });
        if(!value) {
            value = data;
        }
        return value;
    },
    
    getProductValue: function (data) {
        var value = null;
        $.each(Enums.product, function (i, n) {
            if (n.data == data) {
                value = n.value;
            }
        });

        return value;
    },
    
    getRealProductValue: function (product,bizType) {
        var value = null;
        $.each(Enums.realProduct, function (i, n) {
            if (n.bizType == product+'_'+bizType) {
                value = n.product;
            }
        });

        return value;
    },
    
    getRealProductText: function (product,bizType) {
        var text = null;
        $.each(Enums.realProduct, function (i, n) {
            if (n.bizType == product+'_'+bizType) {
                text = n.text;
            }
        });
        
        return text;
    },
    
    getRealProductDataByValue: function (product,bizType) {
        var data = null;
        $.each(Enums.realProduct, function (i, n) {
            if (n.bizType == product+'_'+bizType) {
                data = n.data;
            }
        });
        return data;
    },
    
    getBizIdByValue: function (product,bizType) {
        var bizId = null;
        $.each(Enums.realProduct, function (i, n) {
            if (n.bizType == product+'_'+bizType) {
                bizId = n.bizId;
            }
        });
        return bizId;
    },
    
    getProductValueById: function(catId) {
        if(1 == catId) {
            return "apps";
        } else if(2 == catId) {
            return "games";
        } else if(5 == catId) {
            return "themes";
        } else {
            return "errorCatId";
        }
    },
    getProductText: function (value) {
        var text = null;
        $.each(Enums.product, function (i, n) {
            if (n.value == value) {
                text = n.text;
            }
        });

        return text;
    },
    getWordText: function(value){
        var text = null;
        $.each(Enums.wordType, function (i, n) {
            if (n.value == value) {
                text = n.text;
            }
        });
        return text;
    },
    getCategoryText: function(value){
        var text = null;
        $.each(Enums.category, function (i, n) {
            if (n.value == value) {
                text = n.text;
            }
        });
        return text;
    },
    getCategoryValue: function(data){
        var value = null;
        $.each(Enums.category, function (i, n) {
            if (n.data == data) {
                value = n.value;
            }
        });
        return value;
    },
    getRankTypeText: function(value){
        var text = null;
        $.each(Enums.rankType, function (i, n) {
            if (n.value == value) {
                text = n.text;
            }
        });
        return text;
    },
    getAdTypeListByBizType : function( bizType ){
        var adTypeList = [];
        $.each( Enums.adType, function(i, n){
            if( n.bizType == bizType ){
                adTypeList.push(n);
            }
        });
        return adTypeList;
    },
    getAdTypeByValue : function( value ){
        var adType = null;
        $.each( Enums.adType, function(i, n){
            if( n.value == value.toLowerCase() ){
                adType = n;
                return;
            }
        });
        return adType;
    },
    getRingAndPaperStatus : function( value ){
        var status = "未知状态";
        
        $.each( Enums.status4RingAndPaper, function(i, n){
            if( n.value == value ){
                status = n.text;
                return false;
            }
        });
        return status;
    }
};

//var PAGE_MODULE_TYPE = {
//    /**
//     *  0--首页
//     */
//    "INDEX" : 0,
//    /**
//     *  1--排行榜
//     */
//        "RANK" : 1, // 排行榜
//    /**
//     *  2--分类
//     */
//        "CATEGORY" : 2, // 分类
//    /**
//     *  3--限免
//     */
//        "LIMIT" : 3, // 限免
//    /**
//     *  4--特价
//     */
//        "SPECIAL" : 4, // 特价
//    /**
//     *  5--栏目、作者
//     */
//        "COLUMN_AND_AUTHOR" : 5 // 栏目、作者
//};
//
//var PAGE_TYPE = {
//    /**
//     *  0-- 顶级页面
//     */
//    "TOP" : 0,  // 顶级页面
//    /**
//     *  1-- 父页面
//     */
//    "PARENT" : 1, // 父页面
//    /**
//     *  2-- 入口位
//     */
//    "ENTRY" : 2, // 入口位
//    /**
//     *  3-- banner
//     */
//    "BANNER" : 3, // banner
//    /**
//     *  4-- 排行榜
//     */
//    "RANK" : 4, // 排行榜
//    /**
//     *  5-- 分类
//     */
//    "CATEGORY" : 5, // 分类
//    /**
//     *  6-- 限免
//     */
//    "LIMIT" : 6, // 限免
//    /**
//     *  7-- 特价
//     */
//    "SPECIAL" : 7, // 特价
//    /**
//     *  8-- 栏目
//     */
//    "COLUMN" : 8, // 栏目
//    /**
//     *  9-- 作者
//     */
//    "AUTHOR" : 9,  // 作者
//    /**
//     *  10-- 新限免
//     */
//    "NEW_LIMIT" : 10,
//    /**
//     *  11-- 许愿墙
//     */
//    "WISHING_WALL" : 11
//};