/**
 * @author heera youn
 * @create date 2023-10-12 15:32:56
 * @modify date 2023-10-16 20:11:44
 */
package com.newus.traders.user.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException, ServletException {
        // 필요한 권한이 없이 접근하려 할때 403
        // 유저 정보 존재, 자원 접근 권한 없을 때 SC_FORBIDDEN (403) 응답
        response.sendError(HttpServletResponse.SC_FORBIDDEN);
    }
}