package com.oi.meeting.mapper;

import com.oi.meeting.entity.MeetingRoom;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface MeetingRoomMapper {
    
    int insert(MeetingRoom room);
    
    int updateById(MeetingRoom room);
    
    int deleteById(Long id);
    
    MeetingRoom selectById(Long id);
    
    List<MeetingRoom> selectAll();
    
    List<MeetingRoom> selectByStatus(String status);
    
    int updateStatus(@Param("id") Long id, @Param("status") String status);
    
    List<MeetingRoom> selectAvailableRooms(@Param("startTime") LocalDateTime startTime, 
                                          @Param("endTime") LocalDateTime endTime,
                                          @Param("capacity") Integer capacity,
                                          @Param("needProjector") Boolean needProjector,
                                          @Param("needSound") Boolean needSound,
                                          @Param("needNetwork") Boolean needNetwork);
}
