/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

import java.util.List;
import java.util.Map;

/**
 * @author tengqingya
 * @create 2017-01-12 14:46
 */
public class InserTableJsModel extends BaseJsModel {
    private Map<String,String> columnNames;

    public Map<String, String> getColumnNames() {
        return columnNames;
    }

    public void setColumnNames( Map<String, String> columnNames ) {
        this.columnNames = columnNames;
    }
}
