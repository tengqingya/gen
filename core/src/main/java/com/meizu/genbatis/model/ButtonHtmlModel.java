/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

/**
 * @author tengqingya
 * @create 2017-01-11 15:30
 */
public class ButtonHtmlModel extends BaseHtmlModel {
    private String action;

    public String getAction() {
        return action;
    }

    public void setAction( String action ) {
        this.action = action;
    }

    @Override
    public String toString() {
        super.toString();
        return "ButtonHtmlModel{" +
                "action='" + action + '\'' +
                '}';
    }
}
