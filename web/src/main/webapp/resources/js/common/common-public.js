/**
 * @author Stone (shiquan@meizu.com)
 * @date 2015-5-23
 * @desc 可重用代码提取，包括插件、逻辑、业务三块
 */

// 插件相关
var pluginUtil = {

    /**
     * 初始化时间控件，包括日期和时间；根据元素data-type属性值来判定
     * @param $first {jquery object} 需要初始化的元素
     * @param type {string} minDate或maxDate
     * @param $compare {jquery object} 进行比较的元素
     */
    datePicker: function($first, type, $compare) {
        if ( $first.attr('data-type') == 'time' ) {
            $first.datetimepicker({
                closeText: '清除',
                currentText:"现在",
                dateFormat: "yy-mm-dd",
                timeFormat: "HH:mm:ss",
                showSecond: true,
                onSelect: function (dateText, inst) {
                    var date = $.datepicker.parseDateTime('yy-mm-dd', 'HH:mm:ss', dateText);
                    if ( $compare ) {
                        var dateCompare = $compare.val()
                            && $.datepicker.parseDateTime('yy-mm-dd', 'HH:mm:ss', $compare.val());

                        if ( (type.indexOf('min') != -1 && dateCompare && date.getTime() > dateCompare.getTime())
                                || (type.indexOf('max') != -1 && dateCompare && date.getTime() < dateCompare.getTime()) ) {
                            $.datepicker._setDateDatepicker($first[0], $compare.val());
                        }
//                        $compare.datetimepicker('option', type, date);
                    }
                },
                beforeShow: function(input, inst) {
                    pluginUtil.dpCurrentInput = input;
                }
            });
        } else {
            $($first).datepicker({
                dateFormat: 'yy-mm-dd',
                currentText:"今天",
                closeText: '清除',
                prevText: '前一月',
                nextText: '后一月',
                changeYear: true,
                yearRange:'2009:+10',
                changeMonth: true,
                monthNamesShort: [ '1', '2', '3',
                    '4', '5', '6', '7', '8', '9', '10', '11', '12' ],
                dayNamesMin: [ '日', '一', '二', '三', '四', '五', '六' ],
                changeselect: true,
                showButtonPanel:true,
                onSelect: function (dateText) {
                    $compare && $compare.datepicker('option'
                        , type, $.datepicker.parseDate('yy-mm-dd', dateText));
                },
                beforeShow: function(input, inst) {
                    pluginUtil.dpCurrentInput = input;
                }
            });
        }

        $("#ui-datepicker-div").on("click", ".ui-datepicker-close", function(){
            pluginUtil.dpCurrentInput.value = '';
        });
    },

    /**
     * 开始和结束日期时间初始化
     * @param $start 开始时间
     * @param $end 结束时间
     */
    normalDatePicker: function($start, $end){
        pluginUtil.datePicker($start, 'minDate', $end);
        pluginUtil.datePicker($end, 'maxDate', $start);
    },

    /**
     * 取色器初始化
     * @param $color {!jquery object}
     */
    colorPicker: function($color){
        $color.click(function(evt){
            if ( evt.target !== this ) return;
            $color.colpick({
                onSubmit: function(hsb, hex, rgb){
                    var color = '#' + hex;
                    $color.css("background-color", color)
                        .data('colpickId','')
                        .next().val(color);
                    $(".colpick.colpick_full").remove();
                }
            }).colpickSetColor($color.next().val());
        });
    },

    /**
     * 初始化上传控件，优先使用h5方式上传
     * @param $icon {jquery object} 需要初始化的元素
     * @param config {object} 参数控制：{type: ['.jpg','.png'], cb: function, size: '2MB'}
     */
    upload: function($icon, config){
        if (window.FormData) {
            $icon.html5uploader({
                auto: true,
                multi: true,
                removeTimeout: 9999999,
                url: '/common/upload',
                fileTypeExts: config.type.join(','),
                onUploadStart: function () {
                    $('.filelist').hide();
                },
                onInit: function () {},
                onUploadError: function () {},
                onUploadComplete: function (file, data) {
                    config.cb && config.cb(data);
                }
            });
        } else {
            $icon.uploadify({
                // flash文件的相对路径
                'swf': "/resources/ocean-manage/plugin/uploadify/uploadify.swf",
                // 后台处理程序的相对路径
                'uploader': "/common/upload",
                'width': '86',
                'height': '86',
                // 设置上传文件名称,默认为Filedata
                'fileObjName': '图标',
                // 文件大小限制
                'fileSizeLimit': config.size,
                // 文件队列的ID，该ID与存放文件队列的div的ID一致
                'queueID': "icon_progress",
                // 用来设置选择文件对话框中的提示文本
                'fileTypeDesc': config.type.join('文件,') + '文件',
                // 设置可以选择的文件的类型
                'fileTypeExts': '*' + config.type.join(',*'),
                // 设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
                'auto': true,
                // 设置为true时可以上传多个文件
                'multi': false,
                'queueSizeLimit': 1,
                'buttonImage': '/resources/ocean-manage/images/common/quick-icon.jpg',
                // 浏览按钮的文本，默认值：BROWSE
                'buttonText': '',
                // 上传队列显示的数据类型，percentage是百分比，speed是上传速度
                'progressData': 'percentage',
                // 回调函数
                'onUploadError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("500") >= 0) {
                        manageUtil.alert("上传服务器出错");
                    }
                },
                'onSelectError': function (file, errorCode, errorMsg) {
                    if (errorMsg.indexOf("size") >= 0) {
                        manageUtil.alert("上传的文件大小超过限制，不得超过" + config.size);
                    } else if (errorMsg.indexOf("type") >= 0) {
                        manageUtil.alert("上传的文件类型不正确");
                    }
                    return false;
                },
                'onUploadSuccess': function (file, data) {
                    config.cb && config.cb(data);
                }
            });
        }
    },

    uploadImg: function($icon, cb){
        pluginUtil.upload($icon, {
            type: ['.jpg', '.png'],
            cb: cb,
            size: '1MB'
        });
    },

    uploadExcel: function($icon, cb){
        pluginUtil.upload($icon, {
            type: ['.xls'],
            cb: cb,
            size: '1MB'
        });
    },

    uploadApk: function($icon, cb){
        pluginUtil.upload($icon, {
            type: ['.apk', '.APK'],
            cb: cb,
            size: '500MB'
        });
    },

    /**
     * 初始化datatable
     * @param settings {object} datatable 参数设置
     *      tableId {string} 表格id
     *      ajaxUrl {url} 加载数据接口
     *      pageCount {number} 每页显示数量
     *      isPage {boolean} 是否分页
     *      refresh {boolean} 是否重新加载，即返回到第一页
     *      cb {function} 完成加载数据后的回调，一般为填充表格数据
     *      commonPage {CommonPage} 通用页面对象
     *      argument {array} 查询参数
     */
    dataTable: function(settings) {
        manageUtil.requestStart();

        var _table = settings.tableId || "data-table",
            _count = settings.pageCount || 10,
            _page = settings.isPage !== false,
            _cb = settings.cb || $.noop;

        if ( pluginUtil.ooTable && settings.refresh !== true ) {
            $("#" + _table).DataTable().draw( false );
            return;
        }

        var json = {
            bAutoWidth: false,
            bFilter: false,
            bDestroy: true,
            bProcessing: false,
            bPaginate: _page,
            bServerSide: true,
            sServerMethod: "POST",
            sAjaxSource: settings.ajaxUrl,
            fnServerData: function (sUrl, aoData, fnCallback, oSettings) {
                aoData.push({
                    name: "start",
                    value: aoData[3].value
                }, {
                    name: "length",
                    value: aoData[4].value
                });
                aoData = aoData.concat(settings.argument);
                oSettings.jqXHR = $.ajax({
                    dataType: 'json',
                    url: sUrl,
                    data: aoData,
                    success: function (result) {
                        var currentPage= Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength );
                        _cb(result, currentPage, settings.commonPage);
                        fnCallback(result);
                    }
                });
            },
            bLengthChange: false,
            bSort: false,
            iDisplayLength: _count,
            oLanguage: {
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

        pluginUtil.ooTable = $('#' + _table).dataTable(json);
    }
};
var PU = pluginUtil;

