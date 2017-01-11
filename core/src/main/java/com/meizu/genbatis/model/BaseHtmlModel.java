/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

/**
 * html模版基类
 *
 * @author tengqingya
 * @create 2017-01-11 14:24
 */
public class BaseHtmlModel {
    //从本地哪个文件加载模版
    private String fileName;

    private String id;
    private String name;
    private String spanName;
    private String content;

    public String getFileName() {
        return fileName;
    }

    public void setFileName( String fileName ) {
        this.fileName = fileName;
    }

    public String getId() {
        return id;
    }

    public void setId( String id ) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getSpanName() {
        return spanName;
    }

    public void setSpanName( String spanName ) {
        this.spanName = spanName;
    }

    public String getContent() {
        return content;
    }

    public void setContent( String content ) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "BaseHtmlModel{" +
                "fileName='" + fileName + '\'' +
                ", id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", spanName='" + spanName + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
