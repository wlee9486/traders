/**
 * @author heera youn
 * @create date 2023-10-18 14:11:33
 * @modify date 2023-10-20 15:28:51
 */
package com.newus.traders.user.exception;

public class NotFoundMemberException extends RuntimeException {
    public NotFoundMemberException() {
        super();
    }

    public NotFoundMemberException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundMemberException(String message) {
        super(message);
    }

    public NotFoundMemberException(Throwable cause) {
        super(cause);
    }
}