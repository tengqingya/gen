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

    void button( List<T> list ,String fileName,String prefix );

    void checkbox( List<T> list,String fileName,String prefix );

    void radio( List<T> list,String fileName ,String prefix);

    void datepicker( List<T> list,String fileName,String prefix );

    void dropdown( List<T> list,String fileName,String prefix );

    void fileupload( List<T> list,String fileName,String prefix );

    void input( List<T> list,String fileName ,String prefix);

    void modal( List<T> list,String fileName,String prefix );

    void table( List<T> list,String fileName,String prefix );

    void inserttablejs( List<T> list,String fileName,String prefix );
}
