/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.gen;

import com.meizu.genbatis.model.AutoBeanModel;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author tengqingya
 * @create 2017-06-15 14:11
 */
@Service
public class GenerateService {

    public static final String ONE_TAB = "    ";
    public static final String TWO_TAB = "        ";
    public static final String THREE_TAB = "            ";
    public static final String FOUR_TAB = "                ";

    public String createService( AutoBeanModel beanModel ) {
        List<String> retList =  new ArrayList<>();
        String className = beanModel.getModelName().replace("Model", "");
        String classNameWithLowerCase = className.substring(0, 1).toLowerCase() + className.substring(1);

        retList.add( "@Service\n");
        retList.add(String.format("public class %sService {\n\n", className));

        retList.add( ONE_TAB+"@Autowired\n");
        retList.add(ONE_TAB+String.format("private %sDao %sDao;\n\n",className,classNameWithLowerCase));

        retList.add(ONE_TAB+String.format("public int insert%s(%sModel %sModel){\n",className,className,classNameWithLowerCase));
        retList.add(TWO_TAB+String.format("return  %sDao.insert%s(%sModel);\n",classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(ONE_TAB+"}\n\n");

        retList.add(ONE_TAB+ String.format("public int insert%sBatch(List<%sModel> %sModel){\n",className,className,classNameWithLowerCase));
        retList.add(TWO_TAB+String.format("return  %sDao.insert%sBatch(%sModel);\n",classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(ONE_TAB+"}\n\n");

        retList.add(ONE_TAB+ String.format("public int count%ss(%sParam %sParam){\n",className,className,classNameWithLowerCase));
        retList.add(TWO_TAB+String.format("return %sDao.count%ss(%sParam);\n",classNameWithLowerCase,classNameWithLowerCase,className));
        retList.add(ONE_TAB+"}\n\n");

        retList.add(ONE_TAB+String.format("public List<%sModel> select%ss(%sParam %sParam){\n",className,className,className,classNameWithLowerCase));
        retList.add(TWO_TAB+String.format("return %sDao.select%ss(%sParam);\n",classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(ONE_TAB+"}\n\n");

        retList.add(ONE_TAB+String.format("public int update%s(%sParam %sParam){\n",className,className,classNameWithLowerCase));
        retList.add(TWO_TAB+String.format("return %sDao.update%s(%sParam);\n",classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(ONE_TAB+"}\n\n");

        retList.add(ONE_TAB+String.format("public int update%sBatch( List<%sParam> %sParam) {\n",className,className,classNameWithLowerCase));
        retList.add(TWO_TAB+String.format("return %sDao.update%sBatch(%sParam);\n",classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(ONE_TAB+"}\n\n");

        retList.add("}\n");

        StringBuilder sb =new StringBuilder();
        for(String s:retList){
            sb.append(s);
        }
        return sb.toString();
    }
}
