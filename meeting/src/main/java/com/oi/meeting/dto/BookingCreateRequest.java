package com.oi.meeting.dto;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

@Data
public class BookingCreateRequest {
    private Long customerId;
    private Long roomId;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private LocalDateTime startTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private LocalDateTime endTime;
    
    private Integer participantCount;
    private Boolean needProjector;
    private Boolean needSound;
    private Boolean needNetwork;
}