// 逻辑相关工具类方法，要求0耦合，可100%移植到任何项目
var commonUtil = {

    /**
     * 除去参数中值为空的参数
     * @param params {array} [{name: '', value: ''}]
     * @returns {array} 除去了为空参数的数组
     */
    removeEmptyParam: function(params){
        $.each(params, function(idx, item){
            !item.value && (params[idx] = null);
        });

        return params;
    },

    /**
     * 从url中获取参数值
     * @param key {string} 需要获取值的名称
     * @returns {*} 未取到值返回null
     */
    getUrlParam: function(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
            r = window.location.search.substr(1).match(reg);

        if (r != null) return decodeURI(r[2]);

        return null;
    },

    /**
     * 限制输入数字
     * @param contain {selector} 需要进行限制输入元素的父容器
     * @param sel {selector} 需要进行限制输入元素
     */
    numCheck: function(contain, sel){
        $(contain).on("keyup  paste", sel, function(){
            $(this).val($(this).val().replace(/[^0-9]/g,''));
        });
    },

    /**
     * 将字符串进行html编码
     * @param str {string} 编码前
     * @returns {*} 编码后
     */
    encodeScript: function(str){
        return $('<div></div>').text(str)[0].innerHTML;
    },

    // base64转换工具
    base64Tool: {
        base64encodechars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        base64decodechars: new Array(
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
            52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
            -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
            -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
        base64encode: function (str) {
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += Base64Tool.base64encodechars.charAt(c1 >> 2);
                    out += Base64Tool.base64encodechars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += Base64Tool.base64encodechars.charAt(c1 >> 2);
                    out += Base64Tool.base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                    out += Base64Tool.base64encodechars.charAt((c2 & 0xf) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += Base64Tool.base64encodechars.charAt(c1 >> 2);
                out += Base64Tool.base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                out += Base64Tool.base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
                out += Base64Tool.base64encodechars.charAt(c3 & 0x3f);
            }
            return out;
        },
        base64decode: function (str) {
            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {

                do {
                    c1 = Base64Tool.base64decodechars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 == -1);
                if (c1 == -1)
                    break;

                do {
                    c2 = Base64Tool.base64decodechars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 == -1);
                if (c2 == -1)
                    break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = Base64Tool.base64decodechars[c3];
                } while (i < len && c3 == -1);
                if (c3 == -1)
                    break;
                out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = Base64Tool.base64decodechars[c4];
                } while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        },
        utf16to8: function (str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007f)) {
                    out += str.charAt(i);
                } else if (c > 0x07ff) {
                    out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
                } else {
                    out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
                }
            }
            return out;
        },
        utf8to16: function (str) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
                switch (c >> 4) {
                    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                    case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
                    break;
                    case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0f) << 12) |
                            ((char2 & 0x3f) << 6) |
                            ((char3 & 0x3f) << 0));
                        break;
                }
            }
            return out;
        }
    },

    /**
     * 获取脚本资源
     * @param urls {!array} 需加载的url列表
     * @param cb {?fn} 加载完成后的回调
     * @param idx {?number} 加载资源在列表中的索引
     */
    getResources: function(urls, cb, idx){
        if (!urls || !urls.length) {
            _.isFunction(cb) && cb();
            return;
        }

        idx = idx || 0;
        if (idx >= urls.length) {
            _.isFunction(cb) && cb();
        } else {
            var url = urls[idx];
            if (/.*\.css$/.test(url)) {
                $('head').append('<link rel="stylesheet" href="' + url + '"></link>');
                commonUtil.getResources(urls, cb, ++idx);
            } else {
                $.getScript(urls[idx], function(){
                    commonUtil.getResources(urls, cb, ++idx);
                });
            }
        }
    }
};
var CU = commonUtil;

