package com.meizu.genbatis.model;

/**
 * @author tengqingya
 * @create 2016-12-15 8:59
 */
public class ConfigBean {
    private String whereClause;
    private String setClause;
    private String modelPackageName;
    private String delimiters;
    private String prefix;
    private Integer index;
    private String updateBatchWhereClause;
    private String selectAndCountPrefix;
    private String updatePrefix;


    public String getWhereClause() {
        return whereClause;
    }

    public void setWhereClause( String whereClause ) {
        this.whereClause = whereClause;
    }

    public String getSetClause() {
        return setClause;
    }

    public void setSetClause( String setClause ) {
        this.setClause = setClause;
    }

    public String getModelPackageName() {
        return modelPackageName;
    }

    public void setModelPackageName( String modelPackageName ) {
        this.modelPackageName = modelPackageName;
    }

    public String getDelimiters() {
        return delimiters;
    }

    public void setDelimiters( String delimiters ) {
        this.delimiters = delimiters;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix( String prefix ) {
        this.prefix = prefix;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex( Integer index ) {
        this.index = index;
    }

    public String getSelectAndCountPrefix() {
        return selectAndCountPrefix;
    }

    public void setSelectAndCountPrefix( String selectAndCountPrefix ) {
        this.selectAndCountPrefix = selectAndCountPrefix;
    }

    public String getUpdatePrefix() {
        return updatePrefix;
    }

    public void setUpdatePrefix( String updatePrefix ) {
        this.updatePrefix = updatePrefix;
    }

    public String getUpdateBatchWhereClause() {
        return updateBatchWhereClause;
    }

    public void setUpdateBatchWhereClause( String updateBatchWhereClause ) {
        this.updateBatchWhereClause = updateBatchWhereClause;
    }
}
