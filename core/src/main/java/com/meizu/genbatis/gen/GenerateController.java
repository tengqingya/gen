/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.genbatis.gen;

import com.meizu.genbatis.model.AutoBeanModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author tengqingya
 * @create 2017-06-15 14:43
 */
@Service
public class GenerateController {

    public static final String ONE_TAB = "    ";
    public static final String TWO_TAB = "        ";
    public static final String THREE_TAB = "            ";
    public static final String FOUR_TAB = "                ";


    public String createController( AutoBeanModel beanModel ) {
        List<String> retList =  new ArrayList<>();
        String modelName = beanModel.getModelName();
        String className = modelName.replace("Model", "");
        String classNameWithLowerCase = className.substring(0, 1).toLowerCase() + className.substring(1);
        int index2 =0;
        for(int i=1;i<classNameWithLowerCase.length();i++){
            if(Character.isUpperCase(classNameWithLowerCase.charAt(i))){
                index2 = i;
                break;
            }
        }
        String controllerLetter;
        if(index2 == 0){
            controllerLetter = "/manage/"+classNameWithLowerCase;
        }else {
            controllerLetter = "/manage/"+classNameWithLowerCase.substring(0,index2)+"/"+(className.charAt(index2)+"").toLowerCase()+className.substring(index2+1);
        }

        retList.add( "@Controller\n");
        retList.add( String.format("@RequestMapping( value = \"%s\" )\n",controllerLetter));
        retList.add(String.format("public class %sController {\n\n", className));

        retList.add(ONE_TAB+ "@Autowired\n");
        retList.add(ONE_TAB+String.format("private %sService %sService;\n\n",className,classNameWithLowerCase));

        retList.add(ONE_TAB+ "@Autowired\n");
        retList.add(ONE_TAB+"private CommonManageService commonManageService;\n\n");

        retList.add(ONE_TAB+"@RequestMapping( value = \"/list\" )\n");
        retList.add(ONE_TAB+"@ResponseBody\n");
        retList.add(ONE_TAB+String.format("public ResultModel list%ss( @Validated( value = SelectChecks.class ) %sParam %sParam, BindingResult result ) {\n",className,className,classNameWithLowerCase));
        retList.add(TWO_TAB+"if( result.getAllErrors().size() > 0 ) {\n");
        retList.add(THREE_TAB+"throw new BizException(ErrorCode.ServerBiz.PARAM_ERROR.getValue(), result.getAllErrors().get(0).getDefaultMessage(), \"\");\n");
        retList.add(TWO_TAB+"}\n\n");

        retList.add(TWO_TAB+"Map<String, Object> ret = new HashMap<>();\n");
        retList.add(TWO_TAB+String.format("ret.put(\"data\", %sService.select%ss(%sParam));\n",classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(TWO_TAB+"ret.put(\"pageSize\", commonManageService.getPageSize());\n");
        retList.add(TWO_TAB+String.format("ret.put(\"total\", %sService.count%ss(%sParam));\n",classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(TWO_TAB+"return new ResultModel(ret);\n");
        retList.add(ONE_TAB+"}\n\n");

        retList.add(ONE_TAB+"@RequestMapping( value = \"/add\" )\n");
        retList.add(ONE_TAB+"@ResponseBody\n");
        retList.add(TWO_TAB+String.format("public ResultModel add( @Validated( value = InsertChecks.class ) %sModel %sModel, BindingResult result,\n",className,classNameWithLowerCase));
        retList.add(FOUR_TAB+"@RequestParam( value = SessionKey.UID, defaultValue = \"0\" ) long operator,\n");
        retList.add(FOUR_TAB+"@RequestParam( value = SessionKey.NICKNAME, defaultValue = \"\" ) String opName ) {\n");
        retList.add(TWO_TAB+"if( result.getAllErrors().size() > 0 ) {\n");
        retList.add(THREE_TAB+"throw new BizException(ErrorCode.ServerBiz.PARAM_ERROR.getValue(), result.getAllErrors().get(0).getDefaultMessage(), \"\");\n");
        retList.add(TWO_TAB+"}\n\n");
        retList.add(TWO_TAB+String.format("int ret = %sService.insert%s(%sModel);\n",classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(TWO_TAB+"return new ResultModel(ret);\n");
        retList.add(ONE_TAB+"}\n\n");

        retList.add(ONE_TAB+"@RequestMapping( value = \"/update\" )\n");
        retList.add(ONE_TAB+"@ResponseBody\n");
        retList.add(ONE_TAB+String.format("public ResultModel update( @Validated( value = UpdateChecks.class ) %sParam %sParam, BindingResult result,\n",className,classNameWithLowerCase));
        retList.add(FOUR_TAB+"@RequestParam( value = SessionKey.UID, defaultValue = \"0\" ) long operator,\n");
        retList.add(FOUR_TAB+"@RequestParam( value = SessionKey.NICKNAME, defaultValue = \"\" ) String opName ) {\n");
        retList.add(TWO_TAB+"if( result.getAllErrors().size() > 0 ) {\n");
        retList.add(THREE_TAB+"throw new BizException(ErrorCode.ServerBiz.PARAM_ERROR.getValue(), result.getAllErrors().get(0).getDefaultMessage(), \"\");\n");
        retList.add(TWO_TAB+"}\n\n");
        retList.add(TWO_TAB+String.format("int ret = %sService.update%s(%sParam);\n",classNameWithLowerCase,className,classNameWithLowerCase));
        retList.add(TWO_TAB+"return new ResultModel(ret);\n");
        retList.add(ONE_TAB+"}\n\n");

        retList.add("}\n");

        StringBuilder sb =new StringBuilder();
        for(String s:retList){
            sb.append(s);
        }
        return sb.toString();
    }
}
