/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.adapter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.meizu.genbatis.adaptee.AdapteeInterface;
import com.meizu.genbatis.target.TargetGenInterface;
import org.springframework.stereotype.Service;

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
        System.out.print(jsonObject);
    }

    @Override
    public void genButton() {

    }

    @Override
    public void genCheckbox() {

    }
}
