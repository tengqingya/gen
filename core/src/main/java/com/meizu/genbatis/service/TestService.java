package com.meizu.genbatis.service;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

/**
 * @author tengqingya
 * @create 2016-11-21 11:00
 */
@Service
public class TestService {
    private static final Logger LOGGER = Logger.getLogger( TestService.class );

    public String testService(){
        LOGGER.info("service logging...........");

        return "serviceaa";
    }

}
