package com.meizu.genbatis.model;

import java.util.List;

/**
 * 解析得到的param用于生成sql
 *
 * @author tengqingya
 * @create 2016-11-22 11:32
 */
public class AutoBeanParam {
    private String paramName;
    private List<String> fieldName;
    private List<String>  fieldType;

    public String getParamName() {
        return paramName;
    }

    public void setParamName( String paramName ) {
        this.paramName = paramName;
    }

    public List<String> getFieldName() {
        return fieldName;
    }

    public void setFieldName( List<String> fieldName ) {
        this.fieldName = fieldName;
    }

    public List<String> getFieldType() {
        return fieldType;
    }

    public void setFieldType( List<String> fieldType ) {
        this.fieldType = fieldType;
    }
}
