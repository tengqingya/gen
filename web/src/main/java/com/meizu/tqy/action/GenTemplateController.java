/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.tqy.action;

import com.meizu.genbatis.checkgroups.CheckByManual;
import com.meizu.genbatis.checkgroups.CheckDeleteGroup;
import com.meizu.genbatis.checkgroups.CheckUpdateGroup;
import com.meizu.genbatis.exception.ErrorCode;
import com.meizu.genbatis.exception.GenerateException;
import com.meizu.genbatis.model.ResultModel;
import com.meizu.genbatis.model.TestValidateModel;
import com.meizu.genbatis.service.TestService;
import com.meizu.genbatis.target.TargetGenInterface;
import com.meizu.genbatis.util.SpringContextHolder;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.group.GroupSequenceProvider;
import org.hibernate.validator.internal.engine.groups.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

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
//        TestService testService = (TestService)SpringContextHolder.getBean("testService");
//        System.out.println(testService.testService());
        return new ResultModel(true);
    }

    @RequestMapping("/play")
    @ResponseBody
    public ResultModel genHtmlTemplate( @Validated() TestValidateModel model, BindingResult result){
        System.out.println(model);
        //如果某个属性为空，则不会使用length range 等去验证
        //要想为空报错 只有加上notnull
        //使用分组的时候，必须如果不加defaultclass则 默认不会使用，要想不同分组使用不同的验证方法则使用list
        if(result.getAllErrors().size()>0){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(),result.getAllErrors().get(0).getDefaultMessage(), "");
        }
        //手动验证
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<TestValidateModel>> validate = validator.validate(model, CheckByManual.class);
        if(validate.size()>0){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(),validate.iterator().next().getMessage(), "");
        }
        return new ResultModel(true);
    }

}
