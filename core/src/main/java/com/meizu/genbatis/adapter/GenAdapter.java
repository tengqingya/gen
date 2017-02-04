/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.adapter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.meizu.genbatis.adaptee.AdapteeInterface;
import com.meizu.genbatis.model.HtmlTemplate;
import com.meizu.genbatis.target.TargetGenInterface;
import com.meizu.genbatis.util.FreeMarkers;
import com.meizu.genbatis.util.XmlUtil;
import org.apache.commons.lang.Validate;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 生成button适配器
 *
 * @author tengqingya
 * @create 2017-01-20 14:56
 */
@Service()
public class GenAdapter implements TargetGenInterface,AdapteeInterface {
    @Override
    public void genTemplate( String config ) {
        JSONObject jsonObject = JSON.parseObject(config);
        JSONArray array = (JSONArray)jsonObject.get("button");
        genButton(array);
        genCheckbox((JSONArray)jsonObject.get("checkbox"));
    }

    @Override
    public void genButton(List<Object> list ) {
        Validate.notEmpty(list,"集合非空");

        String fileName = "/template/html/button.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        String s;
        for(Object o:list){
            s = FreeMarkers.renderString(template.getContent(), (JSONObject)o);

            System.out.println(s);
        }
    }

    @Override
    public void genCheckbox(List<Object> list ) {
        Validate.notEmpty(list,"集合非空");

        String fileName = "/template/html/checkbox.xml";
        HtmlTemplate template = XmlUtil.fileToObject(fileName, HtmlTemplate.class);

        //bean属性和jsonobject的时候使用name="${l.id}"或者name="${item["id"]}"都可以
        String s;
        for(Object o:list){
            s = FreeMarkers.renderString(template.getContent(), (JSONObject)o);

            System.out.println(s);
        }
    }
}
