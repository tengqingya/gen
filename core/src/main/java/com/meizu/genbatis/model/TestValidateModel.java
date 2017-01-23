/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.model;

import com.meizu.genbatis.checkgroups.CheckDeleteGroup;
import com.meizu.genbatis.checkgroups.CheckUpdateGroup;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;

/**
 * hibelate_validate测试
 *
 * @author tengqingya
 * @create 2017-01-23 10:40
 */
public class TestValidateModel {
    @Range(min = 1,max = 130,message = "年龄1到130岁",groups = {CheckUpdateGroup.class, Default.class})
    private int age;

    @Email(message = "邮箱只能是tengqingya的")
    @NotBlank(message = "email不能为blacnk")
    private String email;

    @NotNull(message = "name不能为null",groups = CheckUpdateGroup.class)

    @Length.List({@Length(min = 1,max = 4,message = "姓名长度1到4位",groups = {CheckUpdateGroup.class, Default.class}),@Length(min = 1,max = 1,message = "姓名长度1位",groups = CheckDeleteGroup.class)})
    private String name;

    @Range(min = 0,max = Integer.MAX_VALUE,message = "time 时间戳只能10位")
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
