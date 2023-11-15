/**
 * @author wheesunglee
 * @create date 2023-10-22 12:57:22
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.notification.dto.NotificationDto;
import com.newus.traders.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/notifications/{user}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<NotificationDto> getNotifications(@PathVariable String user) {
        return notificationService.getNotificationsByReceiverAsFlux(user);
    }

}
