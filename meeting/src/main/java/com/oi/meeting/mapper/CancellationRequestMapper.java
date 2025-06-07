package com.oi.meeting.mapper;

import com.oi.meeting.entity.CancellationRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface CancellationRequestMapper {
    
    int insert(CancellationRequest request);
    
    int updateById(CancellationRequest request);
    
    int deleteById(Long id);
    
    CancellationRequest selectById(Long id);
    
    List<CancellationRequest> selectByCustomerId(Long customerId);
    
    List<CancellationRequest> selectByStatus(String status);
    
    List<CancellationRequest> selectAll();
    
    int updateStatus(@Param("id") Long id, @Param("status") String status, 
                    @Param("reviewerId") Long reviewerId, @Param("reviewComment") String reviewComment);
    
    CancellationRequest selectByBookingId(Long bookingId);
}
