/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

import java.util.List;

/**
 * @author tengqingya
 * @create 2017-01-11 17:43
 */
public class CheckboxHtmlBean extends BaseHtmlModel {
    private List<CheckboxChildBean> checkboxList;

    public List<CheckboxChildBean> getCheckboxList() {
        return checkboxList;
    }

    public void setCheckboxList( List<CheckboxChildBean> checkboxList ) {
        this.checkboxList = checkboxList;
    }

    @Override
    public String toString() {
        return "CheckboxHtmlBean{" +
                "checkboxList=" + checkboxList +
                '}';
    }
}
