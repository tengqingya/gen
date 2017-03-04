/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.tqy.service;

import com.google.common.base.Splitter;
import com.meizu.genbatis.util.ListUtil;
import com.meizu.tqy.util.HttpUtil;
import com.meizu.tqy.util.MailEngine;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 发送http请求
 *
 * @author tengqingya
 * @create 2017-03-04 16:15
 */
@Service
public class HttpRequestService {

    private static final Logger LOGGER = Logger.getLogger(HttpRequestService.class);

    @Autowired
    private MailEngine mailEngine;

    private ThreadPoolTaskExecutor excutor;

    private String urlMX6 ="http://oa.meizu.com/seeyon/form/formData.do?method=calculate&formMasterId=6994125995342384673&formId=-1035972809061612598&tableName=&fieldName=field0006&recordId=0&rightId=-5742292236026229497&moduleId=-1&tag=1488618031324";
    private String urlPro6P="http://oa.meizu.com/seeyon/form/formData.do?method=calculate&formMasterId=-5292122139029649597&formId=-1035972809061612598&tableName=&fieldName=field0006&recordId=0&rightId=-5742292236026229497&moduleId=-1&tag=1488613941838";

    private int count;

    public void initExecutor(){
        excutor = new ThreadPoolTaskExecutor();
        excutor.setQueueCapacity(1000);
        excutor.setCorePoolSize(2);
        excutor.setMaxPoolSize(20);
        excutor.setRejectedExecutionHandler( new LogAndDiscardPolicy() );
        excutor.setThreadNamePrefix("executor-thread");
        excutor.setThreadGroupName("executor-threadGroup");
        excutor.setWaitForTasksToCompleteOnShutdown(true);
        excutor.initialize();
    }

    @PostConstruct
    public void start(){
        System.out.println("PostConstructPostConstructPostConstructPostConstructPostConstruct");
        initExecutor();
        excutor.submit(new Runnable() {
            @Override
            public void run() {
                boolean ceshiji=false ;
                while( !ceshiji ){
                    ceshiji(urlMX6);
                    try {
                        Thread.sleep(60*1000);
                    } catch( InterruptedException e ) {
                        e.printStackTrace();
                    }
                    ceshiji = ceshiji(urlPro6P);
                    try {
                        Thread.sleep(60*1000);
                    } catch( InterruptedException e ) {
                        e.printStackTrace();
                    }
                    if(count>10){
                        ceshiji = true;
                        LOGGER.info("任务完成,done");
                    }
                }
            }
        });
    }

    public boolean ceshiji(String url){

        //mx6
        String s = HttpUtil.doPostCookie(url);
        //pro6splus
//        String s = HttpUtil.doPostCookie("http://oa.meizu.com/seeyon/form/formData.do?method=calculate&formMasterId=-5292122139029649597&formId=-1035972809061612598&tableName=&fieldName=field0006&recordId=0&rightId=-5742292236026229497&moduleId=-1&tag=1488613941838");
        s = decodeUnicode(s);
        System.out.println(s);
        int i = s.lastIndexOf(",value:");
        int i1 = s.indexOf(",toRelationType");
        s = s.substring(i+1,i1);
        String[] split = s.split(":");
        String result = split[1];
        if(result.equals("\"\"")){
            return false;
        }

        List<String> list = Splitter.on( "," ).omitEmptyStrings().trimResults().splitToList( "tengqingya@meizu.com" );
        String[] toMail = ListUtil.toArray( list );

        if( StringUtils.isNotEmpty(result)){
            int num = Integer.parseInt(result.replaceAll("\"",""));
            System.out.println("数量为-----"+num);
            if(num > 0){
                mailEngine.asyncSendMessage( toMail, "account@meizu.com", "------领取测试机拉------", "领取测试机拉领取测试机拉领取测试机拉领取测试机拉领取测试机拉", null, null, false );
                count++;
                return false;
            }
        }
        System.out.println(result);
        return false;
    }

    public static String decodeUnicode(String str) {
        Charset set = Charset.forName("UTF-16");
        Pattern p = Pattern.compile("\\\\u([0-9a-fA-F]{4})");
        Matcher m = p.matcher( str );
        int start = 0 ;
        int start2 = 0 ;
        StringBuffer sb = new StringBuffer();
        while( m.find( start ) ) {
            start2 = m.start() ;
            if( start2 > start ){
                String seg = str.substring(start, start2) ;
                sb.append( seg );
            }
            String code = m.group( 1 );
            int i = Integer.valueOf( code , 16 );
            byte[] bb = new byte[ 4 ] ;
            bb[ 0 ] = (byte) ((i >> 8) & 0xFF );
            bb[ 1 ] = (byte) ( i & 0xFF ) ;
            ByteBuffer b = ByteBuffer.wrap(bb);
            sb.append( String.valueOf( set.decode(b) ).trim() );
            start = m.end() ;
        }
        start2 = str.length() ;
        if( start2 > start ){
            String seg = str.substring(start, start2) ;
            sb.append( seg );
        }
        return sb.toString() ;
    }


    static class LogAndDiscardPolicy implements RejectedExecutionHandler {

        @Override
        public void rejectedExecution( Runnable r, ThreadPoolExecutor e ) {
        }

    }
}
