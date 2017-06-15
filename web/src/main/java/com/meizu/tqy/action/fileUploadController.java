/*
 * Copyright (c) 2016. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.tqy.action;

import com.alibaba.fastjson.JSON;
import com.meizu.genbatis.exception.ErrorCode;
import com.meizu.genbatis.exception.GenerateException;
import com.meizu.genbatis.model.AutoBeanModel;
import com.meizu.genbatis.model.ConfigBean;
import com.meizu.genbatis.model.ResultModel;
import com.meizu.genbatis.model.SqlResultModel;
import com.meizu.genbatis.parser.ParseCreateSql;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by tengqingya on 2016-11-18.
 */
@Controller
@RequestMapping("/manage/")
public class fileUploadController {

	@Value("${upload.file.path.prefix}")
	private String filePathPrefix;
// https://github.com/jschr/textillate

	@Autowired
	private ParseCreateSql parseCreateSql;

	private AtomicInteger atomicIntegerUpload = new AtomicInteger();
	private AtomicInteger atomicIntegerDownload = new AtomicInteger();

	private static final Logger LOGGER = Logger.getLogger(fileUploadController.class);

	@RequestMapping("/upload")
	@ResponseBody
	public ResultModel search( @RequestParam MultipartFile file,String conf) {

		atomicIntegerUpload.addAndGet(1);
		ConfigBean configBean = JSON.parseObject(conf, ConfigBean.class);
		SqlResultModel sqlResultModel=new SqlResultModel();
		try {
			sqlResultModel = parseCreateSql.parseAndGenerate(file.getInputStream(), configBean,"utf-8");
		} catch( GenerateException e ) {
			throw e;
		}catch( Exception e ){
			throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "未知错误", "");
		}
		AutoBeanModel autoBeanModel = sqlResultModel.getAutoBeanModel();
		Map<String,String> paths =new HashMap<String, String>();
		paths.put("modelPath",filePathPrefix+autoBeanModel.getModelName()+".java");
		paths.put("paramPath",filePathPrefix+autoBeanModel.getModelName().replace("Model","Param")+".java");
		paths.put("sqlPath",filePathPrefix+autoBeanModel.getModelName()+"sql.xml");
		paths.put("daoPath",filePathPrefix+autoBeanModel.getModelName().replace("Model","")+"Dao.java");
		paths.put("servicePath",filePathPrefix+autoBeanModel.getModelName().replace("Model","")+"Service.java");
		paths.put("controllerPath",filePathPrefix+autoBeanModel.getModelName().replace("Model","")+"Controller.java");
		try {
			FileUtils.writeStringToFile(new File(paths.get("modelPath")),sqlResultModel.getModel());
			FileUtils.writeStringToFile(new File(paths.get("paramPath")),sqlResultModel.getParam());
			FileUtils.writeStringToFile(new File(paths.get("sqlPath")),sqlResultModel.getSql());
			FileUtils.writeStringToFile(new File(paths.get("daoPath")),sqlResultModel.getDao());
			FileUtils.writeStringToFile(new File(paths.get("servicePath")),sqlResultModel.getService());
			FileUtils.writeStringToFile(new File(paths.get("controllerPath")),sqlResultModel.getController());
		} catch( IOException e ) {
			throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "生成临时文件错误", "");
		}
		paths.put("autoBeanModel",JSON.toJSONString(autoBeanModel));
		return new ResultModel(paths);
	}

	@RequestMapping("/download")
	@ResponseBody
	public void downLoad(String path, HttpServletResponse response) {
		atomicIntegerDownload.addAndGet(1);
		response.setCharacterEncoding("utf-8");
		response.setContentType("multipart/form-data");
		response.setHeader("Content-Disposition", "attachment;fileName=" + path.replace(filePathPrefix,""));
		InputStream inputStream = null;
		OutputStream os = null;
		try {
			inputStream = new FileInputStream(new File(path));
			os = response.getOutputStream();
			IOUtils.copy(inputStream, os);
		} catch (Exception e) {
			throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "文件下载出错", "");
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					throw new GenerateException( ErrorCode.ServerDs.FILE_ERROR.getValue(), "inputStream流关闭出错", "");
				}
			}
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
					throw new GenerateException( ErrorCode.ServerDs.FILE_ERROR.getValue(), "os流关闭出错", "");
				}
			}
		}
	}

	@RequestMapping("/delete")
	@ResponseBody
	public ResultModel delete(String path) {
		if ( StringUtils.isEmpty(path)) {
			return new ResultModel("no file to delete");
		}
		File f = new File(path);
		if (f.exists()) {
			if (!f.delete()) {
				throw new GenerateException( ErrorCode.ServerDs.FILE_ERROR.getValue(), "当前文件删除出错", "");
			}
			LOGGER.info(String.format("删除文件[%s]成功", f.getName()));
		}
		return new ResultModel("服务器端已无检索结果文件");
	}

	@RequestMapping("/count")
	@ResponseBody
	public ResultModel count(){
		return new ResultModel("atomicIntegerDownload:"+atomicIntegerDownload+"\n atomicIntegerUpload:"+atomicIntegerUpload);
	}

}