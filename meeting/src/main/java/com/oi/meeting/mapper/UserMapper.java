package com.oi.meeting.mapper;

import com.oi.meeting.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface UserMapper {
    
    int insert(User user);
    
    int updateById(User user);
    
    int deleteById(Long id);
    
    User selectById(Long id);
    
    User selectByUsername(String username);
    
    List<User> selectByRole(String role);
    
    List<User> selectByStatus(String status);
    
    List<User> selectAll();
    
    int updateStatus(@Param("id") Long id, @Param("status") String status);
}
