/**
 * @author wheesunglee
 * @create date 2023-10-22 12:59:20
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.newus.traders.chat.document.ChatDto;
import com.newus.traders.notification.dto.NotificationDto;
import com.newus.traders.notification.entity.Notification;
import com.newus.traders.notification.repository.NotificationRepository;
import com.newus.traders.user.entity.User;
import com.newus.traders.user.service.UserService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserService userService;

    public void saveNotification(ChatDto chatDto) {
        User sender = userService.getUserByUsername(chatDto.getSender());
        User receiver = userService.getUserByUsername(chatDto.getReceiver());

        Notification notification = new Notification(sender, receiver, chatDto);
        notificationRepository.save(notification);
    }

    public Flux<NotificationDto> getNotificationsByReceiverAsFlux(String user) {
        User receiver = userService.getUserByUsername(user);

        List<Notification> notifications = notificationRepository.findAllByReceiverAndIsDeliveredFalse(receiver);
        List<NotificationDto> notificationDtos = new ArrayList<>();
        
        for (Notification notification : notifications) {
            notification.setIsDelivered(true);
            notificationRepository.save(notification);
            notificationDtos.add(new NotificationDto(notification));
        }

        return Flux.fromIterable(notificationDtos);
    }

}
