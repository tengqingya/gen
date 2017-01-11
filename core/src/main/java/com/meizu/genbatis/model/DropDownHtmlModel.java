/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

/**
 * 下拉框html模版model
 *
 * @author tengqingya
 * @create 2017-01-11 14:25
 */
public class DropDownHtmlModel extends BaseHtmlModel {
    private String data_enum;
    private String data_sel_all;
    private String data_result_in;

    public String getData_enum() {
        return data_enum;
    }

    public void setData_enum( String data_enum ) {
        this.data_enum = data_enum;
    }

    public String getData_sel_all() {
        return data_sel_all;
    }

    public void setData_sel_all( String data_sel_all ) {
        this.data_sel_all = data_sel_all;
    }

    public String getData_result_in() {
        return data_result_in;
    }

    public void setData_result_in( String data_result_in ) {
        this.data_result_in = data_result_in;
    }

    @Override
    public String toString() {
        super.toString();
        return "DropDownHtmlModel{" +
                "data_enum='" + data_enum + '\'' +
                ", data_sel_all='" + data_sel_all + '\'' +
                ", data_result_in='" + data_result_in + '\'' +
                '}';
    }
}
