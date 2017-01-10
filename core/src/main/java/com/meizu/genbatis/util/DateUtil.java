package com.meizu.genbatis.util;

import org.apache.commons.lang.time.DateUtils;
import org.apache.log4j.Logger;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期操作工具类
 * @author tengqingya
 * @date 2016-11-121 下午3:49:19
 */
public class DateUtil extends DateUtils {

    private static final Logger LOGGER = Logger.getLogger( DateUtil.class );

    public static final String FORMAT_DATE = "yyyy-MM-dd";

    public static final String FORMAT_DATETIME = "yyyy-MM-dd HH:mm:ss";

    private static final String IS_DATETIME_REGEX = "^[0-9]{4}\\-[0-9]{1,2}\\-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}(\\.[0-9]{1,3})?$";

    public static final Date MAX_TIMESTAMP_DATE = str2Date("2038-01-19 00:00:00", FORMAT_DATETIME );

    /**
     * 获取日期的秒数
     * @param str 日期字符串
     * @param format 日期格式
     * @return 自1970年1月1日0点0分0秒以来的秒数
     */
    public static int getSeconds( String str, String format ) {

        SimpleDateFormat sdf = new SimpleDateFormat( format );
        try {
            Date dd = sdf.parse( str );
            return getSeconds( dd );
        } catch( ParseException e ) {
            LOGGER.warn( String.format( "%s getSeconds failed, %s", str, e.getMessage() ) );
        }

        return 0;
    }

    /**
     * 获取日期的秒数
     * @param str yyyy-MM-dd HH:mm:ss 或 yyyy-MM-dd
     * @return 自1970年1月1日0点0分0秒以来的秒数
     */
    public static int getSeconds( String str ) {
        if( str.length() == 10 ) {
            return getSeconds( str, FORMAT_DATE );
        } else {
            return getSeconds( str, FORMAT_DATETIME );
        }
    }

    /**
     * 获取当前时间戳
     * @return
     */
    public static int getSeconds() {
        return ( int )( System.currentTimeMillis() / 1000 );
    }

    /**
     * 获取日期的秒数
     * @param dd java.util.Date
     * @return 自1970年1月1日0点0分0秒以来的秒数
     */
    public static int getSeconds( Date dd ) {
        return ( int )( dd.getTime() / 1000 );
    }

    /**
     * 获取日期字符串
     * @param date 日期
     * @param format 日期格式
     * @return "2015-03-21"
     */
    public static String getString( Date date, String format ) {
        SimpleDateFormat sdf = new SimpleDateFormat( format );
        return sdf.format( date );
    }

    /**
     * 获取日期字符串
     * @param ms 毫秒
     * @return "2015-03-21 13:48:32"
     */
    public static String getStringDateTime( long ms ) {
        Date date = new Date( ms );
        SimpleDateFormat sdf = new SimpleDateFormat( FORMAT_DATETIME );
        return sdf.format( date );
    }

    /**
     * 获取当前日期字符串
     * @return "2015-03-21"
     */
    public static String getCurrentDate() {
        return getString(new Date(), FORMAT_DATE);
    }

    /**
     * 获取当前日期时间字符串
     * @return "2015-03-21 09:48:32"
     */
    public static String getCurrentDateTime() {
        return getString( new Date(), FORMAT_DATETIME );
    }

    /**
     * 时间字符串转date对象
     * @param dateString
     * @param format
     * @return
     */
    public static Date str2Date(String dateString, String format){
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
            return simpleDateFormat.parse(dateString);
        }
        catch (ParseException e) {
            throw new RuntimeException("时间转化格式错误!" + "[dateString=" + dateString + "]" + "[FORMAT_STRING=" + format + "]");
        }
    }

	/**
	 * 判断date1是否早于date2.
	 *
	 * @param date1
	 *            日期1
	 * @param date2
	 *            日期2
	 * @return boolean
	 */
	public static boolean before(Date date1, Date date2) {
		if (date1 == null && date2 == null) {
			return false;
		}
		if (date1 == null && date2 != null) {

			return true;
		}
		if (date1 != null && date2 == null) {
			return true;
		}
		return date1.before(date2);
	}
	
    public static Date getDayStart(Date date){
        if (date == null) {
            throw new IllegalArgumentException("The date must not be null");
        }
        final Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.set( Calendar.HOUR_OF_DAY, 0);
        c.set( Calendar.MINUTE, 0);
        c.set( Calendar.SECOND, 0);
        c.set( Calendar.MILLISECOND, 0);
        return c.getTime();
    }

    public static Date getDayEnd(Date date){
        if (date == null) {
            throw new IllegalArgumentException("The date must not be null");
        }
        final Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.set( Calendar.HOUR_OF_DAY, 23);
        c.set( Calendar.MINUTE, 59);
        c.set( Calendar.SECOND, 59);
        c.set( Calendar.MILLISECOND, 999);
        return c.getTime();
    }

    public static boolean isDateTime(String datetime) {
        if (datetime == null || datetime.length() == 0) {
            return false;
        }
        return datetime.matches(IS_DATETIME_REGEX);
    }

/*
    public static void main(String[] args){
        System.out.println(DateUtil.getSeconds(DateUtil.getString(new Date(), DateUtil.FORMAT_DATE)));
        System.out.println(DateUtil.getSeconds( DateUtil.addDays( DateUtil.str2Date( DateUtil.getString(new Date(), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE ), 20)));
        System.out.println(DateUtil.getSeconds( DateUtil.addHours( DateUtil.str2Date( DateUtil.getString(new Date(), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE ), 1)));
        System.out.println(DateUtil.getSeconds( DateUtil.addMinutes( DateUtil.str2Date( DateUtil.getString(new Date(), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE ), 20)));
    }
    */
}
