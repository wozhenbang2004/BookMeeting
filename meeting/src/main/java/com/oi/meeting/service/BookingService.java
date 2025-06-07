package com.oi.meeting.service;

import com.oi.meeting.entity.Booking;
import com.oi.meeting.entity.MeetingRoom;
import com.oi.meeting.mapper.BookingMapper;
import com.oi.meeting.mapper.MeetingRoomMapper;
import com.oi.meeting.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {
    
    @Autowired
    private BookingMapper bookingMapper;

    @Autowired
    private MeetingRoomMapper meetingRoomMapper;

    @Autowired
    private MeetingRoomService meetingRoomService;

    @Autowired
    private ValidationService validationService;
    
    /**
     * 创建预订
     */
    @Transactional
    public String createBooking(Booking booking) {
        // 验证预订时间
        String timeValidation = validationService.validateBookingTime(booking.getStartTime(), booking.getEndTime());
        if (timeValidation != null) {
            return timeValidation;
        }

        // 获取会议室信息
        MeetingRoom room = meetingRoomMapper.selectById(booking.getRoomId());
        if (room == null) {
            return "会议室不存在";
        }

        // 验证会议室容量
        if (!validationService.isCapacitySufficient(room.getCapacity(), booking.getParticipantCount())) {
            return "会议室容量不足，最多容纳" + room.getCapacity() + "人";
        }

        // 验证设备需求
        if (!validationService.areEquipmentRequirementsMet(
                room.getHasProjector(), room.getHasSound(), room.getHasNetwork(),
                booking.getNeedProjector(), booking.getNeedSound(), booking.getNeedNetwork())) {
            return "会议室设备不满足需求";
        }

        // 检查时间冲突
        List<Booking> conflicts = bookingMapper.selectConflictBookings(
            booking.getRoomId(), booking.getStartTime(), booking.getEndTime());
        if (!conflicts.isEmpty()) {
            return "该时间段已被预订";
        }

        // 计算总价格
        long hours = ChronoUnit.HOURS.between(booking.getStartTime(), booking.getEndTime());
        BigDecimal totalPrice = room.getPricePerHour().multiply(BigDecimal.valueOf(hours));
        booking.setTotalPrice(totalPrice);

        // 设置支付截止时间（30分钟后）
        booking.setPaymentDeadline(LocalDateTime.now().plusMinutes(Constants.PAYMENT_TIMEOUT_MINUTES));
        booking.setStatus(Constants.BOOKING_STATUS_LOCKED);

        // 插入预订记录
        if (bookingMapper.insert(booking) > 0) {
            // 锁定会议室
            meetingRoomService.lockRoom(booking.getRoomId());
            return null; // 成功
        }

        return "创建预订失败";
    }
    
    /**
     * 支付预订
     */
    @Transactional
    public boolean payBooking(Long bookingId) {
        Booking booking = bookingMapper.selectById(bookingId);
        if (booking == null || !Constants.BOOKING_STATUS_LOCKED.equals(booking.getStatus())) {
            return false;
        }
        
        // 检查是否超时
        if (LocalDateTime.now().isAfter(booking.getPaymentDeadline())) {
            // 超时，取消预订
            cancelExpiredBooking(bookingId);
            return false;
        }
        
        // 更新预订状态为已支付
        if (bookingMapper.updateStatus(bookingId, Constants.BOOKING_STATUS_PAID) > 0) {
            // 更新会议室状态为已预订
            meetingRoomService.bookRoom(booking.getRoomId());
            return true;
        }
        
        return false;
    }
    
    /**
     * 取消超时预订
     */
    @Transactional
    public void cancelExpiredBooking(Long bookingId) {
        Booking booking = bookingMapper.selectById(bookingId);
        if (booking != null) {
            bookingMapper.updateStatus(bookingId, Constants.BOOKING_STATUS_CANCELLED);
            meetingRoomService.releaseRoom(booking.getRoomId());
        }
    }
    
    /**
     * 处理超时预订
     */
    @Transactional
    public void handleExpiredBookings() {
        List<Booking> expiredBookings = bookingMapper.selectExpiredBookings(LocalDateTime.now());
        for (Booking booking : expiredBookings) {
            cancelExpiredBooking(booking.getId());
        }
    }
    
    /**
     * 获取客户的预订记录
     */
    public List<Booking> getCustomerBookings(Long customerId) {
        return bookingMapper.selectByCustomerId(customerId);
    }
    
    /**
     * 获取可取消的预订
     */
    public List<Booking> getCancellableBookings(Long customerId) {
        LocalDateTime minCancelTime = LocalDateTime.now().plusHours(Constants.MIN_CANCEL_HOURS);
        return bookingMapper.selectCancellableBookings(customerId, minCancelTime);
    }
    
    /**
     * 根据ID获取预订
     */
    public Booking getBookingById(Long id) {
        return bookingMapper.selectById(id);
    }
    
    /**
     * 获取所有预订
     */
    public List<Booking> getAllBookings() {
        return bookingMapper.selectAll();
    }
    
    /**
     * 完成预订
     */
    @Transactional
    public boolean completeBooking(Long bookingId) {
        Booking booking = bookingMapper.selectById(bookingId);
        if (booking != null && Constants.BOOKING_STATUS_PAID.equals(booking.getStatus())) {
            bookingMapper.updateStatus(bookingId, Constants.BOOKING_STATUS_COMPLETED);
            meetingRoomService.releaseRoom(booking.getRoomId());
            return true;
        }
        return false;
    }
}
