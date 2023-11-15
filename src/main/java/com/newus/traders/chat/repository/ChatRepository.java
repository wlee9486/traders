/**
 * @author hyunseul
 * @create date 2023-09-26 17:02:51
 * @modify date 2023-09-26 17:02:51
 */
package com.newus.traders.chat.repository;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Component;

import com.newus.traders.chat.document.ChatDto;

import reactor.core.publisher.Flux;

// MongoDB에서 방번호로 채팅 메세지 조회
@SpringBootApplication
@Component
public interface ChatRepository extends ReactiveMongoRepository<ChatDto, String> {

    // 채팅방 번호로 채팅 내용 뽑기
    @Query("{ roomNum: ?0 }")
    Flux<ChatDto> mFindByRoomNum(String roomNum);

    // 채팅방 리스트
    @Query("{ $or: [{ sender : ?0 }, { receiver : ?1 }] }")
    Flux<ChatDto> findBySenderOrReceiver(String sender, String receiver);

}
