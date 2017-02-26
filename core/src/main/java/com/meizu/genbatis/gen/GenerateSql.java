package com.meizu.genbatis.gen;

import com.meizu.genbatis.exception.ErrorCode;
import com.meizu.genbatis.exception.GenerateException;
import com.meizu.genbatis.model.AutoBeanModel;
import com.meizu.genbatis.model.BeanRelationshipModel;
import com.meizu.genbatis.util.ListUtil;
import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author tengqingya
 * @create 2016-11-22 14:48
 */

@Service
public class GenerateSql {
    public static final String ONE_TAB = "    ";
    public static final String TWO_TAB = "        ";
    public static final String THREE_TAB = "            ";
    public static final String FOUR_TAB = "                ";

//    @Value("${database.table.name.delimiters}")
//    private  String DBNameDelimiters;

    public List<String> createInsert( AutoBeanModel beanModel ) {
        validBeabModel(beanModel);

        List<String> retList = new ArrayList<>();
        List<String> fieldTable = beanModel.getFieldTable();
        List<String> fieldName = beanModel.getFieldName();

        retList.add(ONE_TAB+ "<insert id=\"insert"+ beanModel.getModelName().replace("Model","") +"\">\n");
        retList.add(TWO_TAB+"INSERT INTO "+beanModel.getTableName()+"\n");
        retList.add(TWO_TAB+"<trim prefix=\"(\" suffix=\")\" suffixOverrides=\",\">\n");

        for(int i=0;i<fieldName.size();i++){
            retList.add(String.format(THREE_TAB+"<if test=\"%s != null\"> %s, </if>\n",fieldName.get(i),fieldTable.get(i)));
        }
        retList.add(TWO_TAB+"</trim>\n");
        retList.add(TWO_TAB+"VALUES\n");
        retList.add(TWO_TAB+"<trim prefix=\"(\" suffix=\")\" suffixOverrides=\",\">\n");
        for(int i=0;i<fieldName.size();i++){
            retList.add(String.format(THREE_TAB+"<if test=\"%s != null\"> #{%s}, </if>\n",fieldName.get(i),fieldName.get(i)));
        }
        retList.add(TWO_TAB+"</trim>\n");
        retList.add(ONE_TAB+"</insert>\n");
        return retList;
    }

    private void validBeabModel( AutoBeanModel beanModel ) {
        List<String> fieldTable = beanModel.getFieldTable();
        List<String> fieldName = beanModel.getFieldName();
        if( ListUtil.isEmpty(fieldName)||ListUtil.isEmpty(fieldTable)){
            throw new GenerateException(ErrorCode.ServerBiz.PARAM_EMPTY.getValue(),"数据库列名或者bean为空",null);
        }
        if(fieldName.size()!=fieldTable.size()){
            throw new GenerateException(ErrorCode.ServerBiz.PARAM_INVALID.getValue(),"数据库字段个数和bean字段个数不相等",null);
        }
    }

    public List<String> createAllColumn( AutoBeanModel beanModel ) {
        validBeabModel(beanModel);
        String DBNameDelimiters = beanModel.getConfigBean().getDelimiters();

        List<String> retList = new ArrayList<>();
        retList.add(ONE_TAB+ String.format("<sql id=\"all_column_%s\">\n",beanModel.getModelName().toLowerCase()));
        List<String> fieldTable = beanModel.getFieldTable();
        List<String> fieldName = beanModel.getFieldName();
        String tableName = beanModel.getTableName();

        char abbreviation = tableName.charAt(tableName.lastIndexOf(DBNameDelimiters) + 1);
        String prefix = abbreviation+".";

        for(int i=0;i<fieldName.size()-1;i++){
            retList.add(TWO_TAB+prefix+fieldTable.get(i)+" "+fieldName.get(i)+",\n");
        }
        retList.add(TWO_TAB+prefix+fieldTable.get(fieldTable.size()-1)+" "+fieldName.get(fieldTable.size()-1)+"\n");

        retList.add(ONE_TAB+"</sql>\n");
        return retList;
    }

