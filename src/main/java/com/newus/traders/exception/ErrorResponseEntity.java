/**
 * @author wheesunglee
 * @create date 2023-09-23 18:36:49
 * @modify date 2023-09-23 18:36:49
 */

package com.newus.traders.exception;

import org.springframework.http.ResponseEntity;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ErrorResponseEntity {
    private int status;
    private String code;
    private String message;

    // ErrorCode의 내용으로 Response를 만듬
    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponseEntity.builder()
                        .status(errorCode.getHttpStatus().value())
                        .code(errorCode.name())
                        .message(errorCode.getMessage())
                        .build());
    }
}
