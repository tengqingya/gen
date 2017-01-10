package com.meizu.genbatis.exception;

import java.io.Serializable;

/**
 * @author tengqingya
 * @create 2016-11-21 14:20
 */
public class GenerateException extends RuntimeException implements Serializable {
    private static final long serialVersionUID = 1L;
    private int code;
    private String message;
    private Object param;

    public GenerateException(Exception ex) {
        super(ex.getMessage());
        if (ex instanceof GenerateException) {
            GenerateException be = (GenerateException) ex;
            this.code = be.getCode();
            this.message = be.getMessage();
            this.param = be.getParam();
        }
    }

    /**
     * 构造函数
     *
     * @param code
     *            异常码
     * @param message
     *            异常信息
     * @param param
     *            现场数据对象
     */
    public GenerateException(int code, String message, Object param) {
        super(message);
        this.code = code;
        this.message = message;
        this.param = param;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getParam() {
        return param;
    }

    public void setParam(Object param) {
        this.param = param;
    }
}
