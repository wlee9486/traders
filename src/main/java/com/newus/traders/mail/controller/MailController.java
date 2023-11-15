/**
 * @author heera youn
 * @create date 2023-10-22 17:24:50
 * @modify date 2023-10-27 15:08:33
 */
package com.newus.traders.mail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.mail.service.MailService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class MailController {

    @Autowired
    private MailService mailService;

    // 이메일 인증
    @GetMapping("/auth/signup/email")
    @ResponseBody
    String mailConfirm(@RequestParam("email") String email) throws Exception {
        System.out.println("받은 이메일 주소: " + email);
        String code = mailService.sendSimpleMessage(email);
        System.out.println("인증코드 : " + code);
        return code;
    }

}
