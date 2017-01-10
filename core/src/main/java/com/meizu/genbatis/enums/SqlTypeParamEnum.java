package com.meizu.genbatis.enums;

/**
 * @author tengqingya
 * @create 2016-11-22 9:59
 */
public enum SqlTypeParamEnum {
    TINYINT(1,"Integer"),
    BIGINT(2,"Long"),
    INT(3,"Integer"),
    VARCHAR(4,"String"),
    TEXT(5,"String"),
    SMALLINT(6,"Integer"),
    TINYTEXT(7,"String"),
    CHAR(8,"String"),
    DATETIME(9,"Date"),
    TIMESTAMP(10,"Date"),
    DOUBLE(11,"Double"),
    FLOAT(12,"Float");

    private int key;
    private String value;

    private SqlTypeParamEnum( int key, String value ){
        this.key = key;
        this.value = value;
    }

    public int getKey() {
        return key;
    }

    public void setKey( int key ) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue( String value ) {
        this.value = value;
    }

    public static SqlTypeParamEnum toEnumValue( int key ){
        switch (key){
            case 1 : return TINYINT;
            case 2 : return BIGINT;
            case 3 : return INT;
            case 4 : return VARCHAR;
            case 5 : return TEXT;
            case 6 : return SMALLINT;
            case 7 : return TINYTEXT;
            case 8 : return CHAR;
            case 9 : return DATETIME;
            case 10 : return TIMESTAMP;
            case 11 : return DOUBLE;
            case 12 : return FLOAT;
            default: return null;
        }
    }

    public static int toEnumKey( String value ){
        switch (value){
            case "tinyint" :
            case "smallint":
                return 1;
            case "bigint" : return 2;
            case "int" : return 3;
            case "varchar" :
            case "char":
                return 4;
            case "text" :
            case "tinytext":
                return 5;
            case "datetime":
                return 9;
            case "timestamp":
                return 10;
            case "double":
                return 11;
            case "float":
                return 12;
            default: return 4;
        }
    }
}
