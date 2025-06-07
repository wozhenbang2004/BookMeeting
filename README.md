# 🎨 动漫风格会议室预订系统

一个集**企业级功能**与**动漫风格UI**于一体的现代化会议室预订系统，基于Spring Boot构建。

![动漫风格](https://img.shields.io/badge/风格-动漫-ff69b4) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.5-brightgreen) ![Java](https://img.shields.io/badge/Java-11-orange) ![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ 系统特色

### 🏢 核心业务功能
- **三角色管理**：管理员、员工、客户完整权限体系
- **智能预订**：实时查询、冲突检测、自动锁定
- **灵活取消**：72h/48h/24h阶梯式退款政策
- **状态管理**：空闲/锁定/已预订/使用中/维护
- **时间轴视图**：可视化会议室使用情况
- **设备管理**：投影仪、音响、网络等设备配置

### 🎮 动漫风格UI
- **自定义鼠标**：粉色渐变鼠标 + ✨装饰效果
- **鼠标轨迹**：移动时的粉色光点轨迹
- **点击特效**：波纹扩散 + 星星爆炸动画
- **动漫配色**：6种角色主题渐变配色方案
- **魔法动画**：卡片悬停发光、光环脉冲效果
- **动态背景**：三色渐变 + 智能自动轮换

### 🖼️ 智能图片系统
- **零配置使用**：放入图片即可自动应用
- **智能检测**：自动识别背景图/装饰图
- **角色专属背景**：管理员/员工/客户专属背景
- **装饰图布局**：10张anime图片左右对称显示
- **自动轮换**：2分钟智能背景切换

### 👥 沉浸式角色系统
- **二级账号切换**：角色分类 → 具体账号
- **动漫角色主题**：
  - 🎀 **艾莉丝** (管理员) - 粉色系
  - 🌸 **小樱** (员工) - 蓝色系
  - 🎵 **凛音** (客户) - 绿色系

## 🚀 快速开始

### 环境要求
- Java 11+
- Maven 3.6+
- MySQL 8.0+
- 现代浏览器 (Chrome/Firefox/Safari)

### 安装步骤

1. **克隆项目**
```bash
git clone [repository-url]
cd meeting
```

2. **数据库配置**
```sql
-- 创建数据库
CREATE DATABASE meeting_booking DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 执行初始化脚本
mysql -u root -p meeting_booking < src/main/resources/sql/init.sql
```

3. **配置文件**
```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/meeting_booking
spring.datasource.username=your_username
spring.datasource.password=your_password
```

4. **启动应用**
```bash
mvn clean compile
mvn spring-boot:run
```

5. **访问系统**
- 🎨 **动漫风格界面**：`http://localhost:8080/modern-ui.html`

### 🎨 个性化配置

#### 添加动漫图片
1. 在 `src/main/resources/static/` 下创建 `images` 文件夹
2. 添加你的动漫图片：

```
images/
├── bg-main.jpg        # 主背景
├── bg-admin.jpg       # 管理员背景
├── bg-employee.jpg    # 员工背景
├── bg-customer.jpg    # 客户背景
├── anime-1.jpg        # 装饰图1 (左侧)
├── anime-2.jpg        # 装饰图2 (右侧)
├── anime-3.jpg        # 装饰图3 (左侧)
├── anime-4.jpg        # 装饰图4 (右侧)
├── anime-5.jpg        # 装饰图5 (左侧)
├── anime-6.jpg        # 装饰图6 (右侧)
├── anime-7.jpg        # 装饰图7 (左侧)
├── anime-8.jpg        # 装饰图8 (右侧)
├── anime-9.jpg        # 装饰图9 (左侧)
└── anime-10.jpg       # 装饰图10 (右侧)
```

3. **支持格式**：JPG、PNG、GIF、WebP
4. **推荐尺寸**：背景图1920x1080，装饰图500x500

## 🎯 功能详解

### 管理员功能 🎀
- **用户管理**：查看所有用户、审核待审用户
- **会议室管理**：增删改查、设备配置、状态管理
- **系统统计**：实时数据统计、使用情况分析
- **时间轴魔法**：可视化管理所有预订

### 员工功能 🌸
- **预订管理**：创建、查看、修改预订
- **会议室状态**：实时查看可用性
- **时间轴视图**：个人预订时间线

### 客户功能 🎵
- **搜索预订**：智能搜索可用会议室
- **我的预订**：查看个人预订历史
- **取消申请**：在线提交取消请求

## 👤 默认测试账号

| 角色 | 用户名 | 密码 | 主题色 |
|------|--------|------|--------|
| 🎀 管理员 | admin | admin123 | 粉色系 |
| 🌸 员工 | employee | emp123 | 蓝色系 |
| 🎵 客户 | customer | cust123 | 绿色系 |

## 🛠️ 技术架构

### 后端技术栈
- **Spring Boot 2.7.5**：核心框架
- **MyBatis 2.2.2**：数据持久化
- **MySQL 8.0+**：关系型数据库
- **Maven**：项目管理

### 前端技术栈
- **HTML5 + CSS3**：现代化布局
- **JavaScript ES6+**：交互逻辑
- **CSS3 Animation**：动画效果
- **Responsive Design**：响应式设计

### 核心特性
- **RESTful API**：标准化接口设计
- **实时状态同步**：定时任务支持
- **异步图片处理**：智能检测系统
- **模块化设计**：高内聚低耦合

## API 接口

### 用户相关
- `POST /api/user/register` - 用户注册
- `POST /api/user/login` - 用户登录
- `GET /api/user/pending` - 获取待审核用户
- `POST /api/user/approve/{userId}` - 审核用户

### 会议室相关
- `GET /api/room/all` - 获取所有会议室
- `GET /api/room/search` - 搜索可用会议室
- `POST /api/room/add` - 添加会议室
- `POST /api/room/status/{roomId}` - 更新会议室状态

### 预订相关
- `POST /api/booking/create` - 创建预订
- `POST /api/booking/pay/{bookingId}` - 支付预订
- `GET /api/booking/customer/{customerId}` - 获取客户预订

### 取消申请相关
- `GET /api/cancellation/rules` - 获取退费规则
- `POST /api/cancellation/submit` - 提交取消申请
- `POST /api/cancellation/review/{requestId}` - 审核取消申请

## 业务规则

### 会议室使用时间
- 营业时间：每日 8:00 - 21:00
- 预订时间单位：小时
- 最大提前预订：60天

### 支付规则
- 预订后30分钟内必须完成支付
- 超时未支付的预订将自动取消

### 取消规则
- 提前72小时以上：退全款（100%）
- 提前48-72小时：退75%
- 提前24-48小时：退25%
- 提前不足24小时：不可取消

## 系统架构

```
meeting/
├── src/main/java/com/oi/meeting/
│   ├── controller/          # 控制器层
│   ├── service/            # 业务逻辑层
│   ├── mapper/             # 数据访问层
│   ├── entity/             # 实体类
│   ├── common/             # 公共类
│   ├── task/               # 定时任务
│   └── MeetingApplication.java
├── src/main/resources/
│   ├── mapper/             # MyBatis映射文件
│   ├── static/             # 静态资源
│   ├── sql/                # 数据库脚本
│   └── application.properties
└── pom.xml
```

## 开发说明

### 添加新功能
1. 在对应的包中添加新的类
2. 遵循现有的代码结构和命名规范
3. 添加适当的注释和文档

### 数据库变更
1. 修改实体类
2. 更新Mapper接口和XML文件
3. 更新数据库初始化脚本

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查MySQL服务是否启动
   - 验证数据库连接配置
   - 确认数据库用户权限

2. **端口冲突**
   - 修改 `application.properties` 中的 `server.port`

3. **Maven依赖问题**
   - 执行 `mvn clean install`
   - 检查网络连接

## 🎉 特色功能展示

### 🖱️ 自定义鼠标特效
- 粉色渐变鼠标指针
- 移动轨迹光点效果
- 点击波纹 + 星星爆炸

### 🎨 动漫风格配色
- 管理员：粉色渐变 (艾莉丝主题)
- 员工：蓝色渐变 (小樱主题)
- 客户：绿色渐变 (凛音主题)

### 🖼️ 智能图片系统
- 自动检测用户图片
- 智能分类背景/装饰图
- 完美对称布局显示

## 🚨 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查MySQL服务状态
   - 验证连接配置信息
   - 确认用户权限设置

2. **图片不显示**
   - 确认images文件夹存在
   - 检查图片格式是否支持
   - 验证文件命名规范

3. **动画效果异常**
   - 使用现代浏览器
   - 检查JavaScript控制台
   - 清除浏览器缓存

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发规范
- 遵循阿里巴巴Java开发手册
- 前端代码使用ES6+语法
- 提交信息使用中文描述

### 问题反馈
- Bug报告：请详细描述复现步骤
- 功能建议：欢迎提出改进意见
- UI优化：动漫风格相关建议

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情


