/**
 * @author heera youn
 * @create date 2023-10-22 17:24:50
 * @modify date 2023-10-27 15:08:33
 * [회원가입 시 이메일 인증번호 발송 위한 config 환경설정]
 */
package com.newus.traders.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

    @Value("${mail.smtp.server}")
    private String mailserver;

    @Value("${mail.username}")
    private String mailusername;

    @Value("${mail.userpassword}")
    private String mailuserpwd;

    @Bean
    public JavaMailSender JavaMailService() {
        JavaMailSenderImpl JavaMailSender = new JavaMailSenderImpl();
        JavaMailSender.setHost(mailserver); // 메인 도메인 서버 주소 => 정확히는 smtp 서버 주소
        JavaMailSender.setUsername(mailusername); // 네이버 아이디
        JavaMailSender.setPassword(mailuserpwd); // 네이버 비밀번호

        JavaMailSender.setPort(465); // 메일 인증서버 포트

        JavaMailSender.setJavaMailProperties(getMailProperties()); // 메일 인증서버 정보 가져오기

        return JavaMailSender;
    }

    private Properties getMailProperties() {
        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", "smtp"); // 프로토콜 설정
        properties.setProperty("mail.smtp.auth", "true"); // smtp 인증
        properties.setProperty("mail.smtp.starttls.enable", "true"); // smtp strattles 사용
        properties.setProperty("mail.debug", "true"); // 디버그 사용
        properties.setProperty("mail.smtp.ssl.trust", "smtp.naver.com"); // ssl 인증 서버는 smtp.naver.com
        properties.setProperty("mail.smtp.ssl.enable", "true"); // ssl 사용
        return properties;
    }
}
