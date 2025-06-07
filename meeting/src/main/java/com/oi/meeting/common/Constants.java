package com.oi.meeting.common;

public class Constants {
    
    // 用户角色
    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_EMPLOYEE = "EMPLOYEE";
    public static final String ROLE_CUSTOMER = "CUSTOMER";
    
    // 用户状态
    public static final String USER_STATUS_PENDING = "PENDING";
    public static final String USER_STATUS_ACTIVE = "ACTIVE";
    public static final String USER_STATUS_FROZEN = "FROZEN";
    
    // 会议室类型
    public static final String ROOM_TYPE_CLASSROOM = "CLASSROOM";
    public static final String ROOM_TYPE_ROUNDTABLE = "ROUNDTABLE";
    
    // 会议室状态
    public static final String ROOM_STATUS_AVAILABLE = "AVAILABLE";
    public static final String ROOM_STATUS_LOCKED = "LOCKED";
    public static final String ROOM_STATUS_BOOKED = "BOOKED";
    public static final String ROOM_STATUS_IN_USE = "IN_USE";
    public static final String ROOM_STATUS_MAINTENANCE = "MAINTENANCE";
    
    // 预订状态
    public static final String BOOKING_STATUS_LOCKED = "LOCKED";
    public static final String BOOKING_STATUS_PAID = "PAID";
    public static final String BOOKING_STATUS_CANCELLED = "CANCELLED";
    public static final String BOOKING_STATUS_COMPLETED = "COMPLETED";
    
    // 取消申请状态
    public static final String CANCEL_STATUS_PENDING = "PENDING";
    public static final String CANCEL_STATUS_APPROVED = "APPROVED";
    public static final String CANCEL_STATUS_REJECTED = "REJECTED";
    
    // 时间常量
    public static final int PAYMENT_TIMEOUT_MINUTES = 30; // 支付超时时间（分钟）
    public static final int MAX_ADVANCE_DAYS = 60; // 最大提前预订天数
    public static final int MIN_CANCEL_HOURS = 24; // 最小取消提前时间（小时）

    // 退款比例
    public static final double REFUND_RATE_72H = 1.0; // 提前72小时退全款
    public static final double REFUND_RATE_48H = 0.75; // 提前48小时退75%
    public static final double REFUND_RATE_24H = 0.25; // 提前24小时退25%
    
    // 营业时间
    public static final int BUSINESS_START_HOUR = 8; // 营业开始时间
    public static final int BUSINESS_END_HOUR = 21; // 营业结束时间
}
