/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.adaptee;


import java.util.List;

/**
 * @author tengqingya
 * @create 2017-01-20 15:00
 */
public interface AdapteeInterface<T> {

    void button( List<T> list ,String fileName);

    void checkbox( List<T> list,String fileName );

    void radio( List<T> list,String fileName );

    void datepicker( List<T> list,String fileName );

    void dropdown( List<T> list,String fileName );

    void fileupload( List<T> list,String fileName );
}
