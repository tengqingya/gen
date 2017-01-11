/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.util;

import com.meizu.genbatis.model.HtmlTemplate;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;

/**
 * @author tengqingya
 * @create 2017-01-11 10:14
 */
public class XmlUtil {

    private static Logger logger =Logger.getLogger(XmlUtil.class);

    public static <T> T fileToObject(String fileName, Class<?> clazz){
        try {
//            String pathName = "/templates/modules/gen/" + fileName;
//			logger.debug("File to object: {}", pathName);
            Resource resource = new ClassPathResource(fileName);
            InputStream is = resource.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            StringBuilder sb = new StringBuilder();
            while (true) {
                String line = br.readLine();
                if (line == null){
                    break;
                }
                sb.append(line).append("\r\n");
            }
            if (is != null) {
                is.close();
            }
            if (br != null) {
                br.close();
            }
//			logger.debug("Read file content: {}", sb.toString());
            return (T) JaxbMapper.fromXml(sb.toString(), clazz);
        } catch (IOException e) {
            logger.warn(String.format("Error file convert: {}", e.getMessage()));
        }
//		String pathName = StringUtils.replace(getTemplatePath() + "/" + fileName, "/", File.separator);
//		logger.debug("file to object: {}", pathName);
//		String content = "";
//		try {
//			content = FileUtils.readFileToString(new File(pathName), "utf-8");
////			logger.debug("read config content: {}", content);
//			return (T) JaxbMapper.fromXml(content, clazz);
//		} catch (IOException e) {
//			logger.warn("error convert: {}", e.getMessage());
//		}
        return null;
    }


    /**
     * 生成到文件
     * @param tpl
     * @param model
     * @param isReplaceFile
     * @return
     */
    public static String generateToFile( HtmlTemplate tpl, Map<String, Object> model, boolean isReplaceFile){
        // 获取生成文件
        String fileName = StringUtils.replaceEach(FreeMarkers.renderString(tpl.getFilePath() + "/", model),
                new String[]{"//", "/", "."}, new String[]{File.separator, File.separator, File.separator})
                + FreeMarkers.renderString(tpl.getFileName(), model);
        logger.debug(" fileName === " + fileName);

        // 获取生成文件内容
        String content = FreeMarkers.renderString(StringUtils.trimToEmpty(tpl.getContent()), model);
        logger.debug(" content === \r\n" + content);

        // 如果选择替换文件，则删除原文件
        if (isReplaceFile){
            FileUtils.deleteFile(fileName);
        }

        // 创建并写入文件
        if (FileUtils.createFile(fileName)){
            FileUtils.writeToFile(fileName, content, true);
            logger.debug(" file create === " + fileName);
            return "生成成功："+fileName+"<br/>";
        }else{
            logger.debug(" file extents === " + fileName);
            return "文件已存在："+fileName+"<br/>";
        }
    }
}
