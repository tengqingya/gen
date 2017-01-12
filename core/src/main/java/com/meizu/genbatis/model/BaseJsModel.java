/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

/**
 * @author tengqingya
 * @create 2017-01-12 14:36
 */
public class BaseJsModel {
    //从本地哪个文件加载模版
    private String fileName;

    private String jsName;

    public String getFileName() {
        return fileName;
    }

    public void setFileName( String fileName ) {
        this.fileName = fileName;
    }

    public String getJsName() {
        return jsName;
    }

    public void setJsName( String jsName ) {
        this.jsName = jsName;
    }
}
