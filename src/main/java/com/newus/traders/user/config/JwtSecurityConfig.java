/**
 * @author heera youn
 * @create date 2023-10-10 12:13:45
 * @modify date 2023-10-16 18:56:43
 * @desc [JWT 및 필터 + Security 환경설정]
 */
package com.newus.traders.user.config;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.newus.traders.user.jwt.JwtFilter;
import com.newus.traders.user.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

// 직접 만든 TokenProvider 와 JwtFilter 를 SecurityConfig 에 적용할 때 사용
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenProvider tokenProvider;

    // TokenProvider 를 주입받아서 JwtFilter 를 통해 Security 로직에 필터를 등록
    // SECURITY FILTER 앞에 JWTFILTER를 추가
    @Override
    public void configure(HttpSecurity http) {
        JwtFilter customFilter = new JwtFilter(tokenProvider);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}