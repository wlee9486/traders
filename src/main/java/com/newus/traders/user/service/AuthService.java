/**
 * @author heera youn
 * @create date 2023-10-25 13:50:13
 * @modify date 2023-10-25 13:50:13
/**
 * @author wheesunglee
 * @create date 2023-10-25 13:50:08
 * @modify date 2023-10-25 13:50:08
 * refreshtoken 레디스 저장
 */

package com.newus.traders.user.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newus.traders.exception.CustomException;
import com.newus.traders.exception.ErrorCode;
import com.newus.traders.redis.service.RedisService;
import com.newus.traders.user.dto.TokenDTO;
import com.newus.traders.user.dto.TokenRequestDTO;
import com.newus.traders.user.dto.UserRequestDTO;
import com.newus.traders.user.dto.UserResponseDTO;
import com.newus.traders.user.entity.User;
import com.newus.traders.user.form.RefreshToken;
import com.newus.traders.user.jwt.TokenProvider;
import com.newus.traders.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisService redisService;
    private final TokenProvider tokenProvider;

    @Transactional
    public UserResponseDTO signup(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new CustomException(ErrorCode.USER_ALREADY_EXISTS);
        }

        User user = userRequestDTO.toUser(passwordEncoder);
        return UserResponseDTO.of(userRepository.save(user));
    }

    @Transactional
    public TokenDTO login(UserRequestDTO userRequestDTO) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = userRequestDTO.toAuthentication();
        System.out.println("로그인검증 정보" + authenticationToken);

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        // authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername
        // 메서드가 실행됨

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDTO tokenDTO = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDTO.getRefreshToken())
                .expiration(tokenDTO.getRefreshTokenExpiresIn())
                .build();
        // 레디스에 저장
        redisService.saveRefreshToken(refreshToken);

        // 5. 토큰 발급
        return tokenDTO;
    }

    @Transactional
    // string refreshtoken 받기
    public TokenDTO reissue(TokenRequestDTO tokenRequestDTO) {

        System.out.println("DTO의 RT 값: " + tokenRequestDTO.getRefreshToken());
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDTO.getRefreshToken())) {
            throw new CustomException(ErrorCode.TOKEN_NOT_VALID);
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDTO.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        String refreshTokenValue = (String) redisService.getRefreshToken(authentication.getName());

        // 4. Refresh Token 일치하는지 검사
        if (!refreshTokenValue.equals(tokenRequestDTO.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDTO tokenDTO = tokenProvider.generateTokenDto(authentication);
        System.out.println("새로 발급받은 RT : " + tokenDTO.getRefreshToken());

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDTO.getRefreshToken())
                .expiration(tokenDTO.getRefreshTokenExpiresIn())
                .build();
        redisService.saveRefreshToken(newRefreshToken);

        // 토큰 발급
        System.out.println("TokenDTO의 AccessToken: " + tokenDTO.getAccessToken());
        System.out.println("TokenDTO의 RefreshToken: " + tokenDTO.getRefreshToken());
        return tokenDTO;
    }

}
