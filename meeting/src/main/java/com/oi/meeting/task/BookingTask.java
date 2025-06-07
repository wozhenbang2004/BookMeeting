package com.oi.meeting.task;

import com.oi.meeting.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class BookingTask {
    
    @Autowired
    private BookingService bookingService;
    
    /**
     * 每分钟检查一次超时的预订
     */
    @Scheduled(fixedRate = 60000) // 60秒执行一次
    public void handleExpiredBookings() {
        try {
            bookingService.handleExpiredBookings();
        } catch (Exception e) {
            System.err.println("处理超时预订时发生错误：" + e.getMessage());
        }
    }
}