// 业务相关，可高度重用的业务代码
var manageUtil = {

    /**
     * underscore template
     * @param templateId {!string} 模板id
     * @param data {?object} data
     * @param settings {?object}
     */
    tmpl: function (templateId, data, settings) {
        return _.template($('#' + templateId).html(), settings || {variable: 'data'})(data || {});
    },

    /**
     * bs modal alert
     * @param msg {*} 提示消息
     * @param autoOut {?boolean} 是否自动隐藏
     * @param callback {?fn} 点击确定后的回调
     * @param title {?string} 提示框title，默认为‘提示’
     */
    alert: function(msg, autoOut, callback, title){
        if ( _.isFunction(autoOut) ) {
            title = callback;
            callback = autoOut;
        }

        var commonShow = $('#common-modal').is(':visible');
        if ( commonShow ) {
            $('#common-modal').hide();
            $('.modal-backdrop.in:first').hide();
        }
        $('#alert-modal').modal('show');

        $('.alert-cancel').hide();
        title && $('#alert-label').text(title);
        $('#alert-body').html(msg);

        $('.alert-sure').off('click').on('click', function(){
            $('#alert-modal').modal('hide');
            if ( commonShow ) {
                $('#common-modal').show();
                $('.modal-backdrop.in:first').show();
            }
            _.isFunction(callback) && callback();
        });

        autoOut === true && setTimeout(function(){
            $('#alert-modal').modal('hide');
        }, 1000);
    },

    /**
     * bs modal confirm
     * @param msg {*} 提示消息
     * @param callback {?fn} 点击确定后的回调
     * @param title {?string} 提示框title，默认为‘提示’
     */
    confirm: function(msg, callback, title){
        var commonShow = $('#common-modal').is(':visible');
        if ( commonShow ) {
            $('#common-modal').hide();
            $('.modal-backdrop.in:first').hide();
        }
        $('#alert-modal').modal('show');

        $('.alert-cancel').show();
        title && $('#alert-label').text(title);
        $('#alert-body').html(msg);

        $('.alert-sure').off('click').on('click', function(){
            $('#alert-modal').modal('hide');
            if ( commonShow ) {
                $('#common-modal').show();
                $('.modal-backdrop.in:first').show();
            }
//            setTimeout(function(){
                _.isFunction(callback) && callback();
//            }, 0);
        });
    },

    /**
     * 初始化下拉选择框，包括设置选项和选择事件绑定
     * @param $sel {jquery object} 需要初始化的元素
     * @param data {array} 可选项 [{value: xx, text: 'xx'}]
     * @param selected {*} 初始化完成后需要选中的值
     * @param container {jquery object} 下拉框所在容器
     * @param onSelect {function} 下来选择后的回调
     */
    initSelect: function($sel, data, selected, container, onSelect) {
        var opts = [],
            _clone = $.extend(true, [], data),
            attr = $sel.attr('data-enum-attr').split(',');

        $sel.attr('data-sel-all') !== 'false' && _clone.unshift({value: '', text: '全部'});
        $.each(_clone, function (idx, item) {
            var attrHtml = [];
            $.each(attr, function () {
                if (!this) return;
                attrHtml.push('data-' + this + '="' + item[this] + '"');
            });
            opts.push([
                '<li role="presentation">',
                '<a role="menuitem" tabindex="-1" href="javascript:void(0);" ',
                attrHtml.join(''), ' value="',
                item.value, '">', item.text, '</a>',
                '</li>'].join(''));
        });
        $sel.empty().append(opts.join(''));

        $sel.off('click').on('click', 'a[role="menuitem"]', function () {
            $(this).parent().parent().siblings(':first').find('i').text($(this).text());
            var tmpInputHidden;
            if($(this).parents('.btn-group').siblings('input:hidden').length===0){
                tmpInputHidden=$(this).parents('.btn-group').siblings().find('input:hidden');
            }else{
                tmpInputHidden=$(this).parents('.btn-group').siblings('input:hidden');
            }
            tmpInputHidden
                .val($(this).attr('value')).trigger('value-change');

            onSelect && onSelect($(this));
        });

        selected !== undefined && $('a[role="menuitem"][value="' + selected + '"]', $sel).trigger('click');

        if (selected === null) { //清空下级
            var cleanAll = function ($ul) {
                var tmpInputHidden;
                if($ul.parent().siblings('input:hidden').length===0){
                    tmpInputHidden=$ul.parent().siblings().find('input:hidden');
                }else{
                    tmpInputHidden=$ul.parent().siblings('input:hidden');
                }
                var inpVal = tmpInputHidden.val();
                if (!$ul.length || _.find(_clone, function (item) {
                        return item.value == inpVal;
                    })) return;

                $ul.siblings(':first').find('i').text('请选择');
                var name = tmpInputHidden.val('').attr('name');
                container && cleanAll(container.find('[data-enum-parent="' + name + '"]').empty());
            }

            cleanAll($sel);
        }
    },

    /**
     * 枚举类型下拉框初始化，枚举key值以data-enum属性获取
     * @param $sel {jquery object} 需要初始化的元素
     * @param selected {*} 初始化完成后需要选中的值
     * @param onSelect {function} 下来选择后的回调
     */
    initEnumSelect: function($sel, selected, onSelect){
        var _enums = commonEnums[$sel.attr('data-enum')];

        if ( !_enums ) {
            console.error('未找到枚举：' + $sel.attr('data-enum'));
            return;
        }

        manageUtil.initSelect($sel, _enums, selected, null, onSelect);
    },

    /**
     * ajax类型下拉框初始化
     * @param $sel {jquery object} 需要初始化的元素
     * @param conf.url {url} 获取选项值接口的url
     * @param selected {*} 初始化完成后需要选中的值
     * @param conf.id {?string} 对应枚举value中的字段名称
     * @param conf.name {?string} 对应枚举text中的字段名称
     * @param conf.param {?object} 请求枚举附加参数
     */
    initAjaxSelect: function($sel, conf, selected){
        $.ajax(conf.url, {
            data: conf.param || {},
            async: false,
            success: function(bd){
                if ( bd.code != 200 ) return;

                var resultIn=$sel.attr('data-result-in');
                if(resultIn&&resultIn!="value"){
                    bd.value=bd.value[resultIn];
                }

                $.each(bd.value, function () {
                    conf.id && (this.value = this[conf.id]);
                    conf.name && (this.text = this[conf.name]);
                });
                conf.selMap && (conf.selMap[$sel.attr('data-enum')] = $.extend(true, {}, bd.value));
                manageUtil.initSelect($sel, bd.value, selected, conf.container, conf.onSelect);
            }
        });
    },

    /**
     * 级联下拉框初始化
     * @param $sel {jquery object} 需要初始化的元素
     * @param $parent {jquery object} 父节点
     * @param conf.url {url} 获取选项值url
     */
    initParentSelect: function ($sel, $parent, conf) {
        $parent.off('value-change').on('value-change', function () {
            var param = {};
            param[$parent.attr('name')] = $parent.val();
            manageUtil.initAjaxSelect($sel, {
                url: conf.url,
                param: $.extend(param, conf.paramFn && conf.paramFn() || {}),
                id: conf.id,
                name: conf.name,
                container: conf.container,
                onSelect: conf.onSelect
            }, null);
        });
    },

    /**
     * 图片上传完成后的回调
     * @param $icon {jquery object} 上传按钮
     * @param url {url} 上传图片返回的url
     */
    imgUploaded: function($icon, url){
        $icon.hide().after($('#img-upd-template').tmpl({url: url})[0].outerHTML);
        $icon.siblings('.url-hide').val(url);

        $('.J-del-img', $icon.siblings('.modify-icon')).click(function(){
            $(this).parent().siblings('.browse-file').show();
            $(this).parent().remove();
        });
    },

    /**
     * 获取当前页面所在产品
     * @returns {*}
     */
    getProduct: function() {
        var products = $('.top_current', (parent.frames["headFrame"] || parent.parent.frames["headFrame"]).document);
        if(products.length > 0) {
        	return products.attr("data-product");
        } else {
        	return null;
        }
    },

    /**
     * 管理后台入口 及资源的简短名称
     * @param name {string} 原始名称
     * @returns {string} 简称
     */
    simpleName: function(name) {
        var reg = /管理后台-|阿里应用中心|应用中心|游戏中心|个性中心|应用中心3.X|个性商店|游戏商店|应用商店|入口/g;

        return name.replace(reg, "").replace(/轻应用{1}/, "");
    },

    requestStart: function(){
        $('.loading-wrap').show();
    },

    requestEnd: function(){
        $('.loading-wrap').hide();
    },

   };
