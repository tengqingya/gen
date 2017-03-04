/*
 * Copyright (c) 2017. tengqingya@meizu.com qq:475804848 dingding:taizhoujiangyan.
 */

package com.meizu.tqy.util;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.internet.MimeMessage;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class MailEngine {

	protected static final Logger LOGGER = Logger.getLogger( MailEngine.class );

	private static final Executor taskExecutor = Executors.newCachedThreadPool();

	private MailSender mailSender;

	public void sendMessage( String[] to, String from, String subject, String text, String attachmentName, ClassPathResource attachment, boolean html ) {
		try {
			MimeMessage message = ( (JavaMailSenderImpl)mailSender ).createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper( message, true, "utf-8" );
			helper.setTo( to );
			if( null != from ) {
				helper.setFrom( from );
			} else {
				helper.setFrom( ( (JavaMailSenderImpl)mailSender ).getUsername() );
			}
			if( null != subject ) {
				helper.setSubject( subject );
			}
			helper.setText( text, html );
			if( null != attachmentName && null != attachment ) {
				helper.addAttachment( attachmentName, attachment );
			}
			( (JavaMailSenderImpl)mailSender ).send( message );
		} catch( Exception ex ) {
			LOGGER.error( "Send email error", ex );
		}
	}

	public void asyncSendMessage( final String[] to, final String from, final String subject, final String text, final String attachmentName,
								  final ClassPathResource attachment, final boolean html ) {
		taskExecutor.execute( new Runnable() {

			public void run() {
				try {
					sendMessage( to, from, subject, text, attachmentName, attachment, html );
				} catch( Exception ex ) {
					LOGGER.error( "Async send email error", ex );
				}
			}
		} );
	}

	public void setMailSender( MailSender mailSender ) {
		this.mailSender = mailSender;
	}
}
