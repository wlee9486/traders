/**
 * @author heera youn
 * @create date 2023-10-16 10:54:45
 * @modify date 2023-10-16 10:54:45
 */

/**
 * @author wheesunglee
 * @create date 2023-10-21 01:19:05
 * @modify date 2023-10-21 01:19:05
 */
package com.newus.traders.user.form;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RefreshToken {

    private String key;// userid

    private String value;// refresh token string
    private Long expiration;// refresh token string

    @Builder
    public RefreshToken(String key, String value, Long expiration) {
        this.key = key;
        this.value = value;
        this.expiration = expiration;
    }

    public RefreshToken updateValue(String token) {
        this.value = token;
        return this;
    }
}