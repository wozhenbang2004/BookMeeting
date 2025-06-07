package com.oi.meeting.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class User {
    private Long id;
    private String username;
    private String password;
    private String name;
    private String role; // ADMIN, EMPLOYEE, CUSTOMER
    private String company; // 客户所属公司
    private String phone; // 客户联系电话
    private String status; // PENDING, ACTIVE, FROZEN
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
