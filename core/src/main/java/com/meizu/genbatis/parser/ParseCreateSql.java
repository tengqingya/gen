package com.meizu.genbatis.parser;

import com.google.common.base.Splitter;
import com.meizu.genbatis.exception.ErrorCode;
import com.meizu.genbatis.exception.GenerateException;
import com.meizu.genbatis.gen.GenerateBean;
import com.meizu.genbatis.gen.GenerateController;
import com.meizu.genbatis.gen.GenerateDao;
import com.meizu.genbatis.gen.GenerateService;
import com.meizu.genbatis.gen.GenerateSql;
import com.meizu.genbatis.model.AutoBeanModel;
import com.meizu.genbatis.model.ConfigBean;
import com.meizu.genbatis.model.SqlResultModel;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author tengqingya
 * @create 2016-11-21 14:52
 */
@Service
public class ParseCreateSql {
    @Autowired
    private GenerateBean generateBean;

    @Autowired
    private GenerateSql generateSql;

    @Autowired
    private GenerateDao generateDao;

    @Autowired
    private GenerateService generateService;

    @Autowired
    private GenerateController generateController;

//    @Value("${whereClause}")
//    private  String whereClause;

//    @Value("${setClause}")
//    private  String setClause;

//    @Value("${modelPackageName}")
//    private  String modelPackageName;

    private static final Logger LOGGER = Logger.getLogger( ParseCreateSql.class );

    public SqlResultModel parseAndGenerate( String filePath, ConfigBean configBean,String encoding)throws Exception{
        File file =new File(filePath);
        return parseAndGenerate(new FileInputStream(file),configBean,encoding);
    }

    public SqlResultModel parseAndGenerate( InputStream inputStream, ConfigBean configBean,String encoding){
        String whereClause = configBean.getWhereClause();
        String setClause = configBean.getSetClause();
        String modelPackageName = configBean.getModelPackageName();
        List<String> readLines = null;
        try {
            readLines = IOUtils.readLines(inputStream, encoding);
        } catch( IOException e ) {
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "读取输入流错误", "");
        }
        Map<String, Object> resultMap = null;
        try {
            resultMap = generateBean.getBeanNameAndType(readLines,configBean);
        } catch( Exception e ) {
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "生成BeanNameAndType错误", "");
        }
        AutoBeanModel beanModel = (AutoBeanModel)resultMap.get("beanModel");
        beanModel.setModelPackageName(modelPackageName);

        List<String> whereClauseList = new ArrayList<>();
        List<String> setClauseList = new ArrayList<>();
        List<String> allColumn = new ArrayList<>();
        SqlResultModel sqlResultModel=new SqlResultModel();

        whereClauseList =  Splitter.on( "," ).omitEmptyStrings().trimResults().splitToList(whereClause);
        setClauseList = Splitter.on( "," ).omitEmptyStrings().trimResults().splitToList(setClause);

        beanModel.setConfigBean(configBean);


        try {
            allColumn.addAll(generateSql.createAllColumn(beanModel));
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "createAllColumn方法错误,请检查参数配置", "");
        }
        allColumn.add("\n");
        try {
            allColumn.addAll(generateSql.createInsert(beanModel));
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "createInsert方法错误,请检查参数配置", "");
        }
        allColumn.add("\n");
        try {
            allColumn.addAll(generateSql.createSelect(beanModel));
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "createSelect方法错误,请检查参数配置", "");
        }
        allColumn.add("\n");
        try {
            allColumn.addAll(generateSql.createUpdate(beanModel,whereClauseList));
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "createUpdate方法错误,请检查参数配置", "");
        }
        allColumn.add("\n");
        try {
            allColumn.addAll(generateSql.createCount(beanModel));
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "createCount方法错误,请检查参数配置", "");
        }
        allColumn.add("\n");
        try {
            allColumn.addAll(generateSql.createUpdateBatch(beanModel,configBean.getUpdateBatchWhereClause(),setClauseList));
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "createUpdateBatch方法错误,请检查参数配置", "");
        }
        allColumn.add("\n");
        try {
            allColumn.addAll(generateSql.createInsertBatch(beanModel));
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "createInsertBatch方法错误,请检查参数配置", "");
        }
        allColumn.add("\n");
        StringBuilder sb =new StringBuilder();
        for(String s:allColumn){
            sb.append(s);
        }

        String dao;
        try {
            dao = generateDao.createDao(beanModel);
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "生成dao错误", "");
        }

        String service;
        try {
            service = generateService.createService(beanModel);
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "生成dao错误", "");
        }

        String controller;
        try {
            controller = generateController.createController(beanModel);
        }catch(GenerateException g){
            throw g;
        }catch(Exception e){
            throw new GenerateException(ErrorCode.ServerDs.UNKOWN.getValue(), "生成controller错误", "");
        }

        sqlResultModel.setAutoBeanModel(beanModel);
        sqlResultModel.setModel((String)resultMap.get("model"));
        sqlResultModel.setParam((String)resultMap.get("param"));
        sqlResultModel.setSql(sb.toString());
        sqlResultModel.setService(service);
        sqlResultModel.setDao(dao);
        sqlResultModel.setController(controller);
        //todo 加注释
        //todo 加Set
        //// TODO: 2016/12/2 update的时候 where条件不需要含有状态的
        //// TODO: 2016/12/5 批量插入
//        FileUtils.writeStringToFile(new File("E:\\"+"sqlCommon"+".xml"),sb.toString());
        return sqlResultModel;
    }
}
