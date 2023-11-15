/**
 * @author ahrayi
 * @create date 2023-10-13 18:56:43
 * @modify date 2023-10-16 12:14:06
 */

package com.newus.traders.payment.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class InquiryRcvResponseDto {
    private String rsp_code;
    private String account_holder_name;
    private String bank_tran_id;
    private String bank_rsp_code;
}
