package com.meizu.tqy.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 业务异常捕获
 * 可以自定义多个异常捕获类
 * @author tengqingya
 * @create 2016-11-28 11:28
 */
@Component
public class GenerateExceptionResolver implements HandlerExceptionResolver {

	@Autowired
	private GenerateExceptionHandler bizExceptionHandler;

	public ModelAndView resolveException( HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex ) {
		bizExceptionHandler.handler( request, response, ex );
		return new ModelAndView();
	}

}