/**
 * @author wheesunglee
 * @create date 2023-10-22 12:55:02
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.dto;

import java.time.LocalDateTime;

import com.newus.traders.notification.entity.Notification;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationDto {
    private String sender;
    private LocalDateTime createdAt;

    @Builder
    public NotificationDto(Notification notification) {
        this.sender = notification.getSender().getUsername();
        this.createdAt = notification.getCreatedAt();
    }

}
