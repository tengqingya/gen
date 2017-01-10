/**
 * @author Stone (shiquan@meizu.com)
 * @date 2015-5-23
 * @description 管理后台通用页面配置控件，通过js配置自动生成管理页面
 */

(function(){
    'use strict';

    // 常量定义
    var constants = {
        // 字段类型对应不同的template
        FILED_DEFAULT_MAP: {
            text: {tmpl: 'input-template', columnClz: 'align-left'},
            select: {tmpl: 'select-template', columnClz: 'align-center'},
            radio: {tmpl: 'input-template', columnClz: 'align-center'},
            date: {tmpl: 'date-template', columnClz: 'align-center', type: 'text'},
            time: {tmpl: 'date-template', columnClz: 'align-center', type: 'text'},
            unixtime: {tmpl: 'date-template', columnClz: 'align-center', type: 'text'},
            textarea: {tmpl: 'textarea-template', columnClz: 'text'},
            number: {tmpl: 'input-template', columnClz: 'align-right', type: 'text'},
            img: {tmpl: 'img-init-template', columnClz: 'align-center'},
            color: {tmpl: 'color-template', columnClz: 'align-center', type: 'text'}
        },

        // 默认操作对应的名称和显示位置
        OPT_MAP: {
            add: { text: '新增', single: false},
            upd: { text: '修改', single: true},
            del: { text: '删除', single: true},
            search: { text: '查询', single: false},
            info: { text: '详情', single: true},
            copy: { text: '复制', single: true}
        },

        // 不同字段类型对应的插件资源
        SOURCE_MAP: {
            date: [
                '/resources/node-ebook-manage/css/jquery-ui.css',
                '/resources/node-ebook-manage/js/plugin/jquery-ui-datepicker.js'
            ],
            time: [
                '/resources/node-ebook-manage/css/jquery-ui.css',
                '/resources/node-ebook-manage/js/common/jquery-ui.js',
                '/resources/node-ebook-manage/js/plugin/jquery-ui-timepicker-addon.js'
            ],
            unixtime: [
                   '/resources/node-ebook-manage/css/jquery-ui.css',
                   '/resources/node-ebook-manage/js/common/jquery-ui.js',
                   '/resources/node-ebook-manage/js/plugin/jquery-ui-timepicker-addon.js'
            ],
            img: [
                '/resources/node-ebook-manage/plugin/uploadify/uploadify.css',
                '/resources/node-ebook-manage/plugin/uploadify/html5uploader.css',
                '/resources/node-ebook-manage/plugin/uploadify/jquery-uploadify.min.js',
                '/resources/node-ebook-manage/plugin/uploadify/jquery.html5uploader.js'
            ],
            color: [
                '/resources/node-ebook-manage/css/color-picker.css',
                '/resources/node-ebook-manage/js/plugin/color-picker.js'
            ]
        },

        // logger 格式
        LOGGER_LOGO: '||**** COMMON PAGE LOGGER ****||\n'
    }

    /**
     * 通用页面构造器，提供默认的参数值
     * @constructor
     */
    function CommonPage(){
        // config对应每个页面需提供的配置
        this.config = {
            // 页面需要配置的字段，格式如下
            // fileds: [{
            //      name {!string} 字段名称，要求与接口传递字段保持一致
            //      text {!string} 字段中文名称
            //      type {?string} 字段类型，默认值text，可选值【text||hidden||textarea||select||img||color||radio||date||time||number】
            //      isId: {?boolean} 是否主键字段
            //      value {?*} 初始值
            //      width {?string} 列宽【10%||100px】
            //      checkType {?string} 验证类型，支持多个，以空格隔开，包括【
            //              required 不能为空，并在后面自动加*号
            //              url  表示 输入网址
            //              date 日期格式 xxxx-xx-xx
            //              mail 邮箱
            //              number 数字，可以整型，浮点型。
            //              char 英文
            //              chinese 中文
            //              range="2.1~3"   表示值在[2.1~3]之间，并check-type="number"
            //              range="2.1,2,4,5"   表示值在只能填现数字，并check-type="number"
            //      】
            //      checkMessage {?object} 验证提示 {required-message: '', url-message: ''}
            //      opts {?array} 默认全部操作，该字段在哪些操作中显示，可选值：【add||upd||list||search||info】
            //      attrs {} 字段需要额外添加的属性，命名自定
            //      enumName {?string} select类型必填，对应枚举
            //      enumId {?string} select类型，对应value值
            //      enumText {?string} select类型，对应name值
            //      enumParent {?string} 级联上级字段
            //      enumAttr {?string} 附加给下拉框选项的值，多个以逗号分隔，以data-name形式存在
            //      onSelect {?function} 选择选项后回调，参数为选择项jquery object
            //      selectAll {?boolean} select是否有全部选择项,默认true
            // }, {}]
            fileds: [],

            // 页面需配置的操作，格式如下
            // opts: [{
            //      opt {!string} 操作类型，默认提供增删改查复制，也可以添加自定义方法
            //          系统提供操作【add--新增||upd--修改||del--删除||search--查询||info--详情||copy--复制】
            //      optText {?string|function} 自定义方法必填，操作中文名称，为function时，参数是该行的数据
            //      url {!url} 接口调用url
            //      callbackFn {?function} 完成操作后的回掉，参数为后台接口返回的result
            //      initFn {?function} 初始化操作，参数为 fileds_relative obj
            //      single {?boolean} 是否针对每条数据的操作，默认false将按钮放置search模块，默认操作忽略该属性
            //      relativeFileds {?array} 进行操作需要用到的关联字段值，以[data-]filed_name形式存储在操作按钮上
            //}, {}]
            opts: [],

            // 页面路径配置
            // positions: [{
            //      text {!string} 路径名
            //      url {?url} 路径跳转url
            // }]
            positions: [],

            // 分页配置，默认分页，且每页展示10条数据
            page: {isPage: true, pageNumber: 10},

            // 配置项-是否显示复制操作
            copy: true,

            // 配置项-编辑、详情页面以一列或两列显示
            editFormColumns: 1,

            // 扩展-页面初始化完成后需要另外完成的操作
            onPageFinished: $.noop ,

            commonSelectMap: {},

            // 是否显示操作栏
            isOpera: true,

            // 是否批量操作
            isBatch: false,
            // 批量操作关联字段
            batchFields: []

        };

        // 对应数据库id字段，默认设为'id'
        this.idFiled = 'id';

        // 从页面配置中提取常用的url，主要包括新增和查询
        this.urls = {};
    }

    CommonPage.prototype = {

        init: function(config){
            var _this = this;
            // 安装规定过滤掉不符的配置，获取字段类型，按需加载插件资源
            $.extend(true, this.config, config);
            var typs = this.ruleValid();
            // 填充页面
            this.completePage();

            // 按需加载页面插件资源
            var urls = [];
            $.each(typs, function(){
                urls = urls.concat(constants.SOURCE_MAP[this] || []);
            });
            commonUtil.getResources(urls, function(){
                _this.initPlugins($('#search-form'));
                _this.bindEvents();
                _.isFunction(_this.onPageFinished) && _this.onPageFinished();
                _this.optSearch(true);
            });

//            var columnNamesTotal=[];
//        	$.get('/manage/column/search?start=0&length=9999', function(bd){
//                if (bd.code == 200) {
//                	for(var i=0;i<bd.value.list.length;i++){
//                		columnNamesTotal.push(bd.value.list[i]['name']);
//                	}
//                	//$.unique(columnNamesTotal)
//                	console.log(bd.value);
////                	console.log(bd.value.list[0]['name']);
//                	console.log(columnNamesTotal);
//                } else {
//                    
//                }
//            });
            return this;
        },

        /**
         * 规则验证，过滤掉不符合规范的定义
         */
        ruleValid: function(){
            var _this = this,
                typs = [];

            //fileds
            $.each(this.config.fileds, function(idx, item){
                item.type = item.type || 'text';
                item.holder = (item.type == 'select' ? '请选择' : '请填写') + item.text;

                var id = constants.FILED_DEFAULT_MAP[item.type].tmpl;
                if ( !id ) {
                    item.valid = false;
                    console.error(constants.LOGGER_LOGO + '无效的字段类型：' + item.type);
                    return;
                }

                if ( item.type == 'select' && !item.enumName ) {
                    item.valid = false;
                    console.error(constants.LOGGER_LOGO + '下拉框[' + item.name + ']未指定enum属性值');
                    return;
                }

                typs.push(item.type);

                //找到id字段名称，找不到默认为'id'
                item.isId === true && (_this.idFiled = item.name);
            });

            this.config.fileds = _.filter(this.config.fileds, function(filed){
                return filed.valid !== false;
            });

            //opts
            $.each(this.config.opts, function(idx, item){
                item.optText = item.optText || constants.OPT_MAP[item.opt].text || '';
                constants.OPT_MAP[item.opt] && (item.single = constants.OPT_MAP[item.opt].single);

                if ( !item.optText ) {
                    item.valid = false;
                    console.log(constants.LOGGER_LOGO + '操作[' + item.opt + ']缺少optText属性，被过滤');
                    return;
                }

                item.opt == "search" && (_this.urls.search = item.url);
                item.opt == "count" && (_this.urls.count = item.url);
                item.opt == "add" && (_this.urls.add = item.url);
            });

            if (this.config.copy && this.urls.add) {
                this.config.opts.push({
                    opt: 'copy',
                    optText: '复制',
                    url: this.urls.add,
                    callbackFn: null,
                    single: true
                });
            }

            this.config.opts = _.filter(this.config.opts, function(opt){
                return opt.valid !== false;
            });

            this.config.editFormColumns = Math.max(Math.min(this.config.editFormColumns, 2), 1);
            this.config.editFormColumns == 2 && $('.modal-dialog').width('1000px');

            return _.uniq(typs);
        },

        /**
         * 填充完整的html
         */
        completePage: function(){
            this.completePosition()
                .completeSearch()
                .completeOptBtn()
                .completeTable()
                .completeTemplate();
        },

        /**
         * 填充当前位置
         * @returns {CommonPage}
         */
        completePosition: function(){
            var pos = [], gtText = '>', len = this.config.positions.length;

            $.each(this.config.positions, function(idx, item){
                !item.url && (item.url = '#');

                idx + 1 == len && ( gtText = '' );

                pos.push( '<li><a href="' + item.url + '">' + item.text + '</a>' + gtText + '</li>' );
            });

            $('.current-position ol').append(pos.join('')).find('li:last').addClass('active');

            return this;
        },

        /**
         * 填充查询条件
         * @returns {CommonPage}
         */
        completeSearch: function(){
            var fileds = [];

            $.each(this.config.fileds, function(idx, item){
                if (item.opts && item.opts.length
                        && $.inArray('search', item.opts) == -1) return;

                var id = constants.FILED_DEFAULT_MAP[item.type].tmpl,
                    $temp = $('#filed-search-template').tmpl(item);

                if ($.inArray(item.type, ['date', 'time', 'unixtime']) != -1) {
                    var _start = _.clone(item),
                        _end = _.clone(item),
                        $group = $('#group-template').tmpl();

                    _start.name = _start.name + '_start';
                    _start.dataType = _start.type;
                    _start.holder = '开始';
                    _start.type = constants.FILED_DEFAULT_MAP[_start.type].type;

                    _end.name = _end.name + '_end';
                    _end.dataType = _end.type;
                    _end.holder = '结束';
                    _end.type = constants.FILED_DEFAULT_MAP[_start.type].type;

                    _start.dataMin = _end.name;
                    _end.dataMax = _start.name;

                    $temp.find('.form-group')
                        .append($('#' + id).tmpl(_start))
                        .after(' - ' + $group.append($('#' + id).tmpl(_end))[0].outerHTML);
                } else {
                    item.type = constants.FILED_DEFAULT_MAP[item.type].type || item.type;
                    $temp.find('.form-group').append($('#' + id).tmpl(item));
                }

                fileds.push($temp[0].outerHTML);
            });

            $('#search-form').append(fileds.join(''));

            return this;
        },

        /**
         * 填充操作按钮
         * @returns {CommonPage}
         */
        completeOptBtn: function(){
            var btns = [];

            $.each(this.config.opts, function(idx, item){
                if ( item.single ) return;

                btns.push($('#btn-template').tmpl(item)[0].outerHTML);
            });

            $('#search-form').after(
                '<div class="btn-container">' + btns.join('') + '</div>');

            return this;
        },

        /**
         * 填充列表
         * @returns {CommonPage}
         */
        completeTable: function(){
            var fileds = [];

            $.each(this.config.fileds, function(idx, item){
                if ( item.opts && item.opts.length && $.inArray('list', item.opts) == -1 ) return;
                fileds.push($('#th-template').tmpl(item)[0].outerHTML);
            });

            fileds.push($('#th-template').tmpl({text: '操作', width: '300px'})[0].outerHTML);
            $('#data-table thead tr').append(fileds.join(''));

            return this;
        },

        /**
         * 填充模板
         * @returns {CommonPage}
         */
        completeTemplate: function(){

            return this;
        },

        /**
         * 新增、修改、详情html，
         * @param opt {?string} 操作类型，默认add
         * @param data {?object} 修改、详情对应的数据
         * @returns {string} 编辑、详情页面字符串
         */
        getEditHtml: function(opt, data){
            var htm = [],
                _this = this,
                fileds = $.extend(true, [], this.config.fileds);

            opt = opt || 'add'; data = data || {};

            $.each(fileds, function(idx, item){
                if ( item.opts && item.opts.length && $.inArray(opt, item.opts) == -1 ) return;
                item.value = _.isUndefined(data[item.name]) ? '' : data[item.name];
                item.type == 'select' && ( item.selAll = false );

                var messages = item.checkMessage || {},
                    id = constants.FILED_DEFAULT_MAP[item.type].tmpl,
                    $tmpl = $('#filed-edit-template').tmpl(item);

                if ( $.inArray(item.type, ['date', 'time', 'unixtime']) != -1 ) {
                    item.dataType = item.type;
                    item.value = _this.formatColumn(item.value, item, 'upd');
                }

                item.type = constants.FILED_DEFAULT_MAP[item.type].type || item.type;

                if ( opt == 'info' ) {
                	
                    item.value = _this.formatColumn(item.value, item, 'info');
                    $tmpl = $('#filed-info-template').tmpl(item);
                } else {
                    var $inp = $tmpl
                        .find('.form-group')
                        .append($('#' + id).tmpl(item))
                        .find('[name="' + item.name + '"]')
                        .attr(messages);
                    item.attrs && $inp.attr(item.attrs);
                }

                htm.push($tmpl[0].outerHTML);
            });

            if ( _this.config.editFormColumns == 2 ) {
                var arr = [];
                for ( var i = 0, len = htm.length; i < len; i += 2 ) {
                    var tds = htm.slice(i, i + 2).join('').replace(/<tr>|<\/tr>/gm, '');
                    tds.match(/<td>/gm).length == 1 && (tds = tds.replace('<td>', '<td colspan = "3">'));
                    arr.push(tds);
                }
                return '<tr>' + arr.join('</tr><tr>') + '</tr>';
            } else {
                return htm.join('');
            }
        },

        bindEvents: function(){
            var _this = this;

            $('.opt-search').click(function(){
                _this.optSearch(true);
            });

            var add = _.find(this.config.opts, function(opt){
                return opt.opt == 'add';
            });
            add && $('.opt-add').click(function(){
                _this.optAdd(add);
            });

            $.each(['upd', 'del', 'info', 'copy'], function(idx, item){
                var opt = _.find(_this.config.opts, function(opt){
                    return opt.opt == item;
                });

                opt && $('#data-table').on('click', '.opt-' + item, function(){
                    _this.optDefaults(opt, $(this));
                });
            });

            // other operation
            $.each(_.filter(this.config.opts, function(opt){
                return !_.has(constants.OPT_MAP, opt.opt);
            }), function(idx, item){
                if ( item.single ) {
                    $('#data-table').on('click', '.opt-' + item.opt, function(){
                        item.initFn && item.initFn($(this));
                        item.callbackFn && item.callbackFn($(this));
                    });
                } else {
                    $('.opt-' + item.opt).click(function(){
                        item.initFn && item.initFn($(this));
                        item.callbackFn && item.callbackFn($(this));
                    });
                }
            });
        },

        /**
         * 插件初始化，包括日期时间、下拉框、上传
         * @param container {?selector} 父容器
         * @param addFlg {?boolean} 是否为新增操作，主要用于初始化下拉框值
         */
        initPlugins: function(container, addFlg){
            var self = this;
            container = container || 'body';

            //date|time
            $('[data-type="date"],[data-type="time"],[data-type="unixtime"]', container).each(function(){
                var $this = $(this),
                    _min = $this.attr('data-min'),
                    _max = $this.attr('data-max'),
                    type = _min ? 'minDate' : (_max ? 'maxDate' : ''),
                    $compare = ( _min || _max ) ? $('[name="' + (_min || _max) + '"]') : null;

                pluginUtil.datePicker($this, type, $compare);
            });

            //select
            $('ul.dropdown-menu[data-enum]', container).each(function () {
                var $sel = $(this),
                    enumName = $sel.attr('data-enum'),
                    $inp = $sel.parent().siblings('input:hidden'),
                    selected = addFlg ? undefined : $inp.val(),
                    enumId = $sel.attr('data-enum-id'),
                    enumText = $sel.attr('data-enum-text');

                var filed = _.find(self.config.fileds, function(filed){
                    return filed.name == $inp.attr('name');
                });

                if (commonEnums[enumName]) {
                    manageUtil.initEnumSelect($sel, selected, filed.onSelect);
                } else if (/\//.test(enumName)) {
                    var parent = $sel.attr('data-enum-parent'),
                        enumConfig = {
                            url: enumName,
                            id: enumId,
                            name: enumText,
                            selMap: self.config.commonSelectMap,
                            onSelect: filed.onSelect
                        },
                        $parent = $('[name="' + parent + '"]', container);

                    if (parent) {
                        enumConfig.container = container;
                        enumConfig.param = {};
                        enumConfig.param[$parent.attr('name')] = $parent.val();
                    }
                    if(!$sel.attr('data-enum-parent')){
                        manageUtil.initAjaxSelect($sel, enumConfig, selected);
                    }
                }
            });
            $('ul.dropdown-menu[data-enum-parent]', container).each(function () {
                var $sel = $(this),
                    enumName = $sel.attr('data-enum'),
                    $inp = $sel.parent().siblings('input:hidden'),
                    enumId = $sel.attr('data-enum-id'),
                    enumText = $sel.attr('data-enum-text');

                var filed = _.find(self.config.fileds, function (filed) {
                    return filed.name == $inp.attr('name');
                });

                var parent = $sel.attr('data-enum-parent'),
                    enumConfig = {
                        url: enumName,
                        id: enumId,
                        name: enumText,
                        onSelect: filed.onSelect
                    },
                    $parent = $('[name="' + parent + '"]', container);

                enumConfig.container = container;
                if (parent) {
                    manageUtil.initParentSelect($sel, $parent, enumConfig);
                }
            });

            //color
            $('.color-picker', container).each(function(){
                pluginUtil.colorPicker($(this));
            });

            //upload
            $('.browse-file', container).each(function(){
                var $this = $(this),
                    _url = $this.siblings('.url-hide').val();

                pluginUtil.uploadImg($this, function(data){
                    var json = JSON.parse(data),
                        url = '/upload/' + json.value[0].url;
                    manageUtil.imgUploaded($this, url);
                });

                _url && manageUtil.imgUploaded($this, _url);
            });
        },

        /**
         * 更新、复制、删除、详情操作
         * @param opt
         * @param $o
         */
        optDefaults: function(opt, $o){
            var _this = this;

            switch ( opt.opt ){
                case 'upd':
                case 'copy':
                    _this.optUpd(opt, $o, opt.opt == 'copy'); break;
                case 'del':
                    _this.optDel(opt, $o); break;
                case 'info':
                    _this.optInfo(opt, $o); break;
                default :
                    break;
            }
        },

        /**
         * 默认新增操作
         * @param add {!object} 新增操作配置
         */
        optAdd: function(add){
            if ( !add.url ) {
                add.callbackFn && add.callbackFn();
                return;
            }

            var _this = this,
                $form = $('#form-edit-template').tmpl();

            $('#common-modal').modal('show');
            $('#common-label').text(add.optText);
            $form.find('table.modify-table').append(_this.getEditHtml('add'));
            $('#common-body').html($form[0].outerHTML);
            this.initPlugins($('#common-modal'), true);

            add.initFn && add.initFn();

            $('#common-edit-form').validation();
            _this.optEdit(add, _this);
        },
        /**
         * 默认修改操作，复制操作共用
         * @param upd {!object} 更新操作配置
         * @param $o {!jquery object} 更新操作元素
         * @param copyFlg {?boolean} 是否为复制操作
         */
        optUpd: function(upd, $o, copyFlg){
            if ( !upd.url ) {
                upd.callbackFn && upd.callbackFn();
                return;
            }

            var _this = this;

            $('#common-modal').modal('show');
            $('#common-label').text(upd.optText);

            var info = _.find(this.config.opts, function(opt){
                return opt.opt == 'info';
            });
            $.get(info.url + '?' + this.idFiled + '=' + $o.attr('data-' + this.idFiled),
                function(bd){
                    if ( bd.code != 200 ) return;

                    var $form = $('#form-edit-template').tmpl(
                        copyFlg ? {} : {name: _this.idFiled, value: bd.value[_this.idFiled]}
                    );

                    $form.find('table.modify-table').append(_this.getEditHtml('upd', bd.value));
                    $('#common-body').html($form[0].outerHTML);
                    _this.initPlugins($('#common-modal'));

                    upd.initFn && upd.initFn(bd.value);
                    $('#common-edit-form').validation();

                    _this.optEdit(upd, _this);
                });
        },

        /**
         * 保存操作
         * @param opt {!object} 操作配置
         * @param _this {!CommonPage}
         */
        optEdit: function(opt, _this){
            $('.opt-sure').off('click').click(function(){
                if (!$('#common-edit-form').valid(this, '请按照规则填写表单信息.')) return false;

                $.post(opt.url, $('#common-edit-form').serializeArray(), function(bd){
                    if (bd.code == 200) {
                        manageUtil.alert(opt.optText + '成功.', function(){
                            $('#common-modal').modal('hide');
                            _this.optSearch( opt.type == 'add' );
                            opt.callbackFn && opt.callbackFn.call(this, bd);
                        });
                    } else {
                        manageUtil.alert(opt.optText + '失败：\n' + bd.message, function(){
                            opt.callbackFn && opt.callbackFn.call(this, bd);
                        });
                    }
                });
            });
        },

        /**
         * 默认详情操作
         * @param info {!object} 详情操作配置
         * @param $o {!jquery object} 详情操作按钮
         */
        optInfo: function(info, $o){
            if ( !info.url ) {
                info.callbackFn && info.callbackFn();
                return;
            }

            var _this = this;

            $('#common-modal').modal('show');
            $('#common-label').text(info.optText);

            $.get(info.url + '?' + this.idFiled + '=' + $o.attr('data-' + this.idFiled),
                function(bd){
                    if ( bd.code != 200 ) return;

                    var $form = $('#form-edit-template').tmpl();
                    $form.find('table.modify-table').append(_this.getEditHtml('info', bd.value));
                    $('#common-body').html($form[0].outerHTML);

                    info.initFn && info.initFn(bd.value);
            });

            $('.opt-sure').off('click').click(function(){
                $('#common-modal').modal('hide');
            });
        },

        /**
         * 默认删除操作
         * @param del {!object} 删除操作配置
         * @param $o {!jquery object} 删除操作按钮
         */
        optDel: function(del, $o){
            var _this = this;

            manageUtil.confirm('确认删除？', function(){
                del.initFn && del.initFn($o);
                $.get(del.url + '?' + _this.idFiled + '=' + $o.attr('data-' + _this.idFiled),
                    function(bd){
                        if ( bd.code == 200 ) {
                            manageUtil.alert('删除成功.', function(){
                                _this.optSearch();
                                del.callbackFn && del.callbackFn.call(this, bd);
                            });
                        } else {
                            manageUtil.alert('删除失败:\n' + bd.message, function(){
                                del.callbackFn && del.callbackFn.call(this, bd);
                            });
                        }
                    });
            });
        },

        /**
         * 默认查询操作
         * @param fresh {?boolean} 是否刷新到第一页
         */
        optSearch: function(fresh){
            var _this = this,
                params = commonUtil.removeEmptyParam($('#search-form').serializeArray()),
                settings = {
                    ajaxUrl: _this.urls.search,
                    argument: params,
                    tableId: 'data-table',
                    pageCount: _this.config.page.pageNumber,
                    isPage: this.config.page.isPage,
                    cb: _this.viewData,
                    commonPage: _this,
                    refresh: fresh
                };

            pluginUtil.dataTable(settings);
        },

        /**
         * 列表数据
         * @param bd {!object} 后台接口返回数据；
         *      约定返回格式：{code: 200, value:{total: 100, list: [{}...]}}
         * @param currPage
         * @param page {!CommonPage}
         */
       
        viewData: function(bd, currPage, page){
        	//tqy
        	// var columnNames=[];
            if ( bd.code != 200 ) return;
            var arr = [];
            $.each(bd.value.list, function(idx, item){
                var filedArr = [], opts = [], more = [];
                //tqy
                //columnNames.push(item['columnName']);
                //对象显示属性
                $.each(page.config.fileds, function(i, n){
                    if (this.opts && $.inArray('list', this.opts) == -1) return;
                    filedArr.push(page.formatColumn(item[n.name], n));
                });

                //操作
                $.each($.extend(true, [], page.config.opts), function(i, n){
                    if (!n.single) return;

                    _.isFunction(n.optText) && (n.optText = n.optText(item));

                    var $opt = $('#opt-template').tmpl(n), attrs = {};
                    attrs['data-' + page.idFiled] = item[page.idFiled];
                    n.relativeFileds && $.each(n.relativeFileds, function(j, m){
                        attrs['data-' + m] = item[m];
                    });

                    if ( opts.length >= 4 ) {
                        more.push('<li>' + $opt.attr(attrs)[0].outerHTML + '</li>');
                    } else {
                        opts.push($opt.attr(attrs)[0].outerHTML);
                    }
                });

                if ( more.length ) {
                    var $more = $('#opt-more-template').tmpl();

                    $more.find('ul').append(more.join(''));
                    opts.push($more[0].outerHTML);
                }

                filedArr.push(opts.join(''));
                arr.push(filedArr);
            });

            bd.recordsTotal = bd.value.total || arr.length;
            bd.recordsFiltered = bd.value.total || arr.length;
            bd.data = arr;

        },

        /**
         * 根据字段配置，转换字段显示内容
         * @param val {!number|string} 数据库中对应的值
         * @param filed {!object} 字段配置
         * @param opt {?string} 操作类型
         * @returns {*} 转换后的值
         */
        formatColumn: function(val, filed, opt){
            if ( !val && val !== 0 )  return '';
            var _title = '', _text = '';
            switch(filed.type){
                case 'date':
                    _text = new Date(val).format('yyyy-MM-dd');
                    break;
                case 'time':
                    _text = new Date(val).format('yyyy-MM-dd hh:mm:ss');
                    break;
                case 'unixtime':
                    // _text = new Date(val * 1000).format('yyyy-MM-dd hh:mm:ss');
                    _text = val == 0 ? "" : new Date(val * 1000).format('yyyy-MM-dd hh:mm:ss');
                    break;
                case 'img':
                    _text = '<img src="' + val + '" alt="icon"></img>';
                    break;
                case 'select':
                    if (commonEnums[filed.enumName]) {
                        _text = commonEnums.getText(filed.enumName, val);
                    } else {
                        var map = this.config.commonSelectMap[filed.enumName];
                        //$.each(this.config.commonSelectMap, function (i, n) {
                            $.each(map,function (j,index) {
                                if (index.value == val) {
                                    _text = index.name;
                                }
                            });
                        //});
                    }
                    break;
                default :
                    _text = val;
                    _title = val;
            }

            if (opt == 'upd')  return _text;

            return $(opt == 'info' ? '#info-template' : '#column-template').tmpl({
                columnClz: filed.columnClz || constants.FILED_DEFAULT_MAP[filed.type].columnClz,
                columnText: _text,
                columnTitle: _title
            })[0].outerHTML;
        }
    }

    window.BasePage = CommonPage;
})();
