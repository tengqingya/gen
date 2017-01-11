/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

/**
 * @author tengqingya
 * @create 2017-01-11 14:50
 */
public class InputHtmlModel extends BaseHtmlModel {
    private String placeholder;

    public String getPlaceholder() {
        return placeholder;
    }

    public void setPlaceholder( String placeholder ) {
        this.placeholder = placeholder;
    }

    @Override
    public String toString() {
        super.toString();
        return "InputHtmlModel{" +
                "placeholder='" + placeholder + '\'' +
                '}';
    }
}
