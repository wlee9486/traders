/**
 * @author wheesunglee
 * @create date 2023-10-22 12:55:02
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.newus.traders.chat.document.ChatDto;
import com.newus.traders.user.entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private User sender;
    private User receiver;
    private LocalDateTime createdAt;
    private boolean isDelivered;

    @Builder
    public Notification(User sender, User receiver, ChatDto chatDto) {
        this.sender = sender;
        this.receiver = receiver;
        this.createdAt = chatDto.getCreatedAt();
        this.isDelivered = false;

    }

    public void setIsDelivered(boolean isDelivered) {
        this.isDelivered = isDelivered;
    }
}
