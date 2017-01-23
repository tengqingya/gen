/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

/**
 * hibelate_validate测试
 *
 * @author tengqingya
 * @create 2017-01-23 10:40
 */
public class TestValidateModel {
    @Range(min = 1,max = 130,message = "年龄1到130岁")
    private int age;
    @Email(regexp = "tengqingya",message = "邮箱只能是tengqingya的")
    private String email;
    @Length(min = 1,max = 4,message = "姓名长度1到3位")
    private String name;
    @Length(max = 10,message = "time 时间戳只能10位")
    private int startTime;
    @Range(min = 0,max = 1,message = "状态只能是0和1")
    private int status;
    private boolean cancel;

    public int getAge() {
        return age;
    }

    public void setAge( int age ) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail( String email ) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public int getStartTime() {
        return startTime;
    }

    public void setStartTime( int startTime ) {
        this.startTime = startTime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus( int status ) {
        this.status = status;
    }

    public boolean isCancel() {
        return cancel;
    }

    public void setCancel( boolean cancel ) {
        this.cancel = cancel;
    }

    @Override
    public String toString() {
        return "TestValidateModel{" +
                "age=" + age +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", startTime=" + startTime +
                ", status=" + status +
                ", cancel=" + cancel +
                '}';
    }
}
