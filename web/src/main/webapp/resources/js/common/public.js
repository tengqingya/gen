Date.prototype.format = function (format) {
    /*
     * format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

var util = {
    dayInterval: function (day, num) {
        var dayInterval;
        dayInterval = new Date(day).valueOf() + 1000 * 3600 * 24 * num;
        dayInterval = new Date(dayInterval).format("yyyy-MM-dd");
        return dayInterval;
    },

    //获取URL中参数, 可放到工具库中
    getUrlParam: function (key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },

    // 获取产品名称
    getProduct: function() {
    	var products = (parent.frames["headFrame"] || parent.parent.frames["headFrame"]).document.getElementsByClassName("top_current");
    	if(products.length > 0) {
    		return products[0].getAttribute("data-product");
    	} else {
    		return null;
    	}

    },
    
    // 管理后台入口 及资源的简短名称 
    simpleName: function(name) {
    	return name.replace(/管理后台-|阿里应用中心|应用中心|游戏中心|个性中心|应用中心3.X|个性商店|游戏商店|应用商店|入口/g, "").replace(/轻应用{1}/, "");
    },
    
    // 同步的get请求方法
    sync_get: function (url, params) {
        var data = null;
        $.ajax({
            url: url,
            async: false,
            data: params,
            success: function (result) {
                if (result.code == 200) {
                    data = result.value;
                } else {
                    alert(result.message);
                }
            }
        });

        return data;
    },

    getPageId: function () {
        return $("#pageId").val();
    },
    uploadF: function (id, completeFn) {
        $("#" + id).uploadify({
            'swf': "/resources/cc-manage/plugin/uploadify/uploadify.swf", //flash文件的相对路径
            'uploader': "/console/common/upload", //后台处理程序的相对路径
            'width': '86',
            'height': '32',
            'fileObjName': '文本', //设置上传文件名称,默认为Filedata
            'fileSizeLimit': '1MB',  //文件大小限制
            'queueID': "icon_progress", //文件队列的ID，该ID与存放文件队列的div的ID一致
            'fileTypeDesc': 'txt文件', //用来设置选择文件对话框中的提示文本
            'fileTypeExts': '*.txt', //设置可以选择的文件的类型
            'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
            'multi': false, //设置为true时可以上传多个文件
            'queueSizeLimit': 1,
            'buttonClass': 'btn-info',
            'buttonText': '上传', //浏览按钮的文本，默认值：BROWSE
            'progressData': 'percentage', //上传队列显示的数据类型，percentage是百分比，speed是上传速度
            //回调函数
            'onUploadError': function (file, errorCode, errorMsg) {
                if (errorMsg.indexOf("500") >= 0) {
                    asyncbox.alert("上传服务器出错", "提示");
                }
            },
            'onSelectError': function (file, errorCode, errorMsg) {
                if (errorMsg.indexOf("size") >= 0) {
                    asyncbox.alert("上传的文件大小超过限制，不得超过1MB", "提示");
                } else if (errorMsg.indexOf("type") >= 0) {
                    asyncbox.alert("上传的文件类型不正确", "提示");
                }
                return false;
            },
            'onUploadSuccess': function (file, data) {
                completeFn(data);
            }
        });
    },
    uploadFile: function (id, completeFn) {
        if (window.FormData) {
            $('#' + id).html5uploader({
                auto: true,
                multi: true,
                removeTimeout: 9999999,
                url: '/manage/upload/pic',
                //fileTypeExts: '.png,.jpg,.jpeg,.gif',
                onUploadStart: function () {
                    $('.filelist').hide();
                },
                onInit: function () {
                },
                onUploadError: function () {
                },
                onUploadComplete: function (file, data) {
                    completeFn(data,id);
                }
            });
        } else {
            $("#" + id).uploadify({
                'swf': "/resources/reader-manage/plugin/uploadify/uploadify.swf", //flash文件的相对路径
                'uploader': "/manage/upload/pic", //后台处理程序的相对路径
                'width': '86',
                'height': '86',
                'fileObjName': '浏览', //设置上传文件名称,默认为Filedata
                'fileSizeLimit': '10MB',  //文件大小限制
                'queueID': "icon_progress", //文件队列的ID，该ID与存放文件队列的div的ID一致
                'fileTypeDesc': 'png文件,jpg/jpeg文件,gif文件', //用来设置选择文件对话框中的提示文本
                //'fileTypeExts': '*.png;*.jpg;*.jpeg;*.gif;', //设置可以选择的文件的类型
                'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
                'multi': true, //设置为true时可以上传多个文件
                'queueSizeLimit': 10,
//                'buttonImage': '/resources/cc-manage/images/common/quick-icon.jpg',
                'buttonText': '', //浏览按钮的文本，默认值：BROWSE
                'progressData': 'percentage', //上传队列显示的数据类型，percentage是百分比，speed是上传速度
                //回调函数
                'onUploadError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("500") >= 0) {
                        asyncbox.alert("上传服务器出错", "提示");
                    }
                },
                'onSelectError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("size") >= 0) {
                        asyncbox.alert("上传的文件大小超过限制，不得超过1MB", "提示");
                    } else if (errorMsg.indexOf("type") >= 0) {
                        asyncbox.alert("上传的文件类型不正确", "提示");
                    }
                    return false;
                },
                'onUploadSuccess': function (file, data) {
                    completeFn(data,id);
                }
            });
        }
    },
    uploadPack: function (id, completeFn) {
       if (window.FormData) {
            $('#' + id).html5uploader({
                auto: true,
                multi: true,
                removeTimeout: 9999999,
                url: '/apps/upload',
                fileTypeExts: '.apk,.APK',
                onUploadStart: function () {
                    $('.filelist').hide();
                },
                onInit: function () {
                },
                onUploadError: function () {
                },
                onUploadComplete: function (file, data) {
                    completeFn(data, id);
                }
            });
        } else {
            $("#" + id).uploadify({
                'swf': "/resources/cc-manage/plugin/uploadify/uploadify.swf", //flash文件的相对路径
                'uploader': "/apps/upload", //后台处理程序的相对路径
                'width': '97',
                'height': '31',
                'fileObjName': 'apk', //设置上传文件名称,默认为Filedata
                'fileSizeLimit': '500MB',  //文件大小限制
                'queueID': "selectFileQueue", //文件队列的ID，该ID与存放文件队列的div的ID一致
                'fileTypeDesc': 'apk文件,APK文件', //用来设置选择文件对话框中的提示文本
                'fileTypeExts': '*.apk;*.APK;', //设置可以选择的文件的类型
                'multi': false, //设置为true时可以上传多个文件
                'queueSizeLimit': 1,
                'buttonImage': '',
                'buttonText': '浏览', //浏览按钮的文本，默认值：BROWSE
                'progressData': 'percentage', //上传队列显示的数据类型，percentage是百分比，speed是上传速度
                //回调函数
                'onUploadError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("500") >= 0) {
                        asyncbox.alert("上传服务器出错", "提示");
                    }
                },
                'onSelectError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("size") >= 0) {
                        asyncbox.alert("上传的文件大小超过限制，不得超过1MB", "提示");
                    } else if (errorMsg.indexOf("type") >= 0) {
                        asyncbox.alert("上传的文件类型不正确", "提示");
                    }
                    return false;
                },
                'onUploadSuccess': function (file, data) {
                    completeFn(data, id);
                }
            });
        }
    },
    uploadP: function (id, completeFn) {
        if (window.FormData) {
            $('#' + id).html5uploader({
                auto: true,
                multi: true,
                removeTimeout: 9999999,
                url: '/console/common/upload',
                fileTypeExts: '.png,.jpg,.jpeg',
                onUploadStart: function () {
                    $('.filelist').hide();
                },
                onInit: function () {
                },
                onUploadError: function () {
                },
                onUploadComplete: function (file, data) {
                    completeFn(data);
                }
            });
        } else {
            $("#" + id).uploadify({
                'swf': "/resources/cc-manage/plugin/uploadify/uploadify.swf", //flash文件的相对路径
                'uploader': "/console/common/upload", //后台处理程序的相对路径
                'width': '86',
                'height': '86',
                'fileObjName': '图标', //设置上传文件名称,默认为Filedata
                'fileSizeLimit': '1MB',  //文件大小限制
                'queueID': "icon_progress", //文件队列的ID，该ID与存放文件队列的div的ID一致
                'fileTypeDesc': 'png文件,jpg/jpeg文件', //用来设置选择文件对话框中的提示文本
                'fileTypeExts': '*.png;*.jpg;*.jpeg;', //设置可以选择的文件的类型
                'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
                'multi': false, //设置为true时可以上传多个文件
                'queueSizeLimit': 1,
                'buttonImage': '/resources/cc-manage/images/common/quick-icon.jpg',
                'buttonText': '', //浏览按钮的文本，默认值：BROWSE
                'progressData': 'percentage', //上传队列显示的数据类型，percentage是百分比，speed是上传速度
                //回调函数
                'onUploadError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("500") >= 0) {
                        asyncbox.alert("上传服务器出错", "提示");
                    }
                },
                'onSelectError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("size") >= 0) {
                        asyncbox.alert("上传的文件大小超过限制，不得超过1MB", "提示");
                    } else if (errorMsg.indexOf("type") >= 0) {
                        asyncbox.alert("上传的文件类型不正确", "提示");
                    }
                    return false;
                },
                'onUploadSuccess': function (file, data) {
                    completeFn(data);
                }
            });
        }
    },
    uploadImgStyle: function (id, completeFn) {
        if (window.FormData) {
            $('#' + id).html5uploader({
                auto: true,
                multi: true,
                removeTimeout: 9999999,
                url: '/console/common/upload',
                fileTypeExts: '.png,.jpg',
                onUploadStart: function () {
                    $('.filelist').hide();
                },
                onInit: function () {
                },
                onUploadError: function () {
                },
                onUploadComplete: function (file, data) {
                    completeFn(data);
                }
            });
        } else {
            $("#" + id).uploadify({
                'swf': "/resources/cc-manage/plugin/uploadify/uploadify.swf", //flash文件的相对路径
                'uploader': "/console/common/upload", //后台处理程序的相对路径
                'width': '86',
                'height': '86',
                'fileObjName': '图标', //设置上传文件名称,默认为Filedata
                'fileSizeLimit': '1MB',  //文件大小限制
                'queueID': "icon_progress", //文件队列的ID，该ID与存放文件队列的div的ID一致
                'fileTypeDesc': 'png文件,jpg文件', //用来设置选择文件对话框中的提示文本
                'fileTypeExts': '*.png;*.jpg;', //设置可以选择的文件的类型
                'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
                'multi': false, //设置为true时可以上传多个文件
                'queueSizeLimit': 1,
                'buttonImage': '/resources/cc-manage/images/common/quick-icon.jpg',
                'buttonText': '', //浏览按钮的文本，默认值：BROWSE
                'progressData': 'percentage', //上传队列显示的数据类型，percentage是百分比，speed是上传速度
                //回调函数
                'onUploadError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("500") >= 0) {
                        asyncbox.alert("上传服务器出错", "提示");
                    }
                },
                'onSelectError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("size") >= 0) {
                        asyncbox.alert("上传的文件大小超过限制，不得超过1MB", "提示");
                    } else if (errorMsg.indexOf("type") >= 0) {
                        asyncbox.alert("上传的文件类型不正确", "提示");
                    }
                    return false;
                },
                'onUploadSuccess': function (file, data) {
                    completeFn(data);
                }
            });
        }
    },
    datePickerInit: function (dom, type, compareDom, maxDate,container) {
        var years = new Date().getFullYear();
        $("#" + dom).datepicker({
            dateFormat: 'yy-mm-dd',
            currentText:"今天",
           // clearText: '清除',
           // closeText: '关闭',
            closeText: '清除',
            prevText: '前一月',
            nextText: '后一月',
            changeYear: true,
            maxDate: maxDate ? maxDate : null,
//            yearRange: '2009:' + years,
            changeMonth: true,
            monthNamesShort: [ '1', '2', '3', '4', '5', '6', '7', '8',
                '9', '10', '11', '12' ],
            dayNamesMin: [ '日', '一', '二', '三', '四', '五', '六' ],
            changeselect: true,
            showButtonPanel:true,
            container: container,
            onSelect: function (dateText) {
                var arys = dateText.split('-');
                $('#' + compareDom).datepicker('option', type,
                    new Date(arys[0], arys[1] - 1, arys[2]));
            },
            beforeShow : function(input, inst) {
                datepicker_CurrentInput = input;
            }
        });
        $("#ui-datepicker-div").delegate(".ui-datepicker-close","click",function(){
            datepicker_CurrentInput.value = "";
        });
    },
    
    //去除json数据空格
    replaceBr:function(str){
        var newStr=str.replace(/(\r\n|\n|\r)/gm, '<br>');
        return newStr;
    },
    
    //缩略图查看
    //container--图片所在容器id，默认myModal
    //imgClass--图片class，默认scn_img
    showFullImage: function(container, imgClass){
    	container = container || "myModal";
    	imgClass = imgClass || "scn_img";
    	$("body").append('<div id="imgContainer" style="display: none;">'
    			+ '<img id="showFullImage" alt=""/></div>');
    	$("#" + container).on("click", "img." + imgClass, function(e){
    		var img = new Image();
    		img.src = $(this).attr("src");
    		img.onload = function(){
    			var wid = img.width;
    			var hei = img.height;
    			if ( Math.min(wid, hei) > 300 ) {
    				var minW = Math.min(wid / 2.2, $(window).width());
    				var minH = Math.min(hei / 2.2, $(window).height());
    				if (minW == $(window).width()) {
    					hei = hei / (wid / minW);
    					wid = minW;
    				} else if (minH == $(window).height()) {
    					wid = wid / (hei / minH);
    					hei = minH;
    				} else {
    					wid = minW;
    					hei = minH;
    				}
    			}
    			
    			$("#showFullImage").attr({
    				src: img.src,
    				width: wid, 
    				height: hei
    			});
    			
        		$("#imgContainer").css({
            		"position": "absolute",
            		"z-index": 9999,
            		"left": ($(window).width() - wid)/2,
            		"top": ($(window).height() - hei)/2 + $(window).scrollTop()
            	}).hide().slideDown();
    		};
    	});
    	$("#imgContainer").on("click", "#showFullImage", function(){
    		$("#imgContainer").fadeOut();
    		$("#showFullImage").attr("src", "");
    	});
    },
    
    hideFullImage: function(){
    	$("#showFullImage").trigger("click");
    },
    
    getResolution: function(fn){
    	$.get('/console/common/basedata/get?type=RESOLUTION', function(data){
    		fn && fn.call(this, data);
    	});
    },
    getAdVersion: function(fn){
        $.get('/console/common/basedata/get?type=AD_VERSION', function(data){
            fn && fn.call(this, data);
        });
    },
    status_list:function(statusData,id,list,text,num,flag){
        $('.'+id).click(function () {
            var $dropDown = $("."+list);
            $dropDown.empty();
            if(num == '0'){
                for(var i=0;i<statusData.length;i++){
                    var typs = statusData[i].type.split(",");
                    if ( $.inArray("application", typs) == -1 && $.inArray("all", typs) == -1) {
                        continue;
                    }
                    var li = $("<li role='presentation'><a role='menuitem' tabindex='-1' href='javascript:void(0);' value=" + statusData[i].value + ">" + statusData[i].text + "</a></li>");
                    $dropDown.append(li);
                }
            }else{
                for(var i=1;i<statusData.length;i++){
                    var typs = statusData[i].type.split(",");
                    if(statusData[i].value == '1' && $.inArray("all", typs) == -1){
                        var li_1 = $("<li role='presentation'><a role='menuitem' tabindex='-1' href='javascript:void(0);' value=" + statusData[i].value + ">" + statusData[i].text + "</a></li>");
                    }
                    if ( $.inArray("application", typs) == -1 && $.inArray("all", typs) == -1) {
                        continue;
                    }
                    var li = $("<li role='presentation'><a role='menuitem' tabindex='-1' href='javascript:void(0);' value=" + statusData[i].value + ">" + statusData[i].text + "</a></li>");
                    $dropDown.append(li);
                }
                if(flag =='1'){
                    $dropDown.append(li_1);
                }
            }

        });
        $('.'+list).delegate('li a', 'click', function () {
            $("#"+text).text($(this).text());
            var value = $(this).attr('value');
            $("#"+text).attr("value", value);
            $("input[name =status]").attr("value", value);
        });
    },
    dropDown:function(id,text,inp){
        $('.'+id).delegate('li a', 'click', function () {
            $("#"+text).text($(this).text());
            var value = $(this).attr('value');
            $("input[name ="+inp+"]").attr("value", value);
            $("#"+text).attr("value", value);
        });
    },
    numCheck:function(class1,id2){
        $("."+class1).delegate("#"+id2,"keyup  paste",function(){
            $(this).val($(this).val().replace(/[^0-9]/g,''));
        }),function(){  //CTR+V事件处理
            $(this).val($(this).val().replace(/[^0-9]/g,''));
        };
    },/*,

    loginCallback: function(data){
        data = data.reply;
        if(data && data.nickname){
            //$('#J_admin', parent.frames['headFrame'].document).val(data.uid);
            //$('#nickname', parent.frames['headFrame'].document).text(data.nickname);
        }else{
            parent.location = 'https://member.meizu.com/login.jsp?service=manage' +
                '&appuri=http://cc.manage.meizu.com/login&useruri=http://cc.manage.meizu.com';
        }
    }*/

    initAjaxSel: function(id, url){
        $.get(url, function(result){
            var _enums = result.value;//Enums[$(this).attr('data-enum')];
            if ( !_enums ) {return true;}

            var opts = [], $o = $('#' + id);
            $o.attr('data-sel-all')
            && opts.push("<li role='presentation'><a role='menuitem' tabindex='-1' href='javascript:void(0);' value=''>全部</a></li>");
            $.each(_enums, function(idx, item){
                opts.push("<li role='presentation'><a role='menuitem' tabindex='-1' href='javascript:void(0);' value='"
                    + item.id + "'>" + item.name + "</a></li>");
            });
            $o.append(opts.join(''));

            $o.on('click', 'a[role="menuitem"]', function(){
                var siblings = $(this).parent().parent().siblings();
                siblings.first().find('i').text($(this).text());
                siblings.last().val($(this).attr('value'));
            });
        });

    },
    formatNumber:function(n){
        //格式化金额，超过三位用逗号
        var str= n.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
        return str;
    },
    initDateInfo:function(num,startID,endID){
        //初始化日期控件
        var time = new Date();
        var _1MonthAgoTime = new Date(time.getTime() - num*24*3600*1000);
        var month =_1MonthAgoTime.getMonth(),date = _1MonthAgoTime.getDate(),monthSun,dateSun;
        var endMonth = time.getMonth() ,endDate = time.getDate(),endMonthSun,endDateSun;
        //startTime
        if(month+1 < 10){
            monthSun = '0'+(month+1);
        }else{
            monthSun = month+1 ;
        }
        if(date <10){
            dateSun = '0'+date;
        }else{
            dateSun = date;
        }
        //endTime
        if(endMonth +1 <10){
            endMonthSun = '0'+ (endMonth +1);
        }else{
            endMonthSun = endMonth +1;
        }

        if(endDate < 10){
            endDateSun = '0'+endDate;
        }else{
            endDateSun = endDate;
        }
        $("#"+startID).val(_1MonthAgoTime.getFullYear() + "-" + monthSun + "-" + dateSun);
        $("#"+endID).val(time.getFullYear() + "-" + endMonthSun + "-" + endDateSun);
    }
};

