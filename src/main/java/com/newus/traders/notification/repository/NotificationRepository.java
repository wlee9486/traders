/**
 * @author wheesunglee
 * @create date 2023-10-22 12:57:22
 * @modify date 2023-10-22 12:57:23
 */
package com.newus.traders.notification.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.notification.entity.Notification;
import com.newus.traders.user.entity.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByReceiverAndIsDeliveredFalse(User receiver);
}
