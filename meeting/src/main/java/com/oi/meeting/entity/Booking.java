package com.oi.meeting.entity;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
public class Booking {
    private Long id;
    private Long customerId; // 客户ID
    private Long roomId; // 会议室ID

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private LocalDateTime startTime; // 开始时间

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private LocalDateTime endTime; // 结束时间
    private Integer participantCount; // 参会人数
    private Boolean needProjector; // 是否需要投影仪
    private Boolean needSound; // 是否需要音响
    private Boolean needNetwork; // 是否需要网络
    private BigDecimal totalPrice; // 总价格
    private String status; // LOCKED, PAID, CANCELLED, COMPLETED

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private LocalDateTime createTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private LocalDateTime updateTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private LocalDateTime paymentDeadline; // 支付截止时间
}
