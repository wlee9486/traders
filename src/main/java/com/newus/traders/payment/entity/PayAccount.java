/**
 * @author ahrayi
 * @create date 2023-10-17 11:57:14
 * @modify date 2023-10-23 08:23:14
 */

package com.newus.traders.payment.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PayAccount {
    @Id
    private Long clientInfo;
    private String userName;
    private String accountNum;
    private String bankCodeStd;
    private String agreeWdTr;
    private String addr1;
    private String addr2;

    private int payBalance;
}
