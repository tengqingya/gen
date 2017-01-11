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

    private Boolean needCheck;

    private String checkType;

    private String requiredMessage;

    public String getPlaceholder() {
        return placeholder;
    }

    public void setPlaceholder( String placeholder ) {
        this.placeholder = placeholder;
    }

    public Boolean getNeedCheck() {
        return needCheck;
    }

    public void setNeedCheck( Boolean needCheck ) {
        this.needCheck = needCheck;
    }

    public String getCheckType() {
        return checkType;
    }

    public void setCheckType( String checkType ) {
        this.checkType = checkType;
    }

    public String getRequiredMessage() {
        return requiredMessage;
    }

    public void setRequiredMessage( String requiredMessage ) {
        this.requiredMessage = requiredMessage;
    }

    @Override
    public String toString() {
        return "InputHtmlModel{" +
                "placeholder='" + placeholder + '\'' +
                ", needCheck=" + needCheck +
                ", checkType='" + checkType + '\'' +
                ", requiredMessage='" + requiredMessage + '\'' +
                '}';
    }
}
