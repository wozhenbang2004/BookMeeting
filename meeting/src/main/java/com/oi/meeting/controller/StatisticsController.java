package com.oi.meeting.controller;

import com.oi.meeting.common.Result;
import com.oi.meeting.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin
public class StatisticsController {
    
    @Autowired
    private StatisticsService statisticsService;
    
    /**
     * 获取系统总体统计信息（管理员功能）
     */
    @GetMapping("/system")
    public Result<Map<String, Object>> getSystemStatistics() {
        try {
            Map<String, Object> stats = statisticsService.getSystemStatistics();
            return Result.success(stats);
        } catch (Exception e) {
            return Result.error("获取系统统计信息失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取今日统计信息（管理员功能）
     */
    @GetMapping("/today")
    public Result<Map<String, Object>> getTodayStatistics() {
        try {
            Map<String, Object> stats = statisticsService.getTodayStatistics();
            return Result.success(stats);
        } catch (Exception e) {
            return Result.error("获取今日统计信息失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取会议室使用率统计（管理员功能）
     */
    @GetMapping("/room-usage")
    public Result<Map<String, Object>> getRoomUsageStatistics() {
        try {
            Map<String, Object> stats = statisticsService.getRoomUsageStatistics();
            return Result.success(stats);
        } catch (Exception e) {
            return Result.error("获取会议室使用率统计失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取用户活跃度统计（管理员功能）
     */
    @GetMapping("/user-activity")
    public Result<Map<String, Object>> getUserActivityStatistics() {
        try {
            Map<String, Object> stats = statisticsService.getUserActivityStatistics();
            return Result.success(stats);
        } catch (Exception e) {
            return Result.error("获取用户活跃度统计失败：" + e.getMessage());
        }
    }
}
