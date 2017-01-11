/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.debug;

import com.meizu.genbatis.gen.GenerateBean;
import com.meizu.genbatis.model.HtmlTemplate;
import com.meizu.genbatis.util.FreeMarkers;
import com.meizu.genbatis.util.XmlUtil;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.HashMap;
import java.util.Map;

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

        Map<String, Object> model = new HashMap<>();
        model.put("ClassName","test");
        model.put("laber","性别");
        model.put("id","sex");
        model.put("data_enum","SEX");
        model.put("data_sel_all","true");
        model.put("data_result_in","value");

        String s = FreeMarkers.renderString(template.getContent(), model);

        System.out.println(template.toString());
        System.out.println(s);
    }
}
