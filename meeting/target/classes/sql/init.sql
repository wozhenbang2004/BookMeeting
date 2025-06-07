-- 会议室预订系统数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS meeting_booking DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE meeting_booking;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    role ENUM('ADMIN', 'EMPLOYEE', 'CUSTOMER') NOT NULL COMMENT '角色',
    company VARCHAR(100) COMMENT '所属公司（客户）',
    phone VARCHAR(20) COMMENT '联系电话（客户）',
    status ENUM('PENDING', 'ACTIVE', 'FROZEN') NOT NULL DEFAULT 'PENDING' COMMENT '状态',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT '用户表';

-- 会议室表
CREATE TABLE IF NOT EXISTS meeting_rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '会议室名称',
    type ENUM('CLASSROOM', 'ROUNDTABLE') NOT NULL COMMENT '会议室类型',
    capacity INT NOT NULL COMMENT '座位数',
    has_projector BOOLEAN NOT NULL DEFAULT FALSE COMMENT '是否有投影仪',
    has_sound BOOLEAN NOT NULL DEFAULT FALSE COMMENT '是否有音响',
    has_network BOOLEAN NOT NULL DEFAULT FALSE COMMENT '是否有网络',
    price_per_hour DECIMAL(10,2) NOT NULL COMMENT '每小时价格',
    status ENUM('AVAILABLE', 'LOCKED', 'BOOKED', 'IN_USE', 'MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE' COMMENT '状态',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT '会议室表';

-- 预订表
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL COMMENT '客户ID',
    room_id BIGINT NOT NULL COMMENT '会议室ID',
    start_time DATETIME NOT NULL COMMENT '开始时间',
    end_time DATETIME NOT NULL COMMENT '结束时间',
    participant_count INT NOT NULL COMMENT '参会人数',
    need_projector BOOLEAN NOT NULL DEFAULT FALSE COMMENT '是否需要投影仪',
    need_sound BOOLEAN NOT NULL DEFAULT FALSE COMMENT '是否需要音响',
    need_network BOOLEAN NOT NULL DEFAULT FALSE COMMENT '是否需要网络',
    total_price DECIMAL(10,2) NOT NULL COMMENT '总价格',
    status ENUM('LOCKED', 'PAID', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'LOCKED' COMMENT '状态',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    payment_deadline DATETIME NOT NULL COMMENT '支付截止时间',
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES meeting_rooms(id)
) COMMENT '预订表';

-- 取消申请表
CREATE TABLE IF NOT EXISTS cancellation_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT NOT NULL COMMENT '预订ID',
    customer_id BIGINT NOT NULL COMMENT '客户ID',
    reason TEXT COMMENT '取消原因',
    refund_amount DECIMAL(10,2) NOT NULL COMMENT '退款金额',
    refund_rate DECIMAL(5,4) NOT NULL COMMENT '退款比例',
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING' COMMENT '状态',
    reviewer_id BIGINT COMMENT '审核员工ID',
    review_comment TEXT COMMENT '审核意见',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    review_time DATETIME COMMENT '审核时间',
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (reviewer_id) REFERENCES users(id)
) COMMENT '取消申请表';

-- 插入初始数据

-- 插入特色演示账号（直接激活，用于快速测试）
INSERT INTO users (username, password, name, role, status) VALUES
('admin', 'admin123', '艾莉丝·管理酱', 'ADMIN', 'ACTIVE'),
('employee', 'emp123', '小樱·工作娘', 'EMPLOYEE', 'ACTIVE');

-- 插入特色客户账号（包含公司和电话信息）
INSERT INTO users (username, password, name, role, company, phone, status) VALUES
('customer', 'cust123', '凛音·预订姬', 'CUSTOMER', '星光科技株式会社', '13800138000', 'ACTIVE');

-- 插入传统测试用户（需要管理员审核）
INSERT INTO users (username, password, name, role, status) VALUES
('admin_test', '123456', '系统管理员', 'ADMIN', 'PENDING'),
('employee1', '123456', '张员工', 'EMPLOYEE', 'PENDING'),
('employee2', '123456', '李员工', 'EMPLOYEE', 'PENDING');

-- 插入测试客户（需要管理员审核）
INSERT INTO users (username, password, name, role, company, phone, status) VALUES
('customer1', '123456', '王客户', 'CUSTOMER', '测试公司A', '13800138001', 'PENDING'),
('customer2', '123456', '刘客户', 'CUSTOMER', '测试公司B', '13800138002', 'PENDING');

-- 插入会议室数据
INSERT INTO meeting_rooms (name, type, capacity, has_projector, has_sound, has_network, price_per_hour, status) VALUES 
('大会议室301', 'CLASSROOM', 50, TRUE, TRUE, TRUE, 200.00, 'AVAILABLE'),
('圆桌会议室302', 'ROUNDTABLE', 12, TRUE, FALSE, TRUE, 150.00, 'AVAILABLE'),
('小会议室303', 'CLASSROOM', 20, FALSE, TRUE, TRUE, 100.00, 'AVAILABLE'),
('豪华会议室401', 'ROUNDTABLE', 30, TRUE, TRUE, TRUE, 300.00, 'AVAILABLE'),
('培训室402', 'CLASSROOM', 80, TRUE, TRUE, TRUE, 250.00, 'MAINTENANCE');

-- 创建索引
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_meeting_rooms_status ON meeting_rooms(status);
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_room_id ON bookings(room_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_time ON bookings(start_time, end_time);
CREATE INDEX idx_cancellation_requests_booking_id ON cancellation_requests(booking_id);
CREATE INDEX idx_cancellation_requests_customer_id ON cancellation_requests(customer_id);
CREATE INDEX idx_cancellation_requests_status ON cancellation_requests(status);
