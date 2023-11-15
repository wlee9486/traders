/**
 * @author wheesunglee
 * @create date 2023-10-04 16:10:23
 * @modify date 2023-10-21 00:44:35
 */
package com.newus.traders.redis.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.product.dto.ProductDto;
import com.newus.traders.redis.service.RedisService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RedisController {

        private final RedisService redisService;

        @GetMapping("/redis/weekly")
        public ResponseEntity<List<Boolean>> checkAttendance(@RequestHeader("token") String accessToken) {

                return ResponseEntity
                                .ok(redisService.getWeeklyAttendance(LocalDate.now(), accessToken));
        }

        @PostMapping("/redis/attendance")
        public ResponseEntity<String> updateAttendance(@RequestHeader("token") String accessToken) {

                return ResponseEntity.ok(redisService.updateAttendance(LocalDate.now(), accessToken));
        }

        @GetMapping("/redis/checkLiked/{id}")
        public boolean checkIfLiked(@RequestHeader("token") String accessToken, @PathVariable("id") Long productId) {

                return redisService.checkIfLiked(productId, accessToken);
        }

        @PutMapping("/redis/changeLikes/{id}")
        public Long changeLikes(@RequestHeader("token") String accessToken, @PathVariable("id") Long productId) {
                redisService.addLikes(productId, accessToken);

                return (Long) redisService.countLikes(productId);
        }

        @GetMapping("/redis/getLikes/{id}")
        public Long getLikes(@RequestHeader("token") String accessToken, @PathVariable("id") Long productId) {

                return (Long) redisService.countLikes(productId);
        }

        @GetMapping("/redis/myLikes")
        public ResponseEntity<List<ProductDto>> myLikes(@RequestHeader("token") String accessToken) {

                return ResponseEntity.ok(redisService.getMyLikes(accessToken));
        }

}
