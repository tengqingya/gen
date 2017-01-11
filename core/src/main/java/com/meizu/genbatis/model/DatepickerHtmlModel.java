/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

/**
 * @author tengqingya
 * @create 2017-01-11 15:16
 */
public class DatepickerHtmlModel extends BaseHtmlModel {
    private String placeholder1;
    private String placeholder2;

    private String requiredMessage1;
    private String requiredMessage2;

    private String spanName1;
    private String spanName2;

    private String startTime;
    private String endTime;

    public String getPlaceholder1() {
        return placeholder1;
    }

    public void setPlaceholder1( String placeholder1 ) {
        this.placeholder1 = placeholder1;
    }

    public String getPlaceholder2() {
        return placeholder2;
    }

    public void setPlaceholder2( String placeholder2 ) {
        this.placeholder2 = placeholder2;
    }

    public String getRequiredMessage1() {
        return requiredMessage1;
    }

    public void setRequiredMessage1( String requiredMessage1 ) {
        this.requiredMessage1 = requiredMessage1;
    }

    public String getRequiredMessage2() {
        return requiredMessage2;
    }

    public void setRequiredMessage2( String requiredMessage2 ) {
        this.requiredMessage2 = requiredMessage2;
    }

    public String getSpanName1() {
        return spanName1;
    }

    public void setSpanName1( String spanName1 ) {
        this.spanName1 = spanName1;
    }

    public String getSpanName2() {
        return spanName2;
    }

    public void setSpanName2( String spanName2 ) {
        this.spanName2 = spanName2;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime( String startTime ) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime( String endTime ) {
        this.endTime = endTime;
    }

    @Override
    public String toString() {
        super.toString();
        return "DatepickerHtmlModel{" +
                "placeholder1='" + placeholder1 + '\'' +
                ", placeholder2='" + placeholder2 + '\'' +
                ", requiredMessage1='" + requiredMessage1 + '\'' +
                ", requiredMessage2='" + requiredMessage2 + '\'' +
                ", spanName1='" + spanName1 + '\'' +
                ", spanName2='" + spanName2 + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                '}';
    }
}
