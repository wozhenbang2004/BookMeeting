package com.oi.meeting.mapper;

import com.oi.meeting.entity.Booking;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface BookingMapper {
    
    int insert(Booking booking);
    
    int updateById(Booking booking);
    
    int deleteById(Long id);
    
    Booking selectById(Long id);
    
    List<Booking> selectByCustomerId(Long customerId);
    
    List<Booking> selectByRoomId(Long roomId);
    
    List<Booking> selectByStatus(String status);
    
    List<Booking> selectAll();
    
    int updateStatus(@Param("id") Long id, @Param("status") String status);
    
    List<Booking> selectExpiredBookings(@Param("deadline") LocalDateTime deadline);
    
    List<Booking> selectConflictBookings(@Param("roomId") Long roomId,
                                        @Param("startTime") LocalDateTime startTime,
                                        @Param("endTime") LocalDateTime endTime);

    List<Booking> selectBookingsToStart(@Param("currentTime") LocalDateTime currentTime);

    List<Booking> selectBookingsToEnd(@Param("currentTime") LocalDateTime currentTime);

    int deleteCompletedBookingsBefore(@Param("beforeTime") LocalDateTime beforeTime);

    List<Booking> selectBookingsBetween(@Param("startTime") LocalDateTime startTime,
                                       @Param("endTime") LocalDateTime endTime);

    List<Booking> selectPaidBookingsBetween(@Param("startTime") LocalDateTime startTime,
                                           @Param("endTime") LocalDateTime endTime);
    
    List<Booking> selectCancellableBookings(@Param("customerId") Long customerId,
                                           @Param("minCancelTime") LocalDateTime minCancelTime);
}
