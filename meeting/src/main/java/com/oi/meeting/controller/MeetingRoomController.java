package com.oi.meeting.controller;

import com.oi.meeting.common.Result;
import com.oi.meeting.entity.MeetingRoom;
import com.oi.meeting.service.MeetingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/room")
@CrossOrigin
public class MeetingRoomController {
    
    @Autowired
    private MeetingRoomService meetingRoomService;
    
    /**
     * 添加会议室（管理员功能）
     */
    @PostMapping("/add")
    public Result<String> addRoom(@RequestBody MeetingRoom room) {
        try {
            if (meetingRoomService.addRoom(room)) {
                return Result.success("会议室添加成功");
            } else {
                return Result.error("会议室添加失败");
            }
        } catch (Exception e) {
            return Result.error("添加失败：" + e.getMessage());
        }
    }
    
    /**
     * 更新会议室信息（管理员功能）
     */
    @PutMapping("/update")
    public Result<String> updateRoom(@RequestBody MeetingRoom room) {
        try {
            if (meetingRoomService.updateRoom(room)) {
                return Result.success("会议室信息更新成功");
            } else {
                return Result.error("会议室信息更新失败");
            }
        } catch (Exception e) {
            return Result.error("更新失败：" + e.getMessage());
        }
    }
    
    /**
     * 删除会议室（管理员功能）
     */
    @DeleteMapping("/delete/{roomId}")
    public Result<String> deleteRoom(@PathVariable Long roomId) {
        try {
            if (meetingRoomService.deleteRoom(roomId)) {
                return Result.success("会议室删除成功");
            } else {
                return Result.error("会议室删除失败");
            }
        } catch (Exception e) {
            return Result.error("删除失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取所有会议室
     */
    @GetMapping("/all")
    public Result<List<MeetingRoom>> getAllRooms() {
        try {
            List<MeetingRoom> rooms = meetingRoomService.getAllRooms();
            return Result.success(rooms);
        } catch (Exception e) {
            return Result.error("获取会议室列表失败：" + e.getMessage());
        }
    }

    /**
     * 获取会议室在指定时间段的状态信息
     */
    @GetMapping("/status-in-period")
    public Result<List<Map<String, Object>>> getRoomStatusInPeriod(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {
        try {
            List<Map<String, Object>> roomsWithStatus = meetingRoomService.getRoomStatusInPeriod(startTime, endTime);
            return Result.success(roomsWithStatus);
        } catch (Exception e) {
            return Result.error("获取会议室状态失败：" + e.getMessage());
        }
    }
    
    /**
     * 根据ID获取会议室
     */
    @GetMapping("/{roomId}")
    public Result<MeetingRoom> getRoomById(@PathVariable Long roomId) {
        try {
            MeetingRoom room = meetingRoomService.getRoomById(roomId);
            if (room != null) {
                return Result.success(room);
            } else {
                return Result.error("会议室不存在");
            }
        } catch (Exception e) {
            return Result.error("获取会议室信息失败：" + e.getMessage());
        }
    }
    
    /**
     * 搜索可用会议室
     */
    @GetMapping("/search")
    public Result<List<MeetingRoom>> searchAvailableRooms(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) Boolean needProjector,
            @RequestParam(required = false) Boolean needSound,
            @RequestParam(required = false) Boolean needNetwork) {
        try {
            List<MeetingRoom> rooms = meetingRoomService.searchAvailableRooms(
                startTime, endTime, capacity, needProjector, needSound, needNetwork);
            return Result.success(rooms);
        } catch (Exception e) {
            return Result.error("搜索会议室失败：" + e.getMessage());
        }
    }
    
    /**
     * 更新会议室状态（员工功能）
     */
    @PostMapping("/status/{roomId}")
    public Result<String> updateRoomStatus(@PathVariable Long roomId, @RequestParam String status) {
        try {
            if (meetingRoomService.updateRoomStatus(roomId, status)) {
                return Result.success("会议室状态更新成功");
            } else {
                return Result.error("会议室状态更新失败");
            }
        } catch (Exception e) {
            return Result.error("状态更新失败：" + e.getMessage());
        }
    }
    
    /**
     * 设置会议室为使用中（员工功能）
     */
    @PostMapping("/in-use/{roomId}")
    public Result<String> setRoomInUse(@PathVariable Long roomId) {
        try {
            if (meetingRoomService.setRoomInUse(roomId)) {
                return Result.success("会议室已设置为使用中");
            } else {
                return Result.error("设置失败");
            }
        } catch (Exception e) {
            return Result.error("设置失败：" + e.getMessage());
        }
    }
    
    /**
     * 设置会议室为维护状态（员工功能）
     */
    @PostMapping("/maintenance/{roomId}")
    public Result<String> setRoomMaintenance(@PathVariable Long roomId) {
        try {
            if (meetingRoomService.setRoomMaintenance(roomId)) {
                return Result.success("会议室已设置为维护状态");
            } else {
                return Result.error("设置失败");
            }
        } catch (Exception e) {
            return Result.error("设置失败：" + e.getMessage());
        }
    }
    
    /**
     * 释放会议室（员工功能）
     */
    @PostMapping("/release/{roomId}")
    public Result<String> releaseRoom(@PathVariable Long roomId) {
        try {
            if (meetingRoomService.releaseRoom(roomId)) {
                return Result.success("会议室已释放");
            } else {
                return Result.error("释放失败");
            }
        } catch (Exception e) {
            return Result.error("释放失败：" + e.getMessage());
        }
    }
}
