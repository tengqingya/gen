/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

import java.util.List;

/**
 * @author tengqingya
 * @create 2017-01-12 14:46
 */
public class InserTableJsModel extends BaseJsModel {
    private List<String> columnNames;

    public List<String> getColumnNames() {
        return columnNames;
    }

    public void setColumnNames( List<String> columnNames ) {
        this.columnNames = columnNames;
    }
}
