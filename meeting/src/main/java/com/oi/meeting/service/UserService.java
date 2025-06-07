package com.oi.meeting.service;

import com.oi.meeting.entity.User;
import com.oi.meeting.mapper.UserMapper;
import com.oi.meeting.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    /**
     * 用户注册
     */
    public boolean register(User user) {
        // 检查用户名是否已存在
        if (userMapper.selectByUsername(user.getUsername()) != null) {
            return false;
        }
        
        // 所有新注册用户都需要管理员审核，除了第一个管理员账号
        // 如果是管理员角色且系统中还没有其他管理员，则直接激活（用于初始化）
        if (Constants.ROLE_ADMIN.equals(user.getRole()) && isFirstAdmin()) {
            user.setStatus(Constants.USER_STATUS_ACTIVE);
        } else {
            // 所有其他用户（包括员工、客户、后续管理员）都需要审核
            user.setStatus(Constants.USER_STATUS_PENDING);
        }
        
        return userMapper.insert(user) > 0;
    }
    
    /**
     * 用户登录
     */
    public User login(String username, String password) {
        User user = userMapper.selectByUsername(username);
        if (user != null && password.equals(user.getPassword()) 
            && Constants.USER_STATUS_ACTIVE.equals(user.getStatus())) {
            return user;
        }
        return null;
    }
    
    /**
     * 获取待审核的用户（包括客户、员工、管理员）
     */
    public List<User> getPendingUsers() {
        return userMapper.selectByStatus(Constants.USER_STATUS_PENDING);
    }
    
    /**
     * 审核用户
     */
    public boolean approveUser(Long userId) {
        return userMapper.updateStatus(userId, Constants.USER_STATUS_ACTIVE) > 0;
    }
    
    /**
     * 冻结用户
     */
    public boolean freezeUser(Long userId) {
        return userMapper.updateStatus(userId, Constants.USER_STATUS_FROZEN) > 0;
    }
    
    /**
     * 解冻用户
     */
    public boolean unfreezeUser(Long userId) {
        return userMapper.updateStatus(userId, Constants.USER_STATUS_ACTIVE) > 0;
    }
    
    /**
     * 获取所有用户
     */
    public List<User> getAllUsers() {
        return userMapper.selectAll();
    }
    
    /**
     * 根据ID获取用户
     */
    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }
    
    /**
     * 更新用户信息
     */
    public boolean updateUser(User user) {
        return userMapper.updateById(user) > 0;
    }
    
    /**
     * 删除用户
     */
    public boolean deleteUser(Long id) {
        return userMapper.deleteById(id) > 0;
    }

    /**
     * 检查是否为第一个管理员（用于系统初始化）
     */
    private boolean isFirstAdmin() {
        List<User> allUsers = userMapper.selectAll();
        // 如果系统中没有任何用户，或者没有激活的管理员，则允许第一个管理员直接激活
        return allUsers.isEmpty() ||
               allUsers.stream().noneMatch(u -> Constants.ROLE_ADMIN.equals(u.getRole()) &&
                                              Constants.USER_STATUS_ACTIVE.equals(u.getStatus()));
    }
}
