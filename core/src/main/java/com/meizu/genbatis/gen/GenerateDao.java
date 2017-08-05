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
 * @create 2017-06-15 11:44
 */
@Service
public class GenerateDao {
    public static final String ONE_TAB = "    ";
    public static final String TWO_TAB = "        ";
    public static final String THREE_TAB = "            ";
    public static final String FOUR_TAB = "                ";

    public String createDao( AutoBeanModel beanModel ) {
        List<String> retList =  new ArrayList<>();
        String className = beanModel.getModelName().replace("Model", "");
        String slectPrefix = getSelectPrefix(beanModel);
        String updatePrefix = getUpdatePrefix(beanModel);
        String classNameWithLowerCase = className.substring(0, 1).toLowerCase() + className.substring(1);
        retList.add( "@Repository\n");
        retList.add(String.format("public interface %sDao {\n\n", className));
        retList.add(ONE_TAB+String.format("int insert%s(@Param(\"%sModel\")%sModel %sModel);\n\n",className,classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(ONE_TAB+String.format("int insert%sBatch(@Param(\"%sModel\")List<%sModel> %sModel);\n\n",className,classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(ONE_TAB+String.format("int count%ss(@Param(\"%s\") %sParam %sParam);\n\n",className, slectPrefix,className,classNameWithLowerCase));
        retList.add(ONE_TAB+String.format("List<%sModel> select%ss(@Param(\"%s\") %sParam %sParam);\n\n",className,className,slectPrefix,className,classNameWithLowerCase));
        retList.add(ONE_TAB+String.format("int update%s(@Param(\"%s\") %sParam %sParam);\n\n",className,updatePrefix,className,classNameWithLowerCase));
        retList.add(ONE_TAB+String.format("int update%sBatch(@Param(\"%s\") List<%sParam> %sParam);\n\n",className,updatePrefix,className,classNameWithLowerCase));
        retList.add("}\n");

        StringBuilder sb =new StringBuilder();
        for(String s:retList){
            sb.append(s);
        }
        return sb.toString();
    }

    private String getUpdatePrefix( AutoBeanModel beanModel ) {
        String selectAndCountPrefix=beanModel.getConfigBean().getUpdatePrefix();
        if( StringUtils.isEmpty(selectAndCountPrefix)){
            selectAndCountPrefix="";
        }
        return selectAndCountPrefix;
    }

    public String getSelectPrefix( AutoBeanModel beanModel ){
        String selectAndCountPrefix=beanModel.getConfigBean().getSelectAndCountPrefix();
        if( StringUtils.isEmpty(selectAndCountPrefix)){
            selectAndCountPrefix="";
        }
        return selectAndCountPrefix;
    }
}
