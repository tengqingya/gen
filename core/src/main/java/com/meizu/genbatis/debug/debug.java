/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.debug;

import com.alibaba.fastjson.JSON;
import com.meizu.genbatis.model.ButtonHtmlModel;
import com.meizu.genbatis.model.CheckboxAndRadioHtmlBean;
import com.meizu.genbatis.model.CheckboxChildBean;
import com.meizu.genbatis.model.DatepickerHtmlModel;
import com.meizu.genbatis.model.DropDownHtmlModel;
import com.meizu.genbatis.model.FileuploadHtmlModel;
import com.meizu.genbatis.model.HtmlTemplate;
import com.meizu.genbatis.model.InputHtmlModel;
import com.meizu.genbatis.model.ModalhtmlModel;
import com.meizu.genbatis.model.TableHtmlModel;
import com.meizu.genbatis.model.TableThBean;
import com.meizu.genbatis.util.FreeMarkers;
import com.meizu.genbatis.util.XmlUtil;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.ArrayList;
import java.util.List;

/**
 * @author tengqingya
 * @create 2017-01-11 9:55
 */
public class debug {
    public static void main(String args[]){
        ApplicationContext x = new ClassPathXmlApplicationContext( new String[] {
                "classpath*:config/applicationContext.xml"
        } );
//        testDropDownGen();
//        testtableGen();
//        testCheckBoxGen();
//        testModalGen();
//        testbuttonGen();
//        testDatepickerGen();
//        testinputGen();
        testFileUploadGen();
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
        dropDownHtmlModel.setData_enum("activityType");
        dropDownHtmlModel.setData_sel_all("true");
        dropDownHtmlModel.setData_result_in("value");
        dropDownHtmlModel.setFileName("/template/html/dropdown.xml");
        dropDownHtmlModel.setId("goodstype2");
        dropDownHtmlModel.setName("goodstype2");
        dropDownHtmlModel.setSpanName("xlk3");
        dropDownHtmlModel.setNeedCheck(true);
        dropDownHtmlModel.setCheckType("checked number");
        dropDownHtmlModel.setRequiredMessage("need check");

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
        inputHtmlModel.setNeedCheck(false);
        inputHtmlModel.setCheckType("required date");
        inputHtmlModel.setRequiredMessage("please!!!");

        String s = FreeMarkers.renderString(template.getContent(), JSON.parseObject(JSON.toJSONString(inputHtmlModel)));

        System.out.println(template.toString());
        System.out.println(s);
    }

    private static void testDatepickerGen() {
        String fileName = "/template/html/datepicker.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        DatepickerHtmlModel datepickerHtmlModel =new DatepickerHtmlModel();
        datepickerHtmlModel.setPlaceholder1("开始时间");
        datepickerHtmlModel.setPlaceholder2("结束时间");
        datepickerHtmlModel.setNeedCheck(false);
        datepickerHtmlModel.setCheckType("required date");
        datepickerHtmlModel.setRequiredMessage1("请选择开始时间");
        datepickerHtmlModel.setRequiredMessage2("请选择结束时间");
        datepickerHtmlModel.setSpanName1("评论开始时间");
        datepickerHtmlModel.setSpanName2("评论结束时间");
        datepickerHtmlModel.setStartTime("startTime");
        datepickerHtmlModel.setEndTime("endTime");
        datepickerHtmlModel.setFileName("");
        datepickerHtmlModel.setId("");
        datepickerHtmlModel.setName("");
        datepickerHtmlModel.setSpanName("");


        String s = FreeMarkers.renderString(template.getContent(), JSON.parseObject(JSON.toJSONString(datepickerHtmlModel)));

        System.out.println(template.toString());
        System.out.println(s);
    }

    private static void testbuttonGen() {
        String fileName = "/template/html/button.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        ButtonHtmlModel buttonHtmlModel = new ButtonHtmlModel();
        buttonHtmlModel.setContent("查询");
        buttonHtmlModel.setAction("J_search");

        String s = FreeMarkers.renderString(template.getContent(), JSON.parseObject(JSON.toJSONString(buttonHtmlModel)));

        System.out.println(template.toString());
        System.out.println(s);
    }

    private static void testtableGen() {
        String fileName = "/template/html/table.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        TableHtmlModel tableHtmlModel = new TableHtmlModel();
        tableHtmlModel.setId("table");
        List<TableThBean> tableThBeanList = new ArrayList<>();
        TableThBean tableThBean = new TableThBean();
        tableThBean.setWidth(4);
        tableThBean.setContent("书评ID");
        tableThBeanList.add(tableThBean);
        tableThBean = new TableThBean();
        tableThBean.setWidth(0);
        tableThBean.setContent("发表时间");
        tableThBeanList.add(tableThBean);
        tableHtmlModel.setTableList(tableThBeanList);

        String s = FreeMarkers.renderString(template.getContent(), JSON.parseObject(JSON.toJSONString(tableHtmlModel)));

        System.out.println(template.toString());
        System.out.println(s);
    }

    private static void testModalGen() {
        String fileName = "/template/html/modal.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        ModalhtmlModel modalhtmlModel = new ModalhtmlModel();
        modalhtmlModel.setContent("解禁/禁言");
        modalhtmlModel.setId("myModal");
        String s = FreeMarkers.renderString(template.getContent(), JSON.parseObject(JSON.toJSONString(modalhtmlModel)));

        System.out.println(template.toString());
        System.out.println(s);
    }

    private static void testCheckBoxGen() {
        String fileName = "/template/html/checkbox.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        CheckboxAndRadioHtmlBean checkboxAndRadioHtmlBean = new CheckboxAndRadioHtmlBean();
        CheckboxChildBean checkboxChildBean =new CheckboxChildBean();
        List<CheckboxChildBean> checkboxChildBeanList = new ArrayList<>();
        checkboxChildBean.setId("forbid_forever");
        checkboxChildBean.setContent("永久禁言");
        checkboxChildBean.setValue("1");
        checkboxChildBeanList.add(checkboxChildBean);
        checkboxChildBean =new CheckboxChildBean();
        checkboxChildBean.setId("forbid_day");
        checkboxChildBean.setContent("禁言天数");
        checkboxChildBean.setValue("2");
        checkboxChildBeanList.add(checkboxChildBean);

        checkboxAndRadioHtmlBean.setCheckboxList(checkboxChildBeanList);
        checkboxAndRadioHtmlBean.setType("radio");

        String s = FreeMarkers.renderString(template.getContent(), JSON.parseObject(JSON.toJSONString(checkboxAndRadioHtmlBean)));

        System.out.println(template.toString());
        System.out.println(s);
    }

    private static void testFileUploadGen() {
        String fileName = "/template/html/fileupload.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        FileuploadHtmlModel fileuploadHtmlModel = new FileuploadHtmlModel();
        String s = FreeMarkers.renderString(template.getContent(), JSON.parseObject(JSON.toJSONString(fileuploadHtmlModel)));

        System.out.println(template.toString());
        System.out.println(s);
    }
}
