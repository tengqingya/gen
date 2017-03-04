/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.tqy.util;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Joiner;
import com.meizu.genbatis.exception.GenerateException;
import jodd.http.HttpRequest;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpHead;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.params.ClientPNames;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DecompressingHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.DefaultHttpRequestRetryHandler;
import org.apache.http.impl.conn.PoolingClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class HttpUtil {

    private HttpUtil() {};

    private static final Logger LOGGER = Logger.getLogger( HttpUtil.class );

    private static final boolean isDebug = LOGGER.isDebugEnabled();

    private static final String CONTENT_CHARSET = "UTF-8";

    /**请求连接超时*/
    private static final int CONNECTION_TIMEOUT = 3000;

    /**读取数据超时*/
    private static final int SO_TIMEOUT = 5000;

    /**从连接池获取连接超时*/
    private static final int CONN_MANAGER_TIMEOUT = 1000;

    /**每个域名最大连接数*/
    private static final int MAX_CONNECTIONS_PER_ROUTE = 1000;

    /**总共最大连接数*/
    private static final int MAX_TOTAL_CONNECTIONS = 5000;

    /**缓冲池大小*/
    private static final int SOCKET_BUFFER_SIZE = 8198;

    private static HttpClient HTTP_CLIENT = null;
//    private static DefaultHttpClient HTTP_CLIENT = null;

    static {
        try {
            // Instance of this interface manage which X509 certificates may be
            // used to
            // authenticate the remote side of a secure socket.
            // Decisions may be based on trusted certificate authorities,
            // certificate revocation lists, online status checking or other
            // means.
            TrustManager dummyTrustManager = new X509TrustManager() {

                @Override
                public void checkClientTrusted( X509Certificate[] chain,
                        String authType ) throws CertificateException {
                    // Oh, I am easy!
                }

                @Override
                public void checkServerTrusted( X509Certificate[] chain,
                        String authType ) throws CertificateException {
                    // Oh, I am easy!
                }

                @Override
                public X509Certificate[] getAcceptedIssuers() {
                    return null;
                }
            };

            // Instances of this class represent a secure socket protocol
            // implementation
            // which acts as a factory for secure socket factories or
            // SSLEngines.
            // This class is initialized with an optional set of key
            // and trust managers and source of secure random bytes.
            SSLContext sslcontext = SSLContext.getInstance( SSLSocketFactory.TLS );
            sslcontext.init( null, new TrustManager[] { dummyTrustManager }, null );

            // SSLSocketFactory can be used to validate the identity of the
            // HTTPS server against a list of
            // trusted certificates and to authenticate to the HTTPS server
            // using a private key.
            SSLSocketFactory sslSocketFactory = new SSLSocketFactory( sslcontext,
                    SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER );

            // A set of supported protocol Schemes. Schemes are identified by
            // lowercase names.
            SchemeRegistry schemeRegistry = new SchemeRegistry();
            schemeRegistry.register( new Scheme( "http", 80, PlainSocketFactory.getSocketFactory() ) );
            schemeRegistry.register( new Scheme( "https", 443, sslSocketFactory ) );

            PoolingClientConnectionManager connManager = new PoolingClientConnectionManager( schemeRegistry );
            connManager.setDefaultMaxPerRoute( MAX_CONNECTIONS_PER_ROUTE );
            connManager.setMaxTotal( MAX_TOTAL_CONNECTIONS );

            HttpParams clientParams = new BasicHttpParams();
            clientParams.setLongParameter( ClientPNames.CONN_MANAGER_TIMEOUT, CONN_MANAGER_TIMEOUT );

            HttpProtocolParams.setVersion( clientParams, HttpVersion.HTTP_1_1 );
            HttpProtocolParams.setUserAgent( clientParams, "Meizu Http Client" );
            HttpProtocolParams.setUseExpectContinue( clientParams, true );

            HttpConnectionParams.setConnectionTimeout( clientParams, CONNECTION_TIMEOUT );
            HttpConnectionParams.setSoTimeout( clientParams, SO_TIMEOUT );
            HttpConnectionParams.setSocketBufferSize( clientParams, SOCKET_BUFFER_SIZE );
            HttpConnectionParams.setTcpNoDelay( clientParams, true );
            HttpProtocolParams.setContentCharset( clientParams, CONTENT_CHARSET );

            DefaultHttpClient httpClient = new DefaultHttpClient( connManager, clientParams );
            /**关闭重试次数*/
            httpClient.setHttpRequestRetryHandler( new DefaultHttpRequestRetryHandler( 0, false ) );
            if( isDebug ) {
                LOGGER.debug( "++++ initializing pool with following settings:" );
                LOGGER.debug( "++++ maxConnectionsPerRoute : " + MAX_CONNECTIONS_PER_ROUTE );
                LOGGER.debug( "++++ maxTotalConnections    : " + MAX_TOTAL_CONNECTIONS );
                LOGGER.debug( "++++ httpVersion            : " + HttpVersion.HTTP_1_1 );
                LOGGER.debug( "++++ contentCharset         : " + CONTENT_CHARSET );
                LOGGER.debug( "++++ connectionTimeout      : " + CONNECTION_TIMEOUT );
                LOGGER.debug( "++++ socketTimeout          : " + SO_TIMEOUT );
                LOGGER.debug( "++++ socketBufferSize       : " + 8192 );
            }
            HTTP_CLIENT = new DecompressingHttpClient( httpClient );
//            HTTP_CLIENT = httpClient;
        } catch( Exception ex ) {
            ex.printStackTrace();
            throw new RuntimeException( "Init meizu http client error.", ex );

        }
    }

    public static String doPost( String url, Map<String, Object> params ){
        try {
            List<NameValuePair> nvList = new ArrayList<>();
            for( Map.Entry<String, Object> entry : params.entrySet()){
                nvList.add(new BasicNameValuePair(entry.getKey(), Objects.toString(entry.getValue())));
            }
            HttpPost request = new HttpPost( url );
            request.setEntity(new UrlEncodedFormEntity(nvList, CONTENT_CHARSET));
            return execute( request );
        } catch( UnsupportedEncodingException e ) {
            throw new RuntimeException( String.format( "http post fail[message=%s]", e.getMessage() ));
        }
    }

    public static String doPostCookie( String url){
        try {
            HttpPost request = new HttpPost( url );
            request.addHeader("Cookie","JSESSIONID=74648F975748F5ED026EAEE2C2DE2EBD");
            return execute( request );
        } catch( Exception e ) {
            throw new RuntimeException( String.format( "http post fail[message=%s]", e.getMessage() ));
        }
    }

    public static String doPost( String url, String params ) {
        try {
            return doPost( url, new StringEntity( params, CONTENT_CHARSET ) );
        } catch( Exception e ) {
            throw new RuntimeException(String.format( "http post fail[message=%s]", e.getMessage() ));
        }
    }

    public static String doPost( String url, HttpEntity entity ) {
        HttpPost request = new HttpPost( url );
        request.setEntity( entity );
        return execute( request );
    }

    public static String doGet( String url, Map<String, Object> params ) {
        if( null != params ) {
            url = UrlUtil.appendParams2Url( url, params );
        }
        HttpGet request = new HttpGet( url );
        return execute( request );
    }

    /**
     * 允许尝试多次的GET请求
     * @param url
     * @param params
     * @param tryMax
     * @return
     * @throws Exception
     */
    public static String doGet( String url, Map<String, Object> params, int tryMax ) throws Exception {
        int tryCount = 0;
        while( tryCount < tryMax ){
            try {
                tryCount++;
                return HttpUtil.doGet( url, params );
            } catch( Exception ex ) {
                Thread.sleep( 10 );
                LOGGER.error( String.format( "retry http request[msg=%s|url=%s|param=%s|tryCount=%s]",
                        ex.getMessage(), url, JSON.toJSONString( params ), tryCount ), ex );
            }
        }
        throw new Exception(String.format( "http request fail after %s times", url, tryCount ));
    }

    /**
     *
     * @param url 请求url
     * @param params 请求参数
     * @param tryMax 重试次数
     * @param connectionTimeout 连接超时时间，毫秒
     * @return
     * @throws Exception
     */
    public static String doGet( String url, Map<String, Object> params, int tryMax, int connectionTimeout) throws Exception {
        int tryCount = 0;
        while( tryCount < tryMax ){
            try {
                tryCount++;
                HttpRequest request = HttpRequest.get(url).connectionTimeout(connectionTimeout)
                        .charset(CONTENT_CHARSET)
                        .queryString(Joiner.on("&").withKeyValueSeparator("=").join(params), true);
                jodd.http.HttpResponse response = request.send();
                if( HttpStatus.SC_OK != response.statusCode() ) {
                    throw new RuntimeException(String.format( "http request fail[status=%d|message=%s]",
                            response.statusCode(),
                            response.bodyText()));
                }
                return response.bodyText();
            } catch( Exception ex ) {
                Thread.sleep( 10 );
                LOGGER.error( String.format( "retry http request[msg=%s|url=%s|param=%s|tryCount=%s]",
                        ex.getMessage(), url, JSON.toJSONString( params ), tryCount ), ex );
            }
        }
        throw new Exception(String.format( "http request fail after %s times[url=%s]", tryCount, url ));

    }

    public static String streamRequest( String urlstr, String data ) {
        InputStream in = null;
        try {
            URL url = new URL( urlstr );
            URLConnection conn = url.openConnection();
            conn.setConnectTimeout( 5000 );
            conn.setReadTimeout( 5000 );
            conn.setDoOutput( true );
            OutputStreamWriter out = new OutputStreamWriter( conn.getOutputStream() );
            out.write( data );
            out.flush();
            out.close();
            StringBuffer response = new StringBuffer();
            in = conn.getInputStream();
            byte[] b = new byte[ 4096 ];
            for( int n; ( n = in.read( b ) ) != -1; ) {
                response.append( new String( b, 0, n, "utf-8" ) );
            }

            return response.toString();
        } catch( IOException ex ) {
            throw new GenerateException(11111,
                    String.format( "http stream request fail[message=%s]", ex.getMessage() ), null);
        } finally {
            try {
                if( in != null ) {
                    in.close();
                }
            } catch( IOException e ) {
                LOGGER.warn( e.getMessage() );
            }
        }
    }

    /**
     * 判断url是否有效
     * @param url
     * @return
     */
    public static boolean isValid( String url ) {
        if( url == null || url.length() == 0 ) {
            return false;
        }

        try {
            HttpHead request = new HttpHead( url );
            HttpResponse response = HTTP_CLIENT.execute( request );
            if( LOGGER.isDebugEnabled() ) {
                LOGGER.debug( String.format( "request head[url=%s]", url ) );
            }
            StatusLine statusLine = response.getStatusLine();
            if( null == statusLine ) {
                LOGGER.error( String.format( "no status line[url=%s]", url ) );
                throw new RuntimeException("no status line");
            }
            if( statusLine.getStatusCode() != HttpStatus.SC_OK ) {
                throw new RuntimeException(String.format( "request head fail[url=%s|status=%s|message=%s]", url,
                        statusLine.getStatusCode(),
                        EntityUtils.toString( response.getEntity(), CONTENT_CHARSET )));
            }

            Header contentLengthHeader = response.getFirstHeader( "Content-Length" );
            if( null == contentLengthHeader ) {
                throw new RuntimeException(String.format( "no http content-length header[url=%s]", url ));
            }

            long length = NumberUtils.toLong( contentLengthHeader.getValue() );
            if( length <= 0 ) {
                throw new RuntimeException(String.format( "url content-length invalid[url=%s|content-length=%s]", url, length ));
            }
            return true;
        } catch( RuntimeException be ) {
            LOGGER.error(String.format("execute http request fail[url=%s|msg=%s]", url, be.getMessage()));
            throw be;
        } catch( Exception ex ) {
            LOGGER.error( String.format( "http request fail[url=%s|msg=%s|param=%s]", url, ex.getMessage(), null) );
            throw new RuntimeException(String.format( "http head fail[url=%s|message=%s]", url, ex.getMessage() ));
        }
    }

    public static void download( String url, String localpath ) {
        try {
            HttpGet request = new HttpGet( url );
            HttpResponse response = HTTP_CLIENT.execute( request );
            StatusLine statusLine = response.getStatusLine();
            if( null == statusLine ) {
                throw new RuntimeException("download request fail, no status line");
            }
            if( statusLine.getStatusCode() != HttpStatus.SC_OK ) {
                throw new RuntimeException(String.format( "download request fail[status=%d|message=%s]",
                        statusLine.getStatusCode(),
                        EntityUtils.toString( response.getEntity(), CONTENT_CHARSET ) ));
            }

            HttpEntity entity = response.getEntity();
            if( null == entity ) {
                throw new RuntimeException("download request fail, no response entity");
            }

            FileUtils.copyInputStreamToFile( entity.getContent(), new File( localpath ) );
        } catch( RuntimeException be ) {
            LOGGER.error(String.format("execute http request fail[url=%s|msg=%s]", url, be.getMessage()));
            throw be;
        } catch( Exception ex ) {
            LOGGER.error( String.format( "http request fail[url=%s|msg=%s|param=%s]", url, ex.getMessage(), localpath) );
            throw new RuntimeException(String.format( "download request fail[url=%s|localpath=%s|message=%s]", url,
                    localpath, ex.getMessage() ));
        }
    }

    private static String execute( HttpUriRequest request ) {
        try {
            HttpResponse response = HTTP_CLIENT.execute( request );
            StatusLine statusLine = response.getStatusLine();
            if( null == statusLine ) {
                throw new RuntimeException( "http request fail, no status line");
            }
            if( statusLine.getStatusCode() != HttpStatus.SC_OK ) {
                throw new RuntimeException(String.format( "http request fail[status=%d|message=%s]", statusLine.getStatusCode(),
                        EntityUtils.toString( response.getEntity(), CONTENT_CHARSET )));
            }

            return EntityUtils.toString( response.getEntity(), CONTENT_CHARSET );
        } catch( RuntimeException ex ) {
            LOGGER.error(String.format("execute http request fail[url=%s|msg=%s]", request.getURI(), ex.getMessage()));
            throw ex;
        } catch( Exception ex ) {
            LOGGER.error( String.format( "http request fail[msg=%s|url=%s|param=%s]", ex.getMessage(), request.getURI(),
                    JSON.toJSONString( request.getParams() ) ) );
            throw new RuntimeException("http request fail");
        } finally {
            if( null != request && !request.isAborted() ) {
                request.abort();
            }
        }
    }
}
