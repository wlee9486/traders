/**
 * @author heera youn
 * @create date 2023-10-16 10:30:58
 * @modify date 2023-10-25 25:34:12
 */

package com.newus.traders.user.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    // OncePerRequestFilter 인터페이스를 구현하기 때문에 요청 받을 때 단 한번만 실행

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    private final TokenProvider tokenProvider;

    // 실제 필터링 로직 수행 doFilterInternal
    // JWT 토큰의 인증 정보를 헤더에서 AT꺼내 검사 후 현재 쓰레드의 SecurityContext 에 저장
    // 가입,로그인, 재발급을 제외한 모든 REQUEST요청은 이 필터를 거치게 됨
    // 즉, 토큰정보 없거나 유효하지 않다면 정상적 수행 불가
    // 요청이 CONTROLLER까지 도착 => SECURITYCONTEXT의 MEMBER ID가 존재한다는 것을 보장
    // 직접 DB조회 X, AT에 있는 MEMBER ID를 꺼냈기 때문에 탈퇴로 인해 ID가 없다는 경우는 SERVICE 단 고려
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        // 1. Request Header 에서 토큰을 꺼냄
        String jwt = resolveToken(request);

        // 2. validateToken 으로 토큰 유효성 검사
        // 정상 토큰이면 해당 토큰으로 Authentication 을 가져와서 SecurityContext 에 저장
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            System.out.println("!!!!토큰 검증 결과/:" + tokenProvider.validateToken(jwt));
            Authentication authentication = tokenProvider.getAuthentication(jwt);

            System.out.println("jwtFilter의 문제? 오나요?" + authentication.getPrincipal());

            SecurityContextHolder.getContext().setAuthentication(authentication);
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            System.out.println(principal);
            System.out.println("좋앗숴!!!!!!!!!!!!!!!끝끝!!");
        }

        filterChain.doFilter(request, response);
    }

    // Request Header 에서 토큰 정보를 꺼내오기
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {

            return bearerToken.substring(7);
        }
        return null;
    }

}