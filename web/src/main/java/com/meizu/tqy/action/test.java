package com.meizu.tqy.action;

import com.meizu.genbatis.model.ResultModel;
import com.meizu.genbatis.model.SqlResultModel;
import com.meizu.genbatis.parser.ParseCreateSql;
import com.meizu.genbatis.service.TestService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

/**
 * @author tengqingya
 * @create 2016-11-19 18:22
 */

@Controller
public class test {
    @Autowired
    private TestService testService;

    @Autowired
    private ParseCreateSql parseCreateSql;

    private static final Logger LOGGER = Logger.getLogger(test.class);

//    @RequestMapping(value = "/test")
//    @ResponseBody
//    public ResultModel test() throws Exception{
////        SqlResultModel sqlResultModel = parseCreateSql.parseAndGenerate("E:\\crateSql", "gbk");
//        return new ResultModel(sqlResultModel);
//    }

    @RequestMapping(value = "/")
    public ModelAndView a(){
        return new ModelAndView("index");
    }
}
