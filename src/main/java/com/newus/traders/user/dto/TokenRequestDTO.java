/**
 * @author heera youn
 * @create date 2023-10-13 12:39:38
 * @modify date 2023-10-28 10:45:23
 */
package com.newus.traders.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TokenRequestDTO {
    private String accessToken;
    private String refreshToken;
}
