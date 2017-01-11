/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

import java.util.List;

/**
 * @author tengqingya
 * @create 2017-01-11 16:14
 */
public class TableHtmlModel extends  BaseHtmlModel{
    private List<TableThBean> tableList;

    public List<TableThBean> getTableList() {
        return tableList;
    }

    public void setTableList( List<TableThBean> tableList ) {
        this.tableList = tableList;
    }

    @Override
    public String toString() {
        super.toString();
        return "TableHtmlModel{" +
                "tableList=" + tableList +
                '}';
    }
}
