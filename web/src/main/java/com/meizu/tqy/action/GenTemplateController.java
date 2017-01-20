/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.tqy.action;

import com.meizu.genbatis.model.ResultModel;
import com.meizu.genbatis.target.TargetGenInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
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
        targetGenInterface.genTemplate(config);
        return new ResultModel(true);
    }

}
