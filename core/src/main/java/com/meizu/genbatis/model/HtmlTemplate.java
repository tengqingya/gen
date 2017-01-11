/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

import javax.xml.bind.annotation.XmlRootElement;

/**html模版的标签
 * @author tengqingya
 * @create 2017-01-11 10:25
 */
@XmlRootElement(name="template")
public class HtmlTemplate {
    private String name;
    private String content;
    private String filePath;
    private String fileName;
//    private String laber;
//    private String id;
//    private String data_enum;
//    private String data_sel_all;
//    private String data_result_in;

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent( String content ) {
        this.content = content;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath( String filePath ) {
        this.filePath = filePath;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName( String fileName ) {
        this.fileName = fileName;
    }

    @Override
    public String toString() {
        return "HtmlTemplate{" +
                "name='" + name + '\'' +
                ", content='" + content + '\'' +
                ", filePath='" + filePath + '\'' +
                ", fileName='" + fileName + '\'' +
                '}';
    }
}
