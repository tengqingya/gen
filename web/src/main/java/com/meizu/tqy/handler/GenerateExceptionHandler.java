package com.meizu.tqy.handler;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.meizu.genbatis.model.ResultModel;
import org.apache.commons.io.Charsets;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import com.meizu.genbatis.exception.GenerateException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Map;

/**
 * 业务异常处理
 * @author tengqingya
 * @create 2016-11-28 11:28
 */
@Component
public class GenerateExceptionHandler {

    private static final Logger LOGGER = Logger.getLogger( GenerateExceptionHandler.class );

    public void handler( HttpServletRequest request, HttpServletResponse response, Exception ex ) {
        Map<String, String[]> p = request.getParameterMap();
        String requestUrl = request.getRequestURI() + "|" + ( null == p || p.isEmpty() ? "{}" : JSON.toJSONString( p ) );
        GenerateException be;
        if( ex instanceof GenerateException ) {
            be = ( GenerateException )ex;
            if( LOGGER.isInfoEnabled() ) {
                LOGGER.warn( String.format( "biz exception[%s|%s|url=%s]", be.getCode(), be.getMessage(), requestUrl)  );
            }
        } else {
            be = new GenerateException( ex );
            LOGGER.error( String.format( "exception[%s|%s|url=%s]", be.getCode(), ex.getMessage(), requestUrl ), ex );
        }

        response.setContentType( "text/json; charset=utf-8" );
        OutputStream os = null;
        ResultModel result = new ResultModel();
        result.setCode( be.getCode() );
        result.setMessage( be.getMessage() );
        result.setValue( null );
        try{
            os = response.getOutputStream();
            os.write( JSON.toJSONString(result).getBytes(Charsets.UTF_8) );
            os.flush();
        }catch( Exception e1 ){
            GenerateException be1 = new GenerateException( e1 );
            LOGGER.error( String.format( "fail to handle error response by OutputStream[code=%s|message=%s]", be1.getCode(), be1.getMessage()), be1 );
            PrintWriter out = null;
            try {
                out = response.getWriter();
                out.write( JSONObject.toJSONString( result ) );
                out.flush();
            } catch( Exception e2 ) {
                GenerateException be2 = new GenerateException( e2 );
                LOGGER.error( String.format( "fail to handle error response by PrintWriter[code=%s|message=%s]", be2.getCode(), be2.getMessage()), be2 );
            } finally {
                IOUtils.closeQuietly(out);
            }
        }finally {
            IOUtils.closeQuietly(os);
        }
    }

}
