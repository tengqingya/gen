/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.util;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;

/**
 * IP处理工具类
 * @author anyuan
 * @date 2015-4-11 下午5:45:21
 */
public class IpUtil {

	/**
	 * 将字符串型ip转成int型ip
	 * @param strIp
	 * @return
	 */
	public static int ip2Int( String strIp ) {
		String[] ss = strIp.split( "\\." );
		if( ss.length != 4 ) {
			return 0;
		}
		byte[] bytes = new byte[ ss.length ];
		for( int i = 0; i < bytes.length; i++ ) {
			bytes[ i ] = ( byte )Integer.parseInt( ss[ i ] );
		}
		return byte2Int( bytes );
	}

	/**
	 * 将int型ip转成String型ip
	 * @param intIp
	 * @return
	 */
	public static String int2Ip( int intIp ) {
		byte[] bytes = int2byte( intIp );
		StringBuilder sb = new StringBuilder();
		for( int i = 0; i < 4; i++ ) {
			sb.append( bytes[ i ] & 0xFF );
			if( i < 3 ) {
				sb.append( "." );
			}
		}
		return sb.toString();
	}

	/**
	 * 获取当前服务器ip
	 * @return
	 */
	public static String getLocalIp() {
//		StringBuilder sb = new StringBuilder();
//		try {
//			Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces();
//			while( en.hasMoreElements() ) {
//				NetworkInterface intf = ( NetworkInterface )en.nextElement();
//				Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses();
//				while( enumIpAddr.hasMoreElements() ) {
//					InetAddress inetAddress = ( InetAddress )enumIpAddr.nextElement();
//					if( !inetAddress.isLoopbackAddress() && !inetAddress.isLinkLocalAddress() && inetAddress.isSiteLocalAddress() ) {
//						sb.append( inetAddress.getHostAddress().toString() + "	" );
//					}
//				}
//			}
//		} catch( Exception e ) {
//		}
//		return sb.toString();
		String ip = null;
		try{
			Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces();
			while( en.hasMoreElements() ) {
				NetworkInterface intf = ( NetworkInterface )en.nextElement();
				Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses();
				while( enumIpAddr.hasMoreElements() ) {
					InetAddress inetAddress = ( InetAddress )enumIpAddr.nextElement();
					if( !inetAddress.isLoopbackAddress() && !inetAddress.isLinkLocalAddress() && inetAddress.isSiteLocalAddress() ) {
						ip = inetAddress.getHostAddress().toString();
						break;
					}
				}
			}
		}catch( Exception e ){
		}
		return ip;
	}

	public static String getIpAddr( HttpServletRequest request ) {
		String ip = request.getHeader( "x-forwarded-for" );
		if( ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase( ip ) ) {
			ip = request.getHeader( "Proxy-Client-IP" );
		}
		if( ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase( ip ) ) {
			ip = request.getHeader( "WL-Proxy-Client-IP" );
		}
		if( ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase( ip ) ) {
			ip = request.getRemoteAddr();
		}
		if( ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase( ip ) ) {
			ip = request.getHeader( "http_client_ip" );
		}
		if( ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase( ip ) ) {
			ip = request.getHeader( "HTTP_X_FORWARDED_FOR" );
		}
		// 如果是多级代理，那么取第一个ip为客户ip
		if( ip != null && ip.indexOf( "," ) != -1 ) {
			ip = ip.substring( ip.lastIndexOf( "," ) + 1, ip.length() ).trim();
		}
		return ip;
	}

	private static byte[] int2byte( int i ) {
		byte[] bytes = new byte[ 4 ];
		bytes[ 0 ] = ( byte )( 0xff & i );
		bytes[ 1 ] = ( byte )( ( 0xff00 & i ) >> 8 );
		bytes[ 2 ] = ( byte )( ( 0xff0000 & i ) >> 16 );
		bytes[ 3 ] = ( byte )( ( 0xff000000 & i ) >> 24 );
		return bytes;
	}

	private static int byte2Int( byte[] bytes ) {
		int n = bytes[ 0 ] & 0xFF;
		n |= ( ( bytes[ 1 ] << 8 ) & 0xFF00 );
		n |= ( ( bytes[ 2 ] << 16 ) & 0xFF0000 );
		n |= ( ( bytes[ 3 ] << 24 ) & 0xFF000000 );
		return n;
	}

	// public static void main( String[] args ) {
	// String ip1 = "192.168.0.1";
	// int intIp = ip2Int( ip1 );
	// String ip2 = int2Ip( intIp );
	// System.out.println( ip2.equals( ip1 ) );
	// }
}
