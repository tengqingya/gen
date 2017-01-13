package com.meizu.genbatis.gen;

import com.meizu.genbatis.enums.SqlTypeModelEnum;
import com.meizu.genbatis.enums.SqlTypeParamEnum;
import com.meizu.genbatis.exception.ErrorCode;
import com.meizu.genbatis.exception.GenerateException;
import com.meizu.genbatis.model.AutoBeanModel;
import com.meizu.genbatis.model.ConfigBean;
import com.meizu.genbatis.util.ListUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author tengqingya
 * @create 2016-11-21 15:25
 */
@Service
public class GenerateBean {

//    @Value("${database.table.name.delimiters}")
//    private  String DBNameDelimiters;
//
//    @Value("${database.field.name.prefix}")
//    private  String DBFieldNamePrefix;
//
//    @Value("${model.param.name.form.index}")
//    private  int fromIdx;

    private static final Logger LOGGER = Logger.getLogger( GenerateBean.class );

    public Map<String,Object> getBeanNameAndType( List<String> readLines,ConfigBean configBean) throws Exception{
        if( ListUtil.isEmpty(readLines)){
            throw new GenerateException(ErrorCode.ServerBiz.PARAM_EMPTY.getValue(),"生成bean参数为空",null);
        }
        Map<String,Object> resultMap=new HashMap<>();
        String modelName="";
        String paramName="";
        String s;
        StringBuilder resultModel=new StringBuilder();
        StringBuilder resultParam=new StringBuilder();

        AutoBeanModel beanModel =new AutoBeanModel();

        List<String>  fieldName = new ArrayList<>();
        List<String>  fieldType = new ArrayList<>();
        List<String>  fieldTable = new ArrayList<>();

        for(int i=0;i<readLines.size()-1;i++){
            s = readLines.get(i);
            if(i==0 && (s.toLowerCase().contains("create table"))){
                modelName = getModelName(s,beanModel,configBean);
                paramName = modelName.replace("Model","Param");
                resultModel.append("public class "+modelName+" {\n");
                resultParam.append("public class "+paramName+" {\n");

                beanModel.setModelName(modelName);
            }
            String beanName;
            String modelBeanType;
            String paramBeanType;
<<<<<<< HEAD
            if(s.toLowerCase().contains("not null")&&(s.toLowerCase().contains("comment ")||s.toLowerCase().contains("default ")||s.toLowerCase().contains("auto_increment"))){
=======
            if(s.toLowerCase().contains("not null")&&(s.contains("COMMENT ")||s.contains("DEFAULT "))){
>>>>>>> 615028bed6030b23347ca478b333fd50e254620c
                //有备注/默认值的行才解析
                String[] split = s.startsWith(" ")?s.substring(1).trim().split(" "):s.trim().split(" ");
                if(split.length>1){
                    beanName = getBeanName(split[0],fieldTable,configBean);
                    modelBeanType = getBeanType(split[1],true);
                    paramBeanType = getBeanType(split[1],false);
                    if( StringUtils.isNotEmpty(beanName)&&StringUtils.isNotEmpty(modelBeanType)){
                        resultModel.append("private "+modelBeanType+" "+beanName+";\n");
                        resultParam.append("private "+paramBeanType+" "+beanName+";\n");

                        fieldName.add(beanName);
                        fieldType.add(modelBeanType);
                    }
                }
            }
        }
        resultModel.append("}\n");
        resultParam.append("\n");
        resultParam.append("private int start = 0;\n");
        resultParam.append("private int length = 10;\n");
        resultParam.append("}\n");
//        FileUtils.writeStringToFile(new File("E:\\"+modelName+".java"),resultModel.toString());
//        FileUtils.writeStringToFile(new File("E:\\"+paramName+".java"),resultParam.toString());

        resultMap.put("model",resultModel.toString());
        resultMap.put("param",resultParam.toString());

        beanModel.setFieldName(fieldName);
        beanModel.setFieldType(fieldType);
        beanModel.setFieldTable(fieldTable);

        resultMap.put("beanModel",beanModel);

        return resultMap;
    }

    private String getModelName( String s,AutoBeanModel beanModel,ConfigBean configBean ) {
        return getModelName(s,configBean.getDelimiters(),configBean.getIndex(),beanModel);
    }

//    private String getParamName( String s ) {
//        return getParamName(s,DBNameDelimiters,fromIdx);
//    }

    private String getModelName( String original, String split ,int remain,AutoBeanModel beanModel) {
        return getName(original,split,remain,beanModel)+"Model";
    }

    private String getParamName( String original, String split ,int remain) {
        return getName(original,split,remain,null)+"Param";
    }

    private String getName( String original, String split ,int remain,AutoBeanModel beanModel ) {
        String[] s = original.split(" ");
        //s1是table name
        String s1 = s[2];
        if(beanModel!=null){
            beanModel.setTableName(s1);
        }
        int i =getPosition(s1,split,remain);
        s1 = s1.substring(i,s1.length());
        return getTuofeng(s1.replace("`","").replace("'","").toLowerCase(),split,true);
    }

    private int getPosition( String s1, String split, int remain ) {
        if(remain == 1){
            return s1.lastIndexOf(split) + 1;
        }
        String s2=s1;
        int lastIndexOf;
        while( remain>1 ){
            lastIndexOf = s2.lastIndexOf(split);
            char[] chars = s2.toCharArray();
            chars[lastIndexOf]='a';
            s2 = new String(chars);
            remain--;
        }

        lastIndexOf = s2.lastIndexOf(split);
        return lastIndexOf+1;
    }

    private String getBeanName( String s ,String prefix,String split,List<String> list) {
        if(s.length()<=1){
            return null;
        }
        //去除''/""/``
        //去掉前缀
        if(s.contains("`")){
            list.add(s.substring(1,s.length()-1));
            s=s.replace("`"+prefix,"");
            s=s.replace("`","");
        }
        if(s.contains("\"")){
            list.add(s.substring(1,s.length()-1));
            s=s.replace("\""+prefix,"");
            s=s.replace("\"","");
        }
        if(s.contains("'")){
            list.add(s.substring(1,s.length()-1));
            s=s.replace("'"+prefix,"");
            s=s.replace("'","");
        }
        //有ID将I大写
        s=s.length()==2?s.toLowerCase():s.toLowerCase().replace("id","Id");
        //驼峰表达
        s = getTuofeng(s,split,false);
        return s;
    }

    private String getTuofeng( String s, String split ,boolean firstNameBig) {
        while( s.contains(split) ){
            s= s.contains(split)?s.replace(split+s.charAt(s.indexOf(split)+1),(s.charAt(s.indexOf(split)+1)+"").toUpperCase()):s;
        }
        String substring="";
        String substring1=s;
        if(firstNameBig){
            substring = s.substring(0, 1);
            substring1 = s.substring(1, s.length());

        }
        return substring.toUpperCase()+substring1;
    }

    private String getBeanName( String s ,List<String> list,ConfigBean configBean) {
        return getBeanName(s,configBean.getPrefix(),configBean.getDelimiters(),list);
    }

    private String getBeanType( String s ,boolean isModel) {
        if(StringUtils.isEmpty(s)||s.length()<2){
            return null;
        }
        int i = s.indexOf("(");
        if(i>0){
            s =s.substring(0,i);
        }
        return isModel?SqlTypeModelEnum.toEnumValue(SqlTypeModelEnum.toEnumKey(s)).getValue(): SqlTypeParamEnum.toEnumValue(SqlTypeParamEnum.toEnumKey(s)).getValue();
    }

    public static void main(String args[]){
        int position = new GenerateBean().getPosition("T_EBK_REPLY_USER", "_", 2);
        System.out.print(position);
    }
}
