/**
 * @author wheesunglee
 * @create date 2023-09-23 18:36:56
 * @modify date 2023-09-23 18:36:56
 */

package com.newus.traders.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    PRODUCT_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "물품을 찾을 수 없습니다."),
    PRODUCT_NOT_SAVED(HttpStatus.INTERNAL_SERVER_ERROR, "물품을 저장할 수 없습니다"),
    PRODUCT_NOT_DELETED(HttpStatus.INTERNAL_SERVER_ERROR, "물품을 삭제할 수 없습니다"),
    PRODUCT_NOT_UPDATED(HttpStatus.INTERNAL_SERVER_ERROR, "물품을 수정할 수 없습니다"),
    IMAGE_NOT_DELETED(HttpStatus.INTERNAL_SERVER_ERROR, "사진을 삭제할 수 없습니다"),

    USER_ALREADY_EXISTS(HttpStatus.INTERNAL_SERVER_ERROR, "이미 존재하는 닉네임 입니다."),
    USER_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "존재하지 않는 회원입니다."),
    EMAIL_ALREADY_EXISTS(HttpStatus.INTERNAL_SERVER_ERROR, "이미 가입된 이메일 입니다."),
    TOKEN_NOT_VALID(HttpStatus.INTERNAL_SERVER_ERROR, "Refresh Token 이 유효하지 않습니다."),

    CAMPAIGN_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "해당하는 캠페인을 찾을 수 없습니다."),
    CAMPAIGN_NOT_SAVED(HttpStatus.INTERNAL_SERVER_ERROR, "캠페인을 등록할 수 없습니다"),

    SNS_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "해당하는 SNS를 찾을 수 없습니다."),
    SNS_NOT_SAVED(HttpStatus.INTERNAL_SERVER_ERROR, "SNS를 등록할 수 없습니다"),
    SNS_NOT_DELETED(HttpStatus.INTERNAL_SERVER_ERROR, "SNS를 삭제할 수 없습니다"),
    SNS_NOT_UPDATED(HttpStatus.INTERNAL_SERVER_ERROR, "SNS를 수정할 수 없습니다"),

    NOTIFICATION_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "알림이 존재하지 않습니다"),

    PAYMENT_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "페이 가입 정보가 존재하지 않습니다"),
    PAYACCOUNT_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "등록 계좌 정보가 존재하지 않습니다"),
    PASSWORD_NOT_MATCHED(HttpStatus.INTERNAL_SERVER_ERROR, "비밀번호가 일치하지 않습니다"),
    TRANSFER_NOT_COMPLETED(HttpStatus.INTERNAL_SERVER_ERROR, "거래 오류"),
    HISTORY_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "조회 실패");

    private final HttpStatus httpStatus;
    private final String message;
}
