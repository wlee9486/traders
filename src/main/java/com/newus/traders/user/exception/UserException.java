/**
 * @author heera youn
 * @create date 2023-10-16 14:32:31
 * @modify date 2023-10-20 15:26:46
 */
package com.newus.traders.user.exception;

import org.springframework.http.HttpStatus;

public class UserException extends RuntimeException {

    private HttpStatus status;

    public UserException(HttpStatus status) {
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}