package com.oi.meeting.service;

import com.oi.meeting.entity.Booking;
import com.oi.meeting.entity.CancellationRequest;
import com.oi.meeting.mapper.BookingMapper;
import com.oi.meeting.mapper.CancellationRequestMapper;
import com.oi.meeting.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class CancellationService {
    
    @Autowired
    private CancellationRequestMapper cancellationRequestMapper;
    
    @Autowired
    private BookingMapper bookingMapper;
    
    @Autowired
    private MeetingRoomService meetingRoomService;
    
    /**
     * 提交取消申请
     */
    @Transactional
    public String submitCancellationRequest(CancellationRequest request) {
        // 检查预订是否存在
        Booking booking = bookingMapper.selectById(request.getBookingId());
        if (booking == null) {
            return "预订不存在";
        }

        // 检查预订状态
        if (!Constants.BOOKING_STATUS_PAID.equals(booking.getStatus())) {
            return "只有已支付的预订才能申请取消，当前预订状态：" + getStatusText(booking.getStatus());
        }

        // 检查是否已经有取消申请
        CancellationRequest existing = cancellationRequestMapper.selectByBookingId(request.getBookingId());
        if (existing != null) {
            return "该预订已有取消申请，请勿重复提交";
        }

        // 计算退款比例和金额
        long hoursUntilStart = ChronoUnit.HOURS.between(LocalDateTime.now(), booking.getStartTime());
        double refundRate = calculateRefundRate(hoursUntilStart);

        if (refundRate <= 0) {
            return String.format("取消时间过晚，预订开始前需至少%d小时申请取消。当前距离预订开始还有%d小时",
                Constants.MIN_CANCEL_HOURS, hoursUntilStart);
        }

        BigDecimal refundAmount = booking.getTotalPrice().multiply(BigDecimal.valueOf(refundRate));

        request.setCustomerId(booking.getCustomerId());
        request.setRefundRate(BigDecimal.valueOf(refundRate));
        request.setRefundAmount(refundAmount);
        request.setStatus(Constants.CANCEL_STATUS_PENDING);

        boolean success = cancellationRequestMapper.insert(request) > 0;
        return success ? null : "系统错误，请稍后重试";
    }

    /**
     * 获取状态文本
     */
    private String getStatusText(String status) {
        switch (status) {
            case Constants.BOOKING_STATUS_LOCKED: return "待支付";
            case Constants.BOOKING_STATUS_PAID: return "已支付";
            case Constants.BOOKING_STATUS_CANCELLED: return "已取消";
            case Constants.BOOKING_STATUS_COMPLETED: return "已完成";
            default: return status;
        }
    }
    
    /**
     * 计算退款比例
     */
    private double calculateRefundRate(long hoursUntilStart) {
        if (hoursUntilStart >= 72) {
            return Constants.REFUND_RATE_72H; // 提前72小时退全款
        } else if (hoursUntilStart >= 48) {
            return Constants.REFUND_RATE_48H; // 提前48小时退75%
        } else if (hoursUntilStart >= 24) {
            return Constants.REFUND_RATE_24H; // 提前24小时退25%
        } else {
            return 0; // 不符合取消条件
        }
    }
    
    /**
     * 审核取消申请（员工功能）
     */
    @Transactional
    public boolean reviewCancellationRequest(Long requestId, String status, Long reviewerId, String reviewComment) {
        CancellationRequest request = cancellationRequestMapper.selectById(requestId);
        if (request == null || !Constants.CANCEL_STATUS_PENDING.equals(request.getStatus())) {
            return false;
        }
        
        // 更新取消申请状态
        int result = cancellationRequestMapper.updateStatus(requestId, status, reviewerId, reviewComment);
        
        if (result > 0 && Constants.CANCEL_STATUS_APPROVED.equals(status)) {
            // 如果审核通过，取消预订并释放会议室
            Booking booking = bookingMapper.selectById(request.getBookingId());
            if (booking != null) {
                bookingMapper.updateStatus(booking.getId(), Constants.BOOKING_STATUS_CANCELLED);
                meetingRoomService.releaseRoom(booking.getRoomId());
            }
        }
        
        return result > 0;
    }
    
    /**
     * 获取客户的取消申请
     */
    public List<CancellationRequest> getCustomerCancellationRequests(Long customerId) {
        return cancellationRequestMapper.selectByCustomerId(customerId);
    }
    
    /**
     * 获取待审核的取消申请
     */
    public List<CancellationRequest> getPendingCancellationRequests() {
        return cancellationRequestMapper.selectByStatus(Constants.CANCEL_STATUS_PENDING);
    }
    
    /**
     * 获取所有取消申请
     */
    public List<CancellationRequest> getAllCancellationRequests() {
        return cancellationRequestMapper.selectAll();
    }
    
    /**
     * 根据ID获取取消申请
     */
    public CancellationRequest getCancellationRequestById(Long id) {
        return cancellationRequestMapper.selectById(id);
    }
    
    /**
     * 获取退费规则说明
     */
    public String getRefundRules() {
        return "退费规则：\n" +
               "1. 提前72小时以上取消：退全款（100%）\n" +
               "2. 提前48-72小时取消：退75%\n" +
               "3. 提前24-48小时取消：退25%\n" +
               "4. 提前不足24小时：不可取消";
    }
}
