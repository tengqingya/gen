/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.tqy.action;

import com.meizu.genbatis.model.ResultModel;
import com.meizu.genbatis.service.TestService;
import com.meizu.genbatis.target.TargetGenInterface;
import com.meizu.genbatis.util.SpringContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 生成模版控制器
 *
 * @author tengqingya
 * @create 2017-01-20 14:50
 */
@Controller
@RequestMapping("/manage/")
public class GenTemplateController {
    @Autowired
    @Qualifier(value = "genAdapter" )
    private TargetGenInterface targetGenInterface;

    @RequestMapping("/genHtml")
    @ResponseBody
    public ResultModel genHtmlTemplate(String config){
        Assert.notNull(config);
        targetGenInterface.genTemplate(config);
//        ApplicationContext applicationContext = SpringContextHolder.getApplicationContext();
//        System.out.println("applicationContext"+applicationContext);
        TestService testService = (TestService)SpringContextHolder.getBean("testService");
        System.out.println(testService.testService());
        return new ResultModel(true);
    }

}
