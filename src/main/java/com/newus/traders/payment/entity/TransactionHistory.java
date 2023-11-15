/**
 * @author ahrayi
 * @create date 2023-10-21 18:03:21
 * @modify date 2023-10-23 08:08:58
 * @desc 거래내역
 *       거래고유번호(pk) 글고유번호(fk) 판매자 구매자 거래일시 //금액 상품명 
 */

package com.newus.traders.payment.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long transactionId;
    private String type;
    private Long seller;
    private Long buyer;
    private String content;
    private int tranAmt;
    private String transactionDtime;
}
