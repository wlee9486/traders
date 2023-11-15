/**
 * @author heera youn
 * @create date 2023-10-16 10:39:38
 * @modify date 2023-10-20 15:11:53
 */
package com.newus.traders.user.exception;

public class DuplicateMemberException extends RuntimeException {
    public DuplicateMemberException() {
        super();
    }

    public DuplicateMemberException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateMemberException(String message) {
        super(message);
    }

    public DuplicateMemberException(Throwable cause) {
        super(cause);
    }
}