var oTable = {
	ooTable: null,
    dataTable: function (action, count, argument, insertResultFun, otherSetting) {
    	otherSetting = otherSetting || {};
    	otherSetting.tableId = otherSetting.tableId || "example";
    	if ( this.ooTable && otherSetting.refresh !== true ) {
    		$("#" + otherSetting.tableId).DataTable().draw( false );
    	} else {
    		pageCount = otherSetting.pageCount || 10;
        	isPage = otherSetting.isPage !== false;
            var json = {
                bAutoWidth: false,
                bFilter: false,
                bDestroy: true,
                bProcessing: true,
                bPaginate: isPage,
                bServerSide: true,
                sServerMethod: "POST",
                sAjaxSource: action,
                fnServerData: function (sUrl, aoData, fnCallback, oSettings) {
                    aoData.push({
                        name: "start",
                        value: aoData[3].value
                    }, {
                        name: "length",
                        value: aoData[4].value
                    });
                    aoData = aoData.concat(argument);
                    oSettings.jqXHR = $.ajax({
                        dataType: 'json',
                        url: sUrl,
                        data: aoData,
                        success: function (result) {
                            var currentPage= Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength );
                            insertResultFun(result,currentPage);
                            fnCallback(result);
                        }
                    });
                },
                bLengthChange: false,
                bSort: false,
                iDisplayLength: pageCount,
                oLanguage: {
                    sProcessing: "正在加载中......",
                    sLengthMenu: "每页显示 _MENU_ 条记录",
                    sZeroRecords: "对不起，查询不到相关数据！",
                    sEmptyTable: "表中无数据存在！",
                    sInfo: "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                    sInfoFiltered: "数据表中共为 _MAX_ 条记录",
                    oPaginate: {
                        sFirst: '第一页',
                        sLast: '最后一页',
                        sNext: '下一页',
                        sPrevious: '上一页'
                    }
                }
            };
            this.ooTable = $('#' + otherSetting.tableId).dataTable(json);
    	}
    },
    dataTableWihtCallback: function (action, count, argument, insertResultFun, callbackFn, otherSetting) {
        otherSetting = otherSetting || {};
        otherSetting.tableId = otherSetting.tableId || "example";
        if ( this.ooTable && otherSetting.refresh !== true ) {
            $("#" + otherSetting.tableId).DataTable().draw( false );
        } else {
            pageCount = otherSetting.pageCount;
            isPage = otherSetting.isPage !== false;
            var json = {
                bAutoWidth: false,
                bFilter: false,
                bDestroy: true,
                bProcessing: true,
                bPaginate: isPage,
                bServerSide: true,
                sServerMethod: "POST",
                sAjaxSource: action,
                fnServerData: function (sUrl, aoData, fnCallback, oSettings) {
                    aoData.push({
                        name: "start",
                        value: aoData[3].value
                    }, {
                        name: "length",
                        value: aoData[4].value
                    });
                    aoData = aoData.concat(argument);
                    oSettings.jqXHR = $.ajax({
                        dataType: 'json',
                        url: sUrl,
                        data: aoData,
                        success: function (result) {
                            var currentPage= Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength );
                            insertResultFun(result,currentPage);
                            fnCallback(result);
                            callbackFn(result);
                        }
                    });
                },
                bLengthChange: false,
                bSort: false,
                iDisplayLength: pageCount,
                oLanguage: {
                    sProcessing: "正在加载中......",
                    sLengthMenu: "每页显示 _MENU_ 条记录",
                    sZeroRecords: "对不起，查询不到相关数据！",
                    sEmptyTable: "表中无数据存在！",
                    sInfo: "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                    sInfoFiltered: "数据表中共为 _MAX_ 条记录",
                    oPaginate: {
                        sFirst: '第一页',
                        sLast: '最后一页',
                        sNext: '下一页',
                        sPrevious: '上一页'
                    }
                }
            };
            this.ooTable = $('#' + otherSetting.tableId).dataTable(json);
        }
    },
    dataTableNum: function (action, count, argument, insertResultFun,num) {
    	this.dataTable(action, count, argument, insertResultFun, {pageCount: num});
    },
    dataTableNoPage: function (action, count, argument, insertResultFun) {
    	this.dataTable(action, count, argument, insertResultFun, {pageCount: null, isPage: false,refresh: true});
    }
};

