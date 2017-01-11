/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.debug;

import com.meizu.genbatis.gen.GenerateBean;
import com.meizu.genbatis.model.HtmlTemplate;
import com.meizu.genbatis.util.XmlUtil;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author tengqingya
 * @create 2017-01-11 9:55
 */
public class debug {
    public static void main(String args[]){
        ApplicationContext x = new ClassPathXmlApplicationContext( new String[] {
                "classpath*:config/applicationContext.xml"
        } );
        String fileName = "/template/html/dropdown.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        System.out.println(template.toString());
    }
}
