package com.meizu.tqy.util;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

public class UrlUtil {
    public static String getContextPath( HttpServletRequest request ) {
        return buildContextPath( request );
    }

    public static String getRequestUri( HttpServletRequest request ) {
        if( null == request ) {
            return "";
        }
        String requestUri = request.getRequestURI();
        int pathParamIndex = requestUri.indexOf( ';' );
        if( 0 < pathParamIndex ) {
            requestUri = requestUri.substring( 0, pathParamIndex );
        }
        int queryParamIndex = requestUri.indexOf( '?' );
        if( 0 < queryParamIndex ) {
            requestUri = requestUri.substring( 0, queryParamIndex );
        }
        String c = request.getContextPath();
        if( null != c && !"".equals( c.trim() ) ) {
            requestUri = requestUri.substring( c.length() );
        }
        return requestUri;
    }

    public static String getRequestUrl( HttpServletRequest request ) {
        return buildRequestUrl( request );
    }

    public static String getFullRequestUrl( HttpServletRequest request ) {
        return buildContextPath( request ) + buildRequestUrl( request );
    }

    public static String buildContextPath( HttpServletRequest request ) {
        String scheme = request.getScheme();
        int port = request.getServerPort();
        boolean np = true;
        if( -1 == port || ( "http".equalsIgnoreCase( scheme ) && 80 == port ) || ( "https".equalsIgnoreCase( scheme ) && 443 == port ) ) {
            np = false;
        }
        return scheme + "://" + request.getServerName() + ( ( np ) ? ( ":" + port ) : "" ) + request.getContextPath();
    }

    public static String buildRequestUrl( HttpServletRequest request ) {
        String url = request.getServletPath();
        if( null == url ) {
            url = request.getRequestURI();
            url = url.substring( request.getContextPath().length() );
        }
        String pathInfo = request.getPathInfo();
        String queryString = request.getQueryString();
        return url + ( null == pathInfo ? "" : pathInfo ) + ( null == queryString ? "" : ( "?" + queryString ) );
    }

    public static String getRealPath( HttpServletRequest request, String path ) {
        HttpSession session = null;
        if( null == request || null == ( session = request.getSession( false ) ) ) {
            return "";
        }
        return session.getServletContext().getRealPath( path );
    }

    /**
     * 获取文件的绝对路径
     * @param path
     * @return
     */
    public static String getRealPath( String path ) {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if( null == attributes ) {
            return null;
        }

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes)attributes;
        HttpServletRequest request = requestAttributes.getRequest();

        return getRealPath( request, path );
    }
    
    public static String appendParams2Url(String url, Map<String, Object> params){
        StringBuffer sb = new StringBuffer();
        sb.append(url);
        boolean first = true;
        for (Map.Entry<String, Object> entry : params.entrySet() ) {
            if (first) {
                sb.append("?");
                first = false;
            }
            else {
                sb.append("&");
            }
            sb.append(entry.getKey()).append("=").append(entry.getValue().toString());
        }
        return sb.toString();
    }

    public static String getQueryString(Map<String, Object> params){
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        for(Map.Entry<String, Object> entry : params.entrySet() ){
            if(first){
                first = false;
            }
            else {
                sb.append("&");
            }
            sb.append(entry.getKey()).append("=").append(entry.getValue().toString());
        }
        return sb.toString();
    }
}
