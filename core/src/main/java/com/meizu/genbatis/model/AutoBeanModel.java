package com.meizu.genbatis.model;

import java.util.List;
import java.util.Map;

/**
 * 解析得到的bean用于生成sql
 *
 * @author tengqingya
 * @create 2016-11-22 11:28
 */
public class AutoBeanModel {
    private String tableName;
    private String modelName;
    private List<String>  fieldName;
    private List<String>  fieldType;
    private List<String>  fieldTable;

    private String modelPackageName;

    private ConfigBean configBean;

    //冗余 bean
    Map<String,BeanRelationshipModel> fieldNameToFieldTableMap;

    public String getTableName() {
        return tableName;
    }

    public void setTableName( String tableName ) {
        this.tableName = tableName;
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

    public String getModelName() {
        return modelName;
    }

    public void setModelName( String modelName ) {
        this.modelName = modelName;
    }

    public List<String> getFieldTable() {
        return fieldTable;
    }

    public void setFieldTable( List<String> fieldTable ) {
        this.fieldTable = fieldTable;
    }

    public Map<String, BeanRelationshipModel> getFieldNameToFieldTableMap() {
        return fieldNameToFieldTableMap;
    }

    public void setFieldNameToFieldTableMap( Map<String, BeanRelationshipModel> fieldNameToFieldTableMap ) {
        this.fieldNameToFieldTableMap = fieldNameToFieldTableMap;
    }

    public String getModelPackageName() {
        return modelPackageName;
    }

    public void setModelPackageName( String modelPackageName ) {
        this.modelPackageName = modelPackageName;
    }

    public ConfigBean getConfigBean() {
        return configBean;
    }

    public void setConfigBean( ConfigBean configBean ) {
        this.configBean = configBean;
    }
}
