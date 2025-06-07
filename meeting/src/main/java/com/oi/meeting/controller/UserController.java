package com.oi.meeting.controller;

import com.oi.meeting.common.Result;
import com.oi.meeting.entity.User;
import com.oi.meeting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * 用户注册
     */
    @PostMapping("/register")
    public Result<String> register(@RequestBody User user) {
        try {
            if (userService.register(user)) {
                // 根据用户角色返回不同的提示信息
                if ("ADMIN".equals(user.getRole())) {
                    return Result.success("管理员注册成功，请等待现有管理员审核");
                } else if ("EMPLOYEE".equals(user.getRole())) {
                    return Result.success("员工注册成功，请等待管理员审核");
                } else {
                    return Result.success("客户注册成功，请等待管理员审核");
                }
            } else {
                return Result.error("注册失败，用户名已存在");
            }
        } catch (Exception e) {
            return Result.error("注册失败：" + e.getMessage());
        }
    }
    
    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Result<User> login(@RequestBody User loginUser) {
        try {
            User user = userService.login(loginUser.getUsername(), loginUser.getPassword());
            if (user != null) {
                // 不返回密码
                user.setPassword(null);
                return Result.success("登录成功", user);
            } else {
                return Result.error("用户名或密码错误，或账号未激活");
            }
        } catch (Exception e) {
            return Result.error("登录失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取待审核的用户列表（管理员功能）
     */
    @GetMapping("/pending")
    public Result<List<User>> getPendingUsers() {
        try {
            List<User> users = userService.getPendingUsers();
            // 不返回密码
            users.forEach(user -> user.setPassword(null));
            return Result.success(users);
        } catch (Exception e) {
            return Result.error("获取待审核用户失败：" + e.getMessage());
        }
    }
    
    /**
     * 审核用户（管理员功能）
     */
    @PostMapping("/approve/{userId}")
    public Result<String> approveUser(@PathVariable Long userId) {
        try {
            if (userService.approveUser(userId)) {
                return Result.success("用户审核通过");
            } else {
                return Result.error("审核失败");
            }
        } catch (Exception e) {
            return Result.error("审核失败：" + e.getMessage());
        }
    }
    
    /**
     * 冻结用户（管理员功能）
     */
    @PostMapping("/freeze/{userId}")
    public Result<String> freezeUser(@PathVariable Long userId) {
        try {
            if (userService.freezeUser(userId)) {
                return Result.success("用户已冻结");
            } else {
                return Result.error("冻结失败");
            }
        } catch (Exception e) {
            return Result.error("冻结失败：" + e.getMessage());
        }
    }
    
    /**
     * 解冻用户（管理员功能）
     */
    @PostMapping("/unfreeze/{userId}")
    public Result<String> unfreezeUser(@PathVariable Long userId) {
        try {
            if (userService.unfreezeUser(userId)) {
                return Result.success("用户已解冻");
            } else {
                return Result.error("解冻失败");
            }
        } catch (Exception e) {
            return Result.error("解冻失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取所有用户（管理员功能）
     */
    @GetMapping("/all")
    public Result<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            // 不返回密码
            users.forEach(user -> user.setPassword(null));
            return Result.success(users);
        } catch (Exception e) {
            return Result.error("获取用户列表失败：" + e.getMessage());
        }
    }
    
    /**
     * 根据ID获取用户信息
     */
    @GetMapping("/{userId}")
    public Result<User> getUserById(@PathVariable Long userId) {
        try {
            User user = userService.getUserById(userId);
            if (user != null) {
                user.setPassword(null);
                return Result.success(user);
            } else {
                return Result.error("用户不存在");
            }
        } catch (Exception e) {
            return Result.error("获取用户信息失败：" + e.getMessage());
        }
    }

    /**
     * 删除用户（管理员功能 - 用于拒绝注册申请）
     */
    @DeleteMapping("/{userId}")
    public Result<String> deleteUser(@PathVariable Long userId) {
        try {
            if (userService.deleteUser(userId)) {
                return Result.success("用户已删除");
            } else {
                return Result.error("删除失败");
            }
        } catch (Exception e) {
            return Result.error("删除失败：" + e.getMessage());
        }
    }
}