    public List<String> createUpdate(AutoBeanModel beanModel,List<String> whereClause){
        validBeabModel(beanModel);
        //todo type和status不需要判断大于0 is开头也不需要

        List<String> retList = new ArrayList<>();
        List<String> fieldTable = beanModel.getFieldTable();
        List<String> fieldName = beanModel.getFieldName();
        List<String> fieldType = beanModel.getFieldType();

        String updatePrefix=beanModel.getConfigBean().getUpdatePrefix();
        if(StringUtils.isEmpty(updatePrefix)){
            updatePrefix="";
        }else {
            updatePrefix+=".";
        }

        retList.add(ONE_TAB+"<update id=\"update"+ beanModel.getModelName().replace("Model","") +"\">\n");
        retList.add(String.format(TWO_TAB+"UPDATE %s\n",beanModel.getTableName()));
        retList.add(TWO_TAB+"<set>\n");
        for( int i = 0; i < fieldName.size(); i++ ) {
            if( fieldType.get(i).equalsIgnoreCase("int")||fieldType.get(i).equalsIgnoreCase("long") ) {
                retList.add(String.format(THREE_TAB+"<if test=\""+updatePrefix+"%s != null and "+updatePrefix+"%s>0\"> %s = #{"+updatePrefix+"%s}, </if>\n",fieldName.get(i),fieldName.get(i),fieldTable.get(i),fieldName.get(i)));
            } else if( fieldType.get(i).equalsIgnoreCase("String")){
                retList.add(String.format(THREE_TAB+"<if test=\""+updatePrefix+"%s != null and "+updatePrefix+"%s!=''\"> %s = #{"+updatePrefix+"%s}, </if>\n",fieldName.get(i),fieldName.get(i),fieldTable.get(i),fieldName.get(i)));
            }else {
                retList.add(String.format(THREE_TAB+"<if test=\""+updatePrefix+"%s != null\"> %s = #{"+updatePrefix+"%s}, </if>\n",fieldName.get(i),fieldTable.get(i),fieldName.get(i)));
            }
        }
        retList.add(TWO_TAB+"</set>\n");

        convertToMap(beanModel);
        retList.add(TWO_TAB+"<where>\n");

        if(ListUtil.isNotEmpty(whereClause)){
            BeanRelationshipModel beanRelationshipModel = new BeanRelationshipModel();
            String type="";
            for(int i=0;i<whereClause.size();i++){
                try {
                    beanRelationshipModel = beanModel.getFieldNameToFieldTableMap().get(whereClause.get(i));
                    type = beanRelationshipModel.getType();
                }catch( Exception e ){
                    throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "whereClause参数配置错误", "");
                }
                if(type.equalsIgnoreCase("int")||type.equalsIgnoreCase("long")){
                    retList.add(String.format(THREE_TAB+"<if test=\""+updatePrefix+"%s != null and "+updatePrefix+"%s>0\"> AND %s = #{"+updatePrefix+"%s}</if>\n",beanRelationshipModel.getName(),beanRelationshipModel.getName(),beanRelationshipModel.getTableName(),beanRelationshipModel.getName()));
                }else if(type.equalsIgnoreCase("string")){
                    retList.add(String.format(THREE_TAB+"<if test=\""+updatePrefix+"%s != null and "+updatePrefix+"%s!=''\"> AND %s = #{"+updatePrefix+"%s}</if>\n",beanRelationshipModel.getName(),beanRelationshipModel.getName(),beanRelationshipModel.getTableName(),beanRelationshipModel.getName()));
                }else {
                    retList.add(String.format(THREE_TAB+"<if test=\""+updatePrefix+"%s != null\"> AND %s = #{"+updatePrefix+"%s}</if>\n",beanRelationshipModel.getName(),beanRelationshipModel.getTableName(),beanRelationshipModel.getName()));
                }
            }
        }else {
            for(int i = 0; i < fieldName.size(); i++){
                if( fieldType.get(i).equalsIgnoreCase("int")||fieldType.get(i).equalsIgnoreCase("long") ) {
                    retList.add(String.format(THREE_TAB+"<if test=\""+updatePrefix+"%s != null and "+updatePrefix+"%s>0\"> AND %s = #{"+updatePrefix+"%s}</if>\n",fieldName.get(i),fieldName.get(i),fieldTable.get(i),fieldName.get(i)));
                } else if( fieldType.get(i).equalsIgnoreCase("String")){
                    retList.add(String.format(THREE_TAB+"<if test=\""+updatePrefix+"%s != null and "+updatePrefix+"%s!=''\"> AND %s = #{"+updatePrefix+"%s}</if>\n",fieldName.get(i),fieldName.get(i),fieldTable.get(i),fieldName.get(i)));
                }else {
                    retList.add(String.format(THREE_TAB+"<if test=\""+updatePrefix+"%s != null\"> AND %s = #{"+updatePrefix+"%s}</if>\n",fieldName.get(i),fieldTable.get(i),fieldName.get(i)));
                }
            }
        }
        retList.add(TWO_TAB+"</where>\n");
        retList.add(ONE_TAB+"</update>\n");
        return retList;
    }

    private void convertToMap( AutoBeanModel beanModel ) {
        BeanRelationshipModel beanRelationshipModel;
        List<String> fieldTable = beanModel.getFieldTable();
        List<String> fieldName = beanModel.getFieldName();
        List<String> fieldType = beanModel.getFieldType();
        Map<String, BeanRelationshipModel> map =new HashMap<>();
        for(int i=0;i<beanModel.getFieldName().size();i++){
            beanRelationshipModel =new BeanRelationshipModel();
            beanRelationshipModel.setName(fieldName.get(i));
            beanRelationshipModel.setTableName(fieldTable.get(i));
            beanRelationshipModel.setType(fieldType.get(i));
            map.put(fieldName.get(i),beanRelationshipModel);
        }
        beanModel.setFieldNameToFieldTableMap(map);
    }

    public List<String> createSelect( AutoBeanModel beanModel ) {
        //todo type和status不需要判断大于0 is开头也不需要
        validBeabModel(beanModel);


        List<String> retList = new ArrayList<>();
        List<String> fieldTable = beanModel.getFieldTable();
        List<String> fieldName = beanModel.getFieldName();
        List<String> fieldType = beanModel.getFieldType();

        String selectAndCountPrefix=beanModel.getConfigBean().getSelectAndCountPrefix();
        if(StringUtils.isEmpty(selectAndCountPrefix)){
            selectAndCountPrefix="";
        }else {
            selectAndCountPrefix+=".";
        }
        char abbreviation = getAbbreviation(beanModel.getTableName(),beanModel.getConfigBean().getDelimiters());

        retList.add(ONE_TAB+String.format("<select id=\"select%ss\" resultType=\"%s.%s\">\n",beanModel.getModelName().replace("Model",""),beanModel.getModelPackageName(),beanModel.getModelName()));
        retList.add(TWO_TAB+String.format("SELECT <include refid=\"all_column_%s\"/>\n",beanModel.getModelName().toLowerCase()));
        retList.add(TWO_TAB+String.format("FROM %s %s\n",beanModel.getTableName(),abbreviation));
        retList.add(TWO_TAB+"<where>\n");
        createSelectAndCountIfStatment(retList, fieldTable, fieldName, fieldType, abbreviation,selectAndCountPrefix);
        retList.add(TWO_TAB+"</where>\n");
        retList.add(TWO_TAB+"LIMIT #{"+selectAndCountPrefix+"start},#{"+selectAndCountPrefix+".length}\n");
        retList.add(ONE_TAB+"</select>\n");
        return retList;
    }

    private char getAbbreviation( String tableName ,String DBNameDelimiters) {
        return tableName.charAt(tableName.lastIndexOf(DBNameDelimiters) + 1);
    }

    public Collection<? extends String> createCount( AutoBeanModel beanModel) {
        validBeabModel(beanModel);

        List<String> retList = new ArrayList<>();
        List<String> fieldTable = beanModel.getFieldTable();
        List<String> fieldName = beanModel.getFieldName();
        List<String> fieldType = beanModel.getFieldType();

        String selectAndCountPrefix=beanModel.getConfigBean().getSelectAndCountPrefix();
        if(StringUtils.isEmpty(selectAndCountPrefix)){
            selectAndCountPrefix="";
        }else {
            selectAndCountPrefix+=".";
        }
        char abbreviation = getAbbreviation(beanModel.getTableName(),beanModel.getConfigBean().getDelimiters());

        retList.add(ONE_TAB+String.format("<select id=\"count%ss\" resultType=\"java.lang.Integer\">\n",beanModel.getModelName().replace("Model","")));
        retList.add(TWO_TAB+String.format("SELECT COUNT(*)\n"));
        retList.add(TWO_TAB+String.format("FROM %s %s\n",beanModel.getTableName(),abbreviation));
        retList.add(TWO_TAB+"<where>\n");
        createSelectAndCountIfStatment(retList, fieldTable, fieldName, fieldType, abbreviation,selectAndCountPrefix);
        retList.add(TWO_TAB+"</where>\n");
        retList.add(ONE_TAB+"</select>\n");
        return retList;
    }

    private void createSelectAndCountIfStatment( List<String> retList, List<String> fieldTable, List<String> fieldName, List<String> fieldType, char abbreviation,String selectAndCountPrefix ) {
        for(int i = 0; i < fieldName.size(); i++){
            if( fieldType.get(i).equalsIgnoreCase("int")||fieldType.get(i).equalsIgnoreCase("long") ) {
                retList.add(String.format(THREE_TAB+"<if test=\""+selectAndCountPrefix+"%s != null and "+selectAndCountPrefix+"%s>0\"> AND %s.%s = #{"+selectAndCountPrefix+"%s}</if>\n",fieldName.get(i),fieldName.get(i),abbreviation,fieldTable.get(i),fieldName.get(i)));
            } else if( fieldType.get(i).equalsIgnoreCase("String")){
                retList.add(String.format(THREE_TAB+"<if test=\""+selectAndCountPrefix+"%s != null and "+selectAndCountPrefix+"%s!=''\"> AND %s.%s = #{"+selectAndCountPrefix+"%s}</if>\n",fieldName.get(i),fieldName.get(i),abbreviation,fieldTable.get(i),fieldName.get(i)));
            }else {
                retList.add(String.format(THREE_TAB+"<if test=\""+selectAndCountPrefix+"%s != null\"> AND %s.%s = #{"+selectAndCountPrefix+"%s}</if>\n",fieldName.get(i),abbreviation,fieldTable.get(i),fieldName.get(i)));
            }
        }
    }

    public Collection<? extends String> createUpdateBatch( AutoBeanModel beanModel, String whereClause, List<String> setClause ) {
        validBeabModel(beanModel);

        List<String> retList = new ArrayList<>();
        List<String> fieldName = beanModel.getFieldName();

        retList.add(ONE_TAB+"<update id=\"update"+ beanModel.getModelName().replace("Model","") +"Batch\">\n");
        retList.add(String.format(TWO_TAB+"UPDATE %s\n",beanModel.getTableName()));
        retList.add(TWO_TAB+"<set>\n");
        if(StringUtils.isEmpty(whereClause)){
            throw new GenerateException(ErrorCode.ServerBiz.PARAM_INVALID.getValue(),"批量更新条件不能为空",null);
        }
        Map<String, BeanRelationshipModel> fieldNameToFieldTableMap = beanModel.getFieldNameToFieldTableMap();
        BeanRelationshipModel whereMapModel = fieldNameToFieldTableMap.get(whereClause);
//        convertToMap(beanModel);
        if(ListUtil.isEmpty(setClause)){
            if(whereMapModel==null){
                //如果填写的不对则使用默认字一个字段
                String temp = beanModel.getFieldName().get(0);
                whereMapModel = fieldNameToFieldTableMap.get(temp);
            }
            for(int i=0;i<fieldName.size();i++){
                BeanRelationshipModel beanRelationshipModel = fieldNameToFieldTableMap.get(fieldName.get(i));
                retList.add(THREE_TAB+String.format("%s =\n",beanRelationshipModel.getTableName()));
                retList.add(THREE_TAB+"CASE\n");
                retList.add(THREE_TAB+"<foreach collection=\"conditions\" item=\"item\">\n");
                if(beanRelationshipModel.getType().equalsIgnoreCase("int")||beanRelationshipModel.getType().equalsIgnoreCase("long")){
                    retList.add(FOUR_TAB+String.format("<if test=\"item.%s>0\">WHEN %s=#{item.%s} THEN #{item.%s}</if>\n",beanRelationshipModel.getName(),whereMapModel.getTableName(),whereMapModel.getName(),beanRelationshipModel.getName()));
                }else{
                    retList.add(FOUR_TAB+String.format("<if test=\"item.%s!=null\">WHEN %s=#{item.%s} THEN #{item.%s}</if>\n",beanRelationshipModel.getName(),whereMapModel.getTableName(),whereMapModel.getName(),beanRelationshipModel.getName()));
                }
                retList.add(THREE_TAB+"</foreach>\n");
                retList.add(THREE_TAB+"END,\n");
            }
        }else{
            for(int i=0;i<setClause.size();i++){
                String s;
                BeanRelationshipModel beanRelationshipModel;
                try {
                    s = setClause.get(i);
                    beanRelationshipModel = fieldNameToFieldTableMap.get(s);
                    retList.add(THREE_TAB+String.format("%s =\n",beanRelationshipModel.getTableName()));
                }catch( Exception e){
                    throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "setClause参数配置错误", "");
                }
                retList.add(THREE_TAB+"CASE\n");
                retList.add(THREE_TAB+"<foreach collection=\"conditions\" item=\"item\">\n");
                if(beanRelationshipModel.getType().equalsIgnoreCase("int")||beanRelationshipModel.getType().equalsIgnoreCase("long")){
                    retList.add(FOUR_TAB+String.format("<if test=\"item.%s>0\">WHEN %s=#{item.%s} THEN #{item.%s}</if>\n",beanRelationshipModel.getName(),whereMapModel.getTableName(),whereMapModel.getName(),beanRelationshipModel.getName()));
                }else{
                    retList.add(FOUR_TAB+String.format("<if test=\"item.%s!=null\">WHEN %s=#{item.%s} THEN #{item.%s}</if>\n",beanRelationshipModel.getName(),whereMapModel.getTableName(),whereMapModel.getName(),beanRelationshipModel.getName()));
                }
                retList.add(THREE_TAB+"</foreach>\n");
                retList.add(THREE_TAB+"END,\n");
            }
        }
        retList.add(TWO_TAB+"</set>\n");


        retList.add(TWO_TAB+"<where>\n");
        retList.add(THREE_TAB+String.format("%s IN\n",whereMapModel.getTableName()));
        retList.add(THREE_TAB+String.format("<foreach collection=\"conditions\" item=\"item\" separator=\",\" open=\"(\" close=\")\">#{item.%s}</foreach>\n",whereMapModel.getName()));
        retList.add(TWO_TAB+"</where>\n");

        retList.add(ONE_TAB+"</update>\n");

        return retList;
    }
}
