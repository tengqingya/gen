package com.meizu.genbatis.model;

import java.io.Serializable;

/**
 * 返回结果对象
 * 
 * @author tengqingya
 * 
 */
public class ResultModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private int code = 200;
	private String message = "";
	private Object value;
	private String redirect = "";

	public ResultModel(){};
	
	public ResultModel( Object value){
	    this.value = value ;
	}
	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRedirect() {
        return redirect;
    }

    public void setRedirect(String redirect) {
        this.redirect = redirect;
    }

}
