/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

import java.util.List;

/**
 * @author tengqingya
 * @create 2017-01-11 17:43
 */
public class CheckboxAndRadioHtmlBean extends BaseHtmlModel {
    private List<CheckboxChildBean> checkboxList;
    //checkbox或者radio
    private String type;

    public List<CheckboxChildBean> getCheckboxList() {
        return checkboxList;
    }

    public void setCheckboxList( List<CheckboxChildBean> checkboxList ) {
        this.checkboxList = checkboxList;
    }

    public String getType() {
        return type;
    }

    public void setType( String type ) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "CheckboxAndRadioHtmlBean{" +
                "checkboxList=" + checkboxList +
                ", type='" + type + '\'' +
                '}';
    }
}
