var fileUpload = {
	init : function() {
		this.bindEvents();
	},
	tmplate:'<tr>' +
	'<td>#fieldTable</td>' +
	'<td>#fieldName</td>' +
	'<td>#fieldType</td>' +
	'<td>' +
	'<input type="radio" name="#fieldName" class="radio-type" id="#fieldName" value="1"/><lable for="#fieldName">button</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type" id="#fieldName" value="2"/><lable for="#fieldName">checkbox</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type" id="#fieldName" value="3"/><lable for="#fieldName">radio</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type" id="#fieldName" value="4"/><lable for="#fieldName">datepicker</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type" id="#fieldName" value="5"/><lable for="#fieldName">dropdown</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type" id="#fieldName" value="6"/><lable for="#fieldName">fileupload</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type" id="#fieldName" value="7"/><lable for="#fieldName">input</lable>' +
	'<input type="radio" name="#fieldName" class="radio-type" id="#fieldName" value="8"/><lable for="#fieldName">modal</lable>' +
	'</td>' +
	'</tr>',
	tmplateForbutton:'<tr><td colspan="4"><i style="float: left">button配置</i><input type="text" class="form-control" name="action" placeholder="action" style="width: 5%;float: left;"><input type="text" class="form-control" name="content" placeholder="content" style="width: 5%;float: left"></td></tr>',
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
						console.log(JSON.parse(filePaths.autoBeanModel).fieldType[0]);
						console.log(JSON.parse(filePaths.autoBeanModel).fieldType);
						console.log(JSON.parse(filePaths.autoBeanModel).fieldTable);
						console.log(JSON.parse(filePaths.autoBeanModel).fieldName);

						$("#example").css("display","");
						for(var i=0;i<obj.fieldType.length;i++){
							var tmp = fileUpload.tmplate.replace(/#fieldType/gi,obj.fieldType[i]).replace(/#fieldTable/gi,obj.fieldTable[i]).replace(/#fieldName/gi,obj.fieldName[i]);
							$("#example").find("thead").append(tmp);
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
			console.log("aaaa");
			$("#example").find("thead").children("tr").each(function(i,j){
				if(i>0){
					var inputs = $(j).find("td:last").find("input");
					console.log(inputs);
					inputs.each(function(l,m){
						if($(m).prop("checked")){
							var text = $(m).next().text();
							if(text == "button"){
								$(j).after(fileUpload.tmplateForbutton);
							}else if(text == ""){
								
							}
							return false;
						}
					});
				}
			});
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
});
