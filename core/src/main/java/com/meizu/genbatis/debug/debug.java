/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.debug;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.meizu.genbatis.gen.GenerateBean;
import com.meizu.genbatis.model.DropDownHtmlModel;
import com.meizu.genbatis.model.HtmlTemplate;
import com.meizu.genbatis.model.InputHtmlModel;
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
        testinputGen();
    }

    private static void testDropDownGen() {
        String fileName = "/template/html/dropdown.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

//        JSONObject jsonObject =  new JSONObject();
//        jsonObject.put("ClassName","test");
//        jsonObject.put("spanName","性别");
//        jsonObject.put("id","sex");
//        jsonObject.put("data_enum","SEX");
//        jsonObject.put("data_sel_all","true");
//        jsonObject.put("data_result_in","value");
        DropDownHtmlModel dropDownHtmlModel =new DropDownHtmlModel();
        dropDownHtmlModel.setData_enum("SEX");
        dropDownHtmlModel.setData_sel_all("true");
        dropDownHtmlModel.setData_result_in("value");
        dropDownHtmlModel.setFileName("/template/html/dropdown.xml");
        dropDownHtmlModel.setId("sex");
        dropDownHtmlModel.setName("sex");
        dropDownHtmlModel.setSpanName("性别");

        String s = FreeMarkers.renderString(template.getContent(), JSON.parseObject(JSON.toJSONString(dropDownHtmlModel)));

        System.out.println(template.toString());
        System.out.println(s);
    }

    private static void testinputGen() {
        String fileName = "/template/html/input.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        InputHtmlModel inputHtmlModel = new InputHtmlModel();
        inputHtmlModel.setSpanName("姓名");
        inputHtmlModel.setId("myName");
        inputHtmlModel.setPlaceholder("请输入您的姓名哦");
        inputHtmlModel.setNeedCheck(true);
        inputHtmlModel.setCheckType("required date");

        String s = FreeMarkers.renderString(template.getContent(), JSON.parseObject(JSON.toJSONString(inputHtmlModel)));

        System.out.println(template.toString());
        System.out.println(s);
    }
}
