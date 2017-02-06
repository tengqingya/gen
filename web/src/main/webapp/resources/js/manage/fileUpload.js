var fileUpload = {
	init : function() {
		this.bindEvents();
	},
	tmplate:'<tr>' +
	'<td>#fieldTable</td>' +
	'<td>#fieldName</td>' +
	'<td>#fieldType</td>' +
	'<td>' +
	'<input type="radio" name="#fieldName" class="radio-type"  value="1"/><lable for="#fieldName">button</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type"  value="2"/><lable for="#fieldName">checkbox</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type"  value="3"/><lable for="#fieldName">radio</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type"  value="4"/><lable for="#fieldName">datepicker</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type"  value="5"/><lable for="#fieldName">dropdown</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type"  value="6"/><lable for="#fieldName">fileupload</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type"  value="7"/><lable for="#fieldName">input</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type"  value="8"/><lable for="#fieldName">modal</lable>' +
	'</td>' +
	'</tr>',
	tmplateForbutton:'<tr style="background: #f9f9f9" class="config_tr config_button">' +
	'<td colspan="4">' +
	'<i style="float: left">button配置</i>' +
	'<input type="text" class="form-control button" name="action" placeholder="action" style="width: 5%;float: left;">' +
	'<input type="text" class="form-control button" name="content" placeholder="content" style="width: 5%;float: left">' +
	'</td>' +
	'</tr>',
	tmplateForcheckbox:'<tr style="background: #f9f9f9" class="config_tr config_checkbox">' +
	'<td colspan="4">' +
	'<i style="float: left">checkbox配置</i>' +
		//此处name属性必须和模版中属性一致
	'<input type="text" class="form-control checkbox" name="id" placeholder="id" style="width: 5%;float: left;">' +
	'<input type="text" class="form-control checkbox" name="content" placeholder="content" style="width: 5%;float: left">' +
	'<input type="text" class="form-control checkbox" name="value" placeholder="value" style="width: 5%;float: left">' +
	'<button class="btn btn-primary applic_btn J_add" style="float: right">添加</button>' +
	'</td>' +
	'</tr>',
	tmplateForradio:'<tr style="background: #f9f9f9" class="config_tr config_radio">' +
	'<td colspan="4">' +
	'<i style="float: left">radio配置</i>' +
		//此处name属性必须和模版中属性一致
	'<input type="text" class="form-control checkbox" name="id" placeholder="id" style="width: 5%;float: left;">' +
	'<input type="text" class="form-control checkbox" name="content" placeholder="content" style="width: 5%;float: left">' +
	'<input type="text" class="form-control checkbox" name="value" placeholder="value" style="width: 5%;float: left">' +
	'<button class="btn btn-primary applic_btn J_add" style="float: right">添加</button>' +
	'</td>' +
	'</tr>',
	tmplateFordatepicker:'<tr style="background: #f9f9f9" class="config_tr config_datepicker">' +
	'<td colspan="4">' +
	'<i style="float: left">datepicker配置</i>' +
	'<input type="text" class="form-control datepicker" name="placeholder1" placeholder="placeholder1" style="width: 5%;float: left;">' +
	'<input type="text" class="form-control datepicker" name="requiredMessage1" placeholder="requiredMessage1" style="width: 5%;float: left">' +
	'<input type="text" class="form-control datepicker" name="placeholder2" placeholder="placeholder2" style="width: 5%;float: left">' +
	'<input type="text" class="form-control datepicker" name="requiredMessage2" placeholder="requiredMessage2" style="width: 5%;float: left">' +
	'<input type="text" class="form-control datepicker" name="spanName1" placeholder="spanName1" style="width: 5%;float: left">' +
	'<input type="text" class="form-control datepicker" name="spanName2" placeholder="spanName2" style="width: 5%;float: left">' +
	'<input type="text" class="form-control datepicker" name="startTime" placeholder="startTime" style="width: 5%;float: left">' +
	'<input type="text" class="form-control datepicker" name="endTime" placeholder="endTime" style="width: 5%;float: left">' +
	'<input type="text" class="form-control datepicker" name="needCheck" placeholder="needCheck" style="width: 5%;float: left" value="false">' +
	'<input type="text" class="form-control datepicker" name="checkType" placeholder="checkType" style="width: 5%;float: left" value="required">' +
	'</td>' +
	'</tr>',
	tmplateFordropdown:'<tr style="background: #f9f9f9" class="config_tr config_dropdown">' +
	'<td colspan="4">' +
	'<i style="float: left">datepicker配置</i>' +
	'<input type="text" class="form-control datepicker" name="data_enum" placeholder="data_enum" style="width: 5%;float: left;">' +
	'<input type="text" class="form-control datepicker" name="data_sel_all" placeholder="data_sel_all" style="width: 5%;float: left" value="true">' +
	'<input type="text" class="form-control datepicker" name="data_result_in" placeholder="data_result_in" style="width: 5%;float: left" value="value">' +
	'<input type="text" class="form-control datepicker" name="id" placeholder="id" style="width: 5%;float: left">' +
	'<input type="text" class="form-control datepicker" name="spanName" placeholder="spanName" style="width: 5%;float: left" value="下拉框">' +
	'<input type="text" class="form-control datepicker" name="needCheck" placeholder="needCheck" style="width: 5%;float: left" value="false">' +
	'<input type="text" class="form-control datepicker" name="checkType" placeholder="checkType" style="width: 5%;float: left" value="required">' +
	'<input type="text" class="form-control datepicker" name="requiredMessage" placeholder="requiredMessage" style="width: 5%;float: left" value="requiredMessage">' +
	'</td>' +
	'</tr>',
	tmplateForfileupload:'<tr style="background: #f9f9f9" class="config_tr config_fileupload">' +
	'<td colspan="4">' +
	'<i style="float: left">fileupload配置</i>' +
	'</td>' +
	'</tr>',
	bindEvents : function() {
		$(".formValidate").validation();
		var flag = 1;
		// 批量生成
		$("#batchSearch").click(function() {

			if (!$(".formValidate").valid($("#batchSearch"), '填写信息不完整!')) {
				asyncbox.alert("请填写必须的参数！", "提示");
				return false;
			}

			$("#fileInput").click();
			$('#progress .bar').text("");
			$("#download1").attr("disabled", "disabled");
			$("#download2").attr("disabled", "disabled");
			$("#download3").attr("disabled", "disabled");
			if(filePaths&&filePaths.modelPath){
				$.ajax({
					url : '/manage/delete?path=' + filePaths.modelPath
				});
				$.ajax({
					url : '/manage/delete?path=' + filePaths.paramPath
				});
				$.ajax({
					url : '/manage/delete?path=' + filePaths.sqlPath
				});
			}


			$("#fileInput").fileupload({
				sequentialUploads : true,
				autoUpload : false,
				dataType: 'json',
				url : "/manage/upload",
				formData:{conf:JSON.stringify({whereClause:$('input[name="whereClause"]').val(),
					setClause:$('input[name="setClause"]').val(),
					modelPackageName:$('input[name="modelPackageName"]').val(),
					delimiters:$('input[name="delimiters"]').val(),
					prefix:$('input[name="prefix"]').val(),
					index:$('input[name="index"]').val(),
					selectAndCountPrefix:$('input[name="selectAndCountPrefix"]').val(),
					updateBatchWhereClause:$('input[name="updateBatchWhereClause"]').val(),
					updatePrefix:$('input[name="updatePrefix"]').val()})},
				add : function(e, data) {
					var file = data.files[0];
					$("#text").attr("placeholder", file.name);
					var maxFileSize = 30720000;
					//var acceptFileTypes = /(\.|\/)(rar|vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)$/i;
					//if (!acceptFileTypes.test(file.type)) {
					//    file.error = '无效的文件类型！';
					//}
					if( file.size > maxFileSize){
						file.error = '文件过大！';
					}
					if( file.error ){
						$("#beginSearch").unbind("click");
						$('#progress .bar').text(file.error);
						$('#progress .bar').text(file.error).css("color", "red");
						$("#download1").attr("disabled", "disabled");
						$("#download2").attr("disabled", "disabled");
						$("#download3").attr("disabled", "disabled");
						$("#beginSearch").attr("disabled", "disabled");
					}
					else{
						$("#beginSearch").unbind("click");
						$("#beginSearch").removeAttr("disabled");
						$("#beginSearch").click(function() {
							if(filePaths&&filePaths.modelPath){
								$.ajax({
									url : '/manage/delete?path=' + filePaths.modelPath
								});
								$.ajax({
									url : '/manage/delete?path=' + filePaths.paramPath
								});
								$.ajax({
									url : '/manage/delete?path=' + filePaths.sqlPath
								});
							}
							$("#download1").attr("disabled", "disabled");
							$("#download2").attr("disabled", "disabled");
							$("#download3").attr("disabled", "disabled");
							$("#batchSearch").attr("disabled", "disabled");
							$("#beginSearch").attr("disabled", "disabled");
							data.submit();
							flag = 1;
						});
					}
				},
				done : function(e, data) {
					if ( data.result.code == 200 ) {
						$("#download1").removeAttr("disabled");
						$("#download2").removeAttr("disabled");
						$("#download3").removeAttr("disabled");
						filePaths = data.result.value;

						$('#progress .bar').text("生成完成");
						$("#batchSearch").removeAttr("disabled");
						$("#beginSearch").removeAttr("disabled");

						//解析bean
						var obj = JSON.parse(filePaths.autoBeanModel);

						$("#example").css("display","");
						for(var i=0;i<obj.fieldType.length;i++){
							var tmp = fileUpload.tmplate.replace(/#fieldType/gi,obj.fieldType[i]).replace(/#fieldTable/gi,obj.fieldTable[i]).replace(/#fieldName/gi,obj.fieldName[i]);
							$("#example").find("tbody").append(tmp);
						}
					}
					else{
						$('#progress .bar').text("生成失败！"+ data.result.message).css("color", "red");
						$("#batchSearch").removeAttr("disabled");
						$("#beginSearch").removeAttr("disabled");
						flag = 0;
					}
				}
			}).bind(
				'fileuploadprogress',
				function(e, data) {
					$('#progress .bar').css("color", "");
					$('#progress .bar').text("生成中").css("font-size", "20px");
					setTimeout(function() {
						if ($('#progress .bar').text() != "生成完成"
							&& $('#progress .bar').text() === "生成中"
							&& flag == 1) {
							$('#progress .bar').text("生成中.");
						}
					}, 100);
					setTimeout(function() {
						if ($('#progress .bar').text() != "生成完成"
							&& $('#progress .bar').text() === "生成中."
							&& flag == 1) {
							$('#progress .bar').text("生成中..");
						}
					}, 500);
					setTimeout(function() {
						if ($('#progress .bar').text() != "生成完成"
							&& $('#progress .bar').text() === "生成中.."
							&& flag == 1) {
							$('#progress .bar').text("生成中...");
						}
					}, 1000);
				})
		});

		var filePaths;


		$("#download1")
				.click(
						function() {
							window
									.open("/manage/download?path="
											+ filePaths.modelPath+"&filePathPrefix="+$('input[name="pathPrefix"]').val());
						});
		$("#download2")
			.click(
				function() {
					window
						.open("/manage/download?path="
							+ filePaths.paramPath+"&filePathPrefix="+$('input[name="pathPrefix"]').val());
				});
		$("#download3")
			.click(
				function() {
					window
						.open("/manage/download?path="
							+ filePaths.sqlPath+"&filePathPrefix="+$('input[name="pathPrefix"]').val());
				});

		$(window).bind("beforeunload", function() {
			$.ajax({
				async : false,
				url : '/manage/delete?path=' + filePath
			});
		});

		$(".J_config").click(function(){
			$(".config_tr").remove();
			$("#example").find("tbody").children("tr").each(function(i,j){
				if(i>0){
					var inputs = $(j).find("td:last").find("input");
					inputs.each(function(l,m){
						if($(m).prop("checked")){
							var text = $(m).next().text();
							if(text == "button"){
								$(j).after(fileUpload.tmplateForbutton);
							}else if(text == "checkbox"){
								$(j).after(fileUpload.tmplateForcheckbox);
							}else if(text == "radio"){
								$(j).after(fileUpload.tmplateForradio);
							}else if(text == "datepicker"){
								$(j).after(fileUpload.tmplateFordatepicker);
							}else if(text == "dropdown"){
								$(j).after(fileUpload.tmplateFordropdown);
							}else if(text == "fileupload"){
								$(j).after(fileUpload.tmplateForfileupload);
							}
							return false;
						}
					});
				}
			});
		});

		//点击按钮继续新增一行
		$("#example").on("click",".config_tr",function(e){
			var target = $(e.target);
			if(target[0].tagName == "BUTTON"){
				var _tr  = target.parent().parent();
				//console.log(_tr);
				//包装2次效果一样
				//console.log($(_tr).prop("previousSibling"));
				//console.log(_tr.prop("previousSibling"));
				//_tr[0]是将jquery对象转成dom对象
				//_tr.after(_tr[0].outerHTML);
				//使用prop得到属性值
				_tr.after(_tr.prop("outerHTML"));
			}
		});

		$(".J_genTemplate").click(function(){
			var arr = [],json={},
				subArrButton = [],
				subArrDatepicker = [],
				subArrFileupload = [],
				subArrDropdown = [],
				subArrCheckbox = [],
				subArrRadio = [];
			var ssubArrCheckbox = [],ssubArrRadio = [];
			$(".config_tr").each(function(i,j){
				if($(j).hasClass("config_button")){
					var subJson={};
					$(j).find("input").each(function(l,m){
						subJson[$(m).attr("name")] = $(m).val();
					});
					//如果push结束之后 改变subjson的值 那么之前push的值也会改变
					subArrButton.push(subJson);
				}else if($(j).hasClass("config_checkbox")){
					var subJson={};
					var ssubjson = {};
					$(j).find("input").each(function(l,m){
						subJson[$(m).attr("name")] = $(m).val();
					});
					ssubArrCheckbox.push(subJson);
					//一组checkbox放到一个数组里面{"button":[{"action":"1","content":"1"}],"checkbox":[{"type":"checkbox","checkboxList":[{"id":"2","content":"2","value":"2"},{"id":"3","content":"3","value":"3"}]},{"type":"checkbox","checkboxList":[{"id":"5","content":"5","value":"5"},{"id":"6","content":"7","value":"8"}]}]}
					//如果两个checkbox不相邻则判断为非一组checkbox，相邻则放到同一个数组
					if(!$(j).next().hasClass("config_checkbox")){
						ssubjson.type = "checkbox";
						ssubjson.checkboxList = ssubArrCheckbox;
						ssubArrCheckbox = [];
						subArrCheckbox.push(ssubjson);
					}
				}else if($(j).hasClass("config_radio")){
					var subJson={};
					var ssubjson = {};
					$(j).find("input").each(function(l,m){
						subJson[$(m).attr("name")] = $(m).val();
					});
					ssubArrRadio.push(subJson);
					if(!$(j).next().hasClass("config_radio")){
						ssubjson.type = "radio";
						ssubjson.checkboxList = ssubArrRadio;
						ssubArrRadio = [];
						subArrRadio.push(ssubjson);
					}
				}else if($(j).hasClass("config_datepicker")){
					var subJson={};
					$(j).find("input").each(function(l,m){
						subJson[$(m).attr("name")] = $(m).val();
					});
					//如果push结束之后 改变subjson的值 那么之前push的值也会改变
					subArrDatepicker.push(subJson);
				}else if($(j).hasClass("config_dropdown")){
					var subJson={};
					$(j).find("input").each(function(l,m){
						subJson[$(m).attr("name")] = $(m).val();
					});
					//如果push结束之后 改变subjson的值 那么之前push的值也会改变
					subArrDropdown.push(subJson);
				}else if($(j).hasClass("config_fileupload")){
					var subJson={};
					$(j).find("input").each(function(l,m){
						subJson[$(m).attr("name")] = $(m).val();
					});
					//如果push结束之后 改变subjson的值 那么之前push的值也会改变
					subArrFileupload.push(subJson);
				}
			});
			//$('input[class="form-control button"]').each(function(i,j){
			//	subJson={name:$(j).attr("name"),value:$(j).val()};
			//	subArr.push(subJson);
			//});
			json.button = subArrButton;
			json.checkbox = subArrCheckbox;
			json.radio = subArrRadio;
			json.datepicker = subArrDatepicker;
			json.dropdown = subArrDropdown;
			json.fileupload = subArrFileupload;

			$.ajax({
				type: "GET",
				url: "/manage/genHtml",
				data: {"config":JSON.stringify(json)},
				success: function (result) {
					if (result.code == 200 && result.value) {
						asyncbox.alert("添加成功", "提示");
					} else {
						asyncbox.alert("添加失败" + (result.message == "" ? result.message : ("：" + result.message)), "提示");
					}
				}
			})
		});
	}
};
$(function() {
	fileUpload.init();
	$('.tlt').textillate({
		callback: function () {
		},
		loop: true
	});

	// ISO 8601 标准时间格式
	$(".timeago").attr("title",new Date().Format("'yyyy-MM-ddThh:mm:ss+08'"));
	$(".timeago").timeago();
});

//格式化时间函数
Date.prototype.Format = function(fmt)
{ //author: meizz
	var o = {
		"M+" : this.getMonth()+1,                 //月份
		"d+" : this.getDate(),                    //日
		"h+" : this.getHours(),                   //小时
		"m+" : this.getMinutes(),                 //分
		"s+" : this.getSeconds(),                 //秒
		"q+" : Math.floor((this.getMonth()+3)/3), //季度
		"S"  : this.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	return fmt;
}
