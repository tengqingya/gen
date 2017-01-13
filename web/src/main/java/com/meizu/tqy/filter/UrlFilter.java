package com.meizu.tqy.filter;

import com.meizu.genbatis.util.IpUtil;
import com.meizu.tqy.util.UrlUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

/**
 * url拦截器
 * Created by tengqingya on 2016-11-19.
 */
@Component
public class UrlFilter extends GenericFilterBean {

    private static final Logger LOGGER = Logger.getLogger( UrlFilter.class );

    public void doFilter( ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain ) throws IOException, ServletException {
        long startTime = System.currentTimeMillis();
        HttpServletRequest request = ( HttpServletRequest )servletRequest;
        HttpServletResponse response = ( HttpServletResponse )servletResponse;

        String requestUrl = UrlUtil.getRequestUri( request );
        String ip = IpUtil.getIpAddr( request );

        ///ng下 favicon.icon就不请求拉 如果使用注解方式 还是要让其走spring
//        if( requestUrl.equalsIgnoreCase( "/favicon.ico" ) ) {
//            return;
//        }

        LOGGER.info( String.format( "request start：url=%s,ip=%s", requestUrl,ip ) );

        filterChain.doFilter( request, response );

        LOGGER.info( String.format( "request finish：url=%s,cost %dms", requestUrl, System.currentTimeMillis() - startTime ) );
    }

}
