package com.oi.meeting.entity;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CancellationRequest {
    private Long id;
    private Long bookingId; // 预订ID
    private Long customerId; // 客户ID
    private String reason; // 取消原因
    private BigDecimal refundAmount; // 退款金额
    private BigDecimal refundRate; // 退款比例
    private String status; // PENDING, APPROVED, REJECTED
    private Long reviewerId; // 审核员工ID
    private String reviewComment; // 审核意见
    private LocalDateTime createTime;
    private LocalDateTime reviewTime;
}
