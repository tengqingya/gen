package com.meizu.genbatis.model;

/**
 * @author tengqingya
 * @create 2016-11-25 15:17
 */
public class SqlResultModel {
    private String model;
    private String param;
    private String sql;
    private String dao;

    public String getService() {
        return service;
    }

    public void setService( String service ) {
        this.service = service;
    }

    private String service;

    public String getDao() {
        return dao;
    }

    public void setDao( String dao ) {
        this.dao = dao;
    }

    private AutoBeanModel autoBeanModel;

    public String getModel() {
        return model;
    }

    public void setModel( String model ) {
        this.model = model;
    }

    public String getParam() {
        return param;
    }

    public void setParam( String param ) {
        this.param = param;
    }

    public String getSql() {
        return sql;
    }

    public void setSql( String sql ) {
        this.sql = sql;
    }

    public AutoBeanModel getAutoBeanModel() {
        return autoBeanModel;
    }

    public void setAutoBeanModel( AutoBeanModel autoBeanModel ) {
        this.autoBeanModel = autoBeanModel;
    }
}
