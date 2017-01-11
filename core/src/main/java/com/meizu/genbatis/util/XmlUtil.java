/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.util;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

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
}
