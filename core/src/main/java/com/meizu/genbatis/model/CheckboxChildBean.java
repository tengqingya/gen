/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

/**
 * @author tengqingya
 * @create 2017-01-11 17:44
 */
public class CheckboxChildBean {
    private String id;
    private String content;

    public String getId() {
        return id;
    }

    public void setId( String id ) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent( String content ) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "CheckboxChildBean{" +
                "id='" + id + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
