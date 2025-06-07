package com.oi.meeting.controller;

import com.oi.meeting.common.Result;
import com.oi.meeting.entity.Booking;
import com.oi.meeting.dto.BookingCreateRequest;
import com.oi.meeting.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    /**
     * 创建预订（客户功能）
     */
    @PostMapping("/create")
    public Result<String> createBooking(@RequestBody BookingCreateRequest request) {
        try {
            // 将DTO转换为实体
            Booking booking = new Booking();
            booking.setCustomerId(request.getCustomerId());
            booking.setRoomId(request.getRoomId());
            booking.setStartTime(request.getStartTime());
            booking.setEndTime(request.getEndTime());
            booking.setParticipantCount(request.getParticipantCount());
            booking.setNeedProjector(request.getNeedProjector());
            booking.setNeedSound(request.getNeedSound());
            booking.setNeedNetwork(request.getNeedNetwork());

            String result = bookingService.createBooking(booking);
            if (result == null) {
                return Result.success("预订创建成功，请在30分钟内完成支付");
            } else {
                return Result.error(result);
            }
        } catch (Exception e) {
            return Result.error("预订创建失败：" + e.getMessage());
        }
    }
    
    /**
     * 支付预订（客户功能）
     */
    @PostMapping("/pay/{bookingId}")
    public Result<String> payBooking(@PathVariable Long bookingId) {
        try {
            if (bookingService.payBooking(bookingId)) {
                return Result.success("支付成功，预订完成");
            } else {
                return Result.error("支付失败，可能已超时或预订状态异常");
            }
        } catch (Exception e) {
            return Result.error("支付失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取客户的预订记录
     */
    @GetMapping("/customer/{customerId}")
    public Result<List<Booking>> getCustomerBookings(@PathVariable Long customerId) {
        try {
            List<Booking> bookings = bookingService.getCustomerBookings(customerId);
            return Result.success(bookings);
        } catch (Exception e) {
            return Result.error("获取预订记录失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取可取消的预订
     */
    @GetMapping("/cancellable/{customerId}")
    public Result<List<Booking>> getCancellableBookings(@PathVariable Long customerId) {
        try {
            List<Booking> bookings = bookingService.getCancellableBookings(customerId);
            return Result.success(bookings);
        } catch (Exception e) {
            return Result.error("获取可取消预订失败：" + e.getMessage());
        }
    }
    
    /**
     * 根据ID获取预订详情
     */
    @GetMapping("/{bookingId}")
    public Result<Booking> getBookingById(@PathVariable Long bookingId) {
        try {
            Booking booking = bookingService.getBookingById(bookingId);
            if (booking != null) {
                return Result.success(booking);
            } else {
                return Result.error("预订不存在");
            }
        } catch (Exception e) {
            return Result.error("获取预订详情失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取所有预订（管理员/员工功能）
     */
    @GetMapping("/all")
    public Result<List<Booking>> getAllBookings() {
        try {
            List<Booking> bookings = bookingService.getAllBookings();
            return Result.success(bookings);
        } catch (Exception e) {
            return Result.error("获取预订列表失败：" + e.getMessage());
        }
    }
    
    /**
     * 完成预订（员工功能）
     */
    @PostMapping("/complete/{bookingId}")
    public Result<String> completeBooking(@PathVariable Long bookingId) {
        try {
            if (bookingService.completeBooking(bookingId)) {
                return Result.success("预订已完成");
            } else {
                return Result.error("完成预订失败");
            }
        } catch (Exception e) {
            return Result.error("完成预订失败：" + e.getMessage());
        }
    }
    
    /**
     * 处理超时预订（系统功能）
     */
    @PostMapping("/handle-expired")
    public Result<String> handleExpiredBookings() {
        try {
            bookingService.handleExpiredBookings();
            return Result.success("超时预订处理完成");
        } catch (Exception e) {
            return Result.error("处理超时预订失败：" + e.getMessage());
        }
    }
}
