package com.oi.meeting.task;

import com.oi.meeting.entity.Booking;
import com.oi.meeting.mapper.BookingMapper;
import com.oi.meeting.service.MeetingRoomService;
import com.oi.meeting.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class RoomStatusTask {
    
    @Autowired
    private BookingMapper bookingMapper;
    
    @Autowired
    private MeetingRoomService meetingRoomService;
    
    /**
     * 每5分钟检查一次会议室状态
     * 自动更新会议室状态：开始使用、结束使用
     */
    @Scheduled(fixedRate = 300000) // 5分钟执行一次
    public void updateRoomStatus() {
        try {
            LocalDateTime now = LocalDateTime.now();
            
            // 查找应该开始使用的会议室（已支付且开始时间已到）
            List<Booking> startingBookings = bookingMapper.selectBookingsToStart(now);
            for (Booking booking : startingBookings) {
                meetingRoomService.setRoomInUse(booking.getRoomId());
                System.out.println("会议室 " + booking.getRoomId() + " 开始使用，预订ID: " + booking.getId());
            }
            
            // 查找应该结束使用的会议室（使用时间已结束）
            List<Booking> endingBookings = bookingMapper.selectBookingsToEnd(now);
            for (Booking booking : endingBookings) {
                meetingRoomService.releaseRoom(booking.getRoomId());
                // 更新预订状态为已完成
                bookingMapper.updateStatus(booking.getId(), Constants.BOOKING_STATUS_COMPLETED);
                System.out.println("会议室 " + booking.getRoomId() + " 使用结束，预订ID: " + booking.getId());
            }
            
        } catch (Exception e) {
            System.err.println("更新会议室状态时发生错误：" + e.getMessage());
        }
    }
    
    /**
     * 每天凌晨1点清理过期数据
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void cleanupExpiredData() {
        try {
            // 清理30天前的已完成预订记录（可选）
            LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
            int deletedCount = bookingMapper.deleteCompletedBookingsBefore(thirtyDaysAgo);
            System.out.println("清理了 " + deletedCount + " 条过期预订记录");
            
        } catch (Exception e) {
            System.err.println("清理过期数据时发生错误：" + e.getMessage());
        }
    }
    
    /**
     * 每小时检查一次维护状态的会议室
     * 提醒管理员处理维护状态的会议室
     */
    @Scheduled(fixedRate = 3600000) // 1小时执行一次
    public void checkMaintenanceRooms() {
        try {
            // 这里可以添加检查维护状态会议室的逻辑
            // 比如发送通知给管理员等
            System.out.println("检查维护状态会议室...");
            
        } catch (Exception e) {
            System.err.println("检查维护状态会议室时发生错误：" + e.getMessage());
        }
    }
}
