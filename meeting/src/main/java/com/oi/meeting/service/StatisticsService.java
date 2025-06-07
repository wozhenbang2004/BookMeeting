package com.oi.meeting.service;

import com.oi.meeting.mapper.BookingMapper;
import com.oi.meeting.mapper.MeetingRoomMapper;
import com.oi.meeting.mapper.UserMapper;
import com.oi.meeting.mapper.CancellationRequestMapper;
import com.oi.meeting.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class StatisticsService {
    
    @Autowired
    private BookingMapper bookingMapper;
    
    @Autowired
    private MeetingRoomMapper meetingRoomMapper;
    
    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private CancellationRequestMapper cancellationRequestMapper;
    
    /**
     * 获取系统总体统计信息
     */
    public Map<String, Object> getSystemStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        // 用户统计
        stats.put("totalUsers", userMapper.selectAll().size());
        stats.put("activeUsers", userMapper.selectByStatus(Constants.USER_STATUS_ACTIVE).size());
        stats.put("pendingUsers", userMapper.selectByStatus(Constants.USER_STATUS_PENDING).size());
        stats.put("frozenUsers", userMapper.selectByStatus(Constants.USER_STATUS_FROZEN).size());
        
        // 会议室统计
        stats.put("totalRooms", meetingRoomMapper.selectAll().size());
        stats.put("availableRooms", meetingRoomMapper.selectByStatus(Constants.ROOM_STATUS_AVAILABLE).size());
        stats.put("bookedRooms", meetingRoomMapper.selectByStatus(Constants.ROOM_STATUS_BOOKED).size());
        stats.put("inUseRooms", meetingRoomMapper.selectByStatus(Constants.ROOM_STATUS_IN_USE).size());
        stats.put("maintenanceRooms", meetingRoomMapper.selectByStatus(Constants.ROOM_STATUS_MAINTENANCE).size());
        
        // 预订统计
        stats.put("totalBookings", bookingMapper.selectAll().size());
        stats.put("lockedBookings", bookingMapper.selectByStatus(Constants.BOOKING_STATUS_LOCKED).size());
        stats.put("paidBookings", bookingMapper.selectByStatus(Constants.BOOKING_STATUS_PAID).size());
        stats.put("completedBookings", bookingMapper.selectByStatus(Constants.BOOKING_STATUS_COMPLETED).size());
        stats.put("cancelledBookings", bookingMapper.selectByStatus(Constants.BOOKING_STATUS_CANCELLED).size());
        
        // 取消申请统计
        stats.put("pendingCancellations", cancellationRequestMapper.selectByStatus(Constants.CANCEL_STATUS_PENDING).size());
        stats.put("approvedCancellations", cancellationRequestMapper.selectByStatus(Constants.CANCEL_STATUS_APPROVED).size());
        stats.put("rejectedCancellations", cancellationRequestMapper.selectByStatus(Constants.CANCEL_STATUS_REJECTED).size());
        
        return stats;
    }
    
    /**
     * 获取今日统计信息
     */
    public Map<String, Object> getTodayStatistics() {
        Map<String, Object> stats = new HashMap<>();
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        
        // 今日预订统计
        stats.put("todayBookings", bookingMapper.selectBookingsBetween(startOfDay, endOfDay).size());
        stats.put("todayRevenue", calculateTodayRevenue(startOfDay, endOfDay));
        
        return stats;
    }
    
    /**
     * 计算今日收入
     */
    private double calculateTodayRevenue(LocalDateTime startOfDay, LocalDateTime endOfDay) {
        return bookingMapper.selectPaidBookingsBetween(startOfDay, endOfDay)
                .stream()
                .mapToDouble(booking -> booking.getTotalPrice().doubleValue())
                .sum();
    }
    
    /**
     * 获取会议室使用率统计
     */
    public Map<String, Object> getRoomUsageStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        // 计算各会议室的使用率
        // 这里可以添加更复杂的统计逻辑
        
        return stats;
    }
    
    /**
     * 获取用户活跃度统计
     */
    public Map<String, Object> getUserActivityStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        // 计算用户活跃度
        // 这里可以添加更复杂的统计逻辑
        
        return stats;
    }
}
