package com.meizu.genbatis.model;

/**
 * 字段名表名字段类型对应关系bean
 *
 * @author tengqingya
 * @create 2016-11-22 16:34
 */
public class BeanRelationshipModel {
    private String name;
    private String tableName;
    private String type;

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName( String tableName ) {
        this.tableName = tableName;
    }

    public String getType() {
        return type;
    }

    public void setType( String type ) {
        this.type = type;
    }
}
