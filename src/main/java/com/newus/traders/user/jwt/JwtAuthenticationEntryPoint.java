/**
 * @author heera youn
 * @create date 2023-10-12 12:23:43
 * @modify date 2023-10-16 22:02:35
 */
package com.newus.traders.user.jwt;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
   @Override
   public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
         throws IOException {
      // 유효한 자격증명을 제공하지 않고 접근하려 할때 401 => 유저 정보 없이 접근 시 SC_UNAUTHORIZED (401) 응답
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
   }
}