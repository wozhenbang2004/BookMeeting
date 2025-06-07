package com.oi.meeting.entity;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class MeetingRoom {
    private Long id;
    private String name; // 会议室名称
    private String type; // CLASSROOM, ROUNDTABLE
    private Integer capacity; // 座位数
    private Boolean hasProjector; // 是否有投影仪
    private Boolean hasSound; // 是否有音响
    private Boolean hasNetwork; // 是否有网络
    private BigDecimal pricePerHour; // 每小时价格
    private String status; // AVAILABLE, LOCKED, BOOKED, IN_USE, MAINTENANCE
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