var MU = manageUtil;

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

/* 刷新权限树,初始化页面菜单 */
function flushPrivilege(clickProduct) {
	 $.ajax({
	        url: "/manage/permissions",
	        dataType: "json",
	        async: true, //请求是否异步
	        type: "GET",
	        success: function(result) {
	        	
        if(result.code != 200) return;

        var privilegeTree = result.value,
            leftTree = null, 
            productAlias = null;

        console.log("enter flushPrivilege");
        
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
            $('#J_top_menu', parent.frames["headFrame"].document).empty().append(headHtml.join(''));
            $(parent.frames["headFrame"]).resize();

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
            	//menuContent = privilegeTree[menu.module]["ENTER"];
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
                leftHtml.push('<li><a href="#" data-href="' + content.resource + '">' + manageUtil.simpleName(content.name) + '</a></li>');
            }

            leftHtml.push('</ul> </li>  </ul>  </li>');
        }

        $('#drop-down', parent.frames["navFrame"].document).empty().append(leftHtml.join(''));
        $(parent.frames["navFrame"].document.getElementById("drop-down")).empty().append(leftHtml.join(''));
        // 自动初始化左侧第一个菜单
        $("li.button", parent.frames["navFrame"].document).first().trigger("click");
    },
    error: function(res) {
    	//请求出错处理
    	parent.location = 'https://member.meizu.com/logout.jsp?service=manage' + '&appuri=http://manage.ebook.meizu.com/login&useruri=http://manage.ebook.meizu.com';
	}
});
}


$(function () {
    // 回车搜索
    $('form[role="search"]').on('keydown', ':text', function(evt){
        if ( evt.which == 13 ) {
            // 防止弹出新增界面
            $(this).blur();
            $(".opt-search").trigger("click");
        }
    });

    !manageUtil.getProduct() && flushPrivilege();

    $(document).ajaxSend(function(){
        manageUtil.requestStart();
    }).ajaxStop(function(){
        manageUtil.requestEnd();
    });

    $('#common-modal').on('hidden.bs.modal', function () {
        $('#validerrmsg').remove();
        $('#common-body').empty();
    });
});
