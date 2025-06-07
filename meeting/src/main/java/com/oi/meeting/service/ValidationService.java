package com.oi.meeting.service;

import com.oi.meeting.common.Constants;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
public class ValidationService {
    
    /**
     * 验证预订时间是否在营业时间内
     */
    public boolean isWithinBusinessHours(LocalDateTime startTime, LocalDateTime endTime) {
        LocalTime businessStart = LocalTime.of(Constants.BUSINESS_START_HOUR, 0);
        LocalTime businessEnd = LocalTime.of(Constants.BUSINESS_END_HOUR, 0);
        
        LocalTime start = startTime.toLocalTime();
        LocalTime end = endTime.toLocalTime();
        
        return !start.isBefore(businessStart) && !end.isAfter(businessEnd);
    }
    
    /**
     * 验证预订时间是否在允许的提前预订范围内
     */
    public boolean isWithinAdvanceBookingLimit(LocalDateTime startTime) {
        LocalDateTime maxAdvanceTime = LocalDateTime.now().plusDays(Constants.MAX_ADVANCE_DAYS);
        return !startTime.isAfter(maxAdvanceTime);
    }
    
    /**
     * 验证预订时间是否在未来
     */
    public boolean isFutureTime(LocalDateTime startTime) {
        return startTime.isAfter(LocalDateTime.now());
    }
    
    /**
     * 验证结束时间是否在开始时间之后
     */
    public boolean isValidTimeRange(LocalDateTime startTime, LocalDateTime endTime) {
        return endTime.isAfter(startTime);
    }
    
    /**
     * 验证预订时长是否为整小时
     */
    public boolean isValidDuration(LocalDateTime startTime, LocalDateTime endTime) {
        return startTime.getMinute() == 0 && startTime.getSecond() == 0 &&
               endTime.getMinute() == 0 && endTime.getSecond() == 0;
    }
    
    /**
     * 综合验证预订时间
     */
    public String validateBookingTime(LocalDateTime startTime, LocalDateTime endTime) {
        if (!isValidTimeRange(startTime, endTime)) {
            return "结束时间必须在开始时间之后";
        }
        
        if (!isFutureTime(startTime)) {
            return "预订时间必须是未来时间";
        }
        
        if (!isValidDuration(startTime, endTime)) {
            return "预订时间必须为整小时";
        }
        
        if (!isWithinBusinessHours(startTime, endTime)) {
            return String.format("预订时间必须在营业时间内（%d:00-%d:00）", 
                Constants.BUSINESS_START_HOUR, Constants.BUSINESS_END_HOUR);
        }
        
        if (!isWithinAdvanceBookingLimit(startTime)) {
            return String.format("最多只能提前%d天预订", Constants.MAX_ADVANCE_DAYS);
        }
        
        return null; // 验证通过
    }
    
    /**
     * 验证会议室容量是否满足参会人数
     */
    public boolean isCapacitySufficient(int roomCapacity, int participantCount) {
        return roomCapacity >= participantCount;
    }
    
    /**
     * 验证会议室设备是否满足需求
     */
    public boolean areEquipmentRequirementsMet(boolean roomHasProjector, boolean roomHasSound, 
                                             boolean roomHasNetwork, boolean needProjector, 
                                             boolean needSound, boolean needNetwork) {
        if (needProjector && !roomHasProjector) return false;
        if (needSound && !roomHasSound) return false;
        if (needNetwork && !roomHasNetwork) return false;
        return true;
    }
}
