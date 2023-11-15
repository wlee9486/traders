/**
 * @author hyunseul
 * @create date 2023-09-26 17:02:45
 * @modify date 2023-09-26 17:02:45
 */
package com.newus.traders.chat.document;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "chat")
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {
    private String id;
    private String text;
    private String sender;
    private String roomNum;
    private LocalDateTime createdAt;
    private String receiver;

    private String date;
    private String location;

}