$(function () {
    //login
    //var $script = $("<script src='https://member.meizu.com/service/accounts/fetchOrder.jsonp?callback=util.loginCallback&v="+Math.random()+"'><\/script>");
    //$(document.body).append($script);
    //setTimeout(function(){
    //    $script.remove();
    //}, 0);

	//enter search
	$('form[role="search"]').on('keydown', ':text', function(evt){
    	if ( evt.which == 13 ) {
    		$(this).blur();//防止弹出新增界面
    		$(".J_search").trigger("click");
    	}
    });
	
    //auth
    $(document).ajaxSuccess(function(event, xhr, sett){
        if ( xhr.responseText == 'auth_fail' ) {
            alert('无操作权限；');
            //location = 'http://cc.manage.meizu.com/auth_fail';
            return;
        }
    });
    
    $('#myModal').on('show.bs.modal', function (e) {
        $('#validerrmsg').remove();
      });

    !util.getProduct() && flushPrivilege();
});

/**
 * 刷新权限树,初始化页面菜单
 * @param clickProduct
 */
function flushPrivilege(clickProduct) {
    $.ajax({
        url: "/manage/permissions",
        dataType: "json",
        async: true, //请求是否异步
        type: "GET",
        success: function(result) {
            if(result.code == 200) {
                var privilegeTree = result.value;
                var leeftTree = null;
                var productAlias = null;
                if( clickProduct ) {
                    // 选择xxx
                    productAlias = Enums.getProductAlias(clickProduct);
                    leftTree = privilegeTree[productAlias];
                } else {
                    // 页面初始化
                    var headHtml = [];
                    for(var index in Enums.privilegeTree) {
                        var privilege = Enums.privilegeTree[index];
                        var productTree = privilegeTree[privilege.value];
                        if(!productTree) {
                            continue;
                        }

                        var product = Enums.getProductDataByAlias(privilege.value);
                        var choice = (clickProduct!='' && clickProduct== product) || (headHtml.length == 0);
                        var choiceClass = choice ? ' top_current' : '';
                        var html = '<li><a href="javascript:void(0);" class="J_product'+ choiceClass
                            +'" data-product="'+ product +'">'+ privilege.text +'</a></li>';
                        headHtml.push(html);

                        if(choice) {
                            leftTree = privilegeTree[product];
                            productAlias = privilege.value;
                        }
                    }

                    // 把headHtml添加到 .top_menu
                    $(parent.frames["headFrame"].document.getElementById("J_top_menu")).empty().append(headHtml.join(''));

                }

                // 初始化左侧菜单
                var leftHtml = [];
                var menusInfo = null;
                for(var index in Enums.privilegeTree) {
                    var privilege = Enums.privilegeTree[index];
                    if(privilege.value == productAlias) {
                        menusInfo = privilege.menus;
                    }
                }

                if(menusInfo == null) {
                    console.log("[" + productAlias + "]不存在于权限树中");
                    return;
                }

                for(var menuIndex = 0; menuIndex < menusInfo.length; menuIndex++) {
                    var menu = menusInfo[menuIndex];
                    var menuContent = leftTree[menu.value];
                    if(!menuContent) {
                        if( privilegeTree[menu.module] ){
                            menuContent = privilegeTree[menu.module]["ENTER"];
                        }
                    }
                    if(!menuContent) {
                        continue;
                    }

                    leftHtml.push('<li class="menu"> <ul>');
                    var lv1_menu = '<li class="button"><a href="#" class=""><i class="glyphicon glyphicon-file icon"></i>'+ menu.text +'<span></span></a></li>';
                    leftHtml.push(lv1_menu);
                    leftHtml.push('<li class="dropdown none"> <ul>');

                    for(var index = 0; index < menuContent.length; index++) {
                        var content = menuContent[index];
                        leftHtml.push('<li><a href="#" data-href="' + content.resource + '">' + util.simpleName(content.name) + '</a></li>');
                    }
                    leftHtml.push('</ul> </li>  </ul>  </li>');
                }

                $(parent.frames["navFrame"].document.getElementById("drop-down")).empty().append(leftHtml.join(''));
                // 自动初始化左侧第一个菜单
                $("li.button", parent.frames["navFrame"].document).first().trigger("click");
            }
        },
//        complete: function(res) {
//            //请求完成的处理
//        },
        error: function(res) {
            //请求出错处理
            parent.location = 'https://member.meizu.com/logout.jsp?service=manage' +
                '&appuri=http://manage.ebook.meizu.com/login&useruri=http://manage.ebook.meizu.com';
        }
    });




}

