package com.oi.meeting.service;

import com.oi.meeting.entity.MeetingRoom;
import com.oi.meeting.entity.Booking;
import com.oi.meeting.mapper.MeetingRoomMapper;
import com.oi.meeting.mapper.BookingMapper;
import com.oi.meeting.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@Service
public class MeetingRoomService {

    @Autowired
    private MeetingRoomMapper meetingRoomMapper;

    @Autowired
    private BookingMapper bookingMapper;
    
    /**
     * 添加会议室
     */
    public boolean addRoom(MeetingRoom room) {
        room.setStatus(Constants.ROOM_STATUS_AVAILABLE);
        return meetingRoomMapper.insert(room) > 0;
    }
    
    /**
     * 更新会议室信息
     */
    public boolean updateRoom(MeetingRoom room) {
        return meetingRoomMapper.updateById(room) > 0;
    }
    
    /**
     * 删除会议室
     */
    public boolean deleteRoom(Long id) {
        return meetingRoomMapper.deleteById(id) > 0;
    }
    
    /**
     * 获取所有会议室
     */
    public List<MeetingRoom> getAllRooms() {
        return meetingRoomMapper.selectAll();
    }
    
    /**
     * 根据ID获取会议室
     */
    public MeetingRoom getRoomById(Long id) {
        return meetingRoomMapper.selectById(id);
    }
    
    /**
     * 更新会议室状态
     */
    public boolean updateRoomStatus(Long id, String status) {
        return meetingRoomMapper.updateStatus(id, status) > 0;
    }
    
    /**
     * 搜索可用会议室
     */
    public List<MeetingRoom> searchAvailableRooms(LocalDateTime startTime, LocalDateTime endTime,
                                                  Integer capacity, Boolean needProjector,
                                                  Boolean needSound, Boolean needNetwork) {
        return meetingRoomMapper.selectAvailableRooms(startTime, endTime, capacity, 
                                                     needProjector, needSound, needNetwork);
    }
    
    /**
     * 锁定会议室
     */
    public boolean lockRoom(Long roomId) {
        return meetingRoomMapper.updateStatus(roomId, Constants.ROOM_STATUS_LOCKED) > 0;
    }
    
    /**
     * 预订会议室
     */
    public boolean bookRoom(Long roomId) {
        return meetingRoomMapper.updateStatus(roomId, Constants.ROOM_STATUS_BOOKED) > 0;
    }
    
    /**
     * 释放会议室（变为可用状态）
     */
    public boolean releaseRoom(Long roomId) {
        return meetingRoomMapper.updateStatus(roomId, Constants.ROOM_STATUS_AVAILABLE) > 0;
    }
    
    /**
     * 设置会议室为使用中
     */
    public boolean setRoomInUse(Long roomId) {
        return meetingRoomMapper.updateStatus(roomId, Constants.ROOM_STATUS_IN_USE) > 0;
    }
    
    /**
     * 设置会议室为维护状态
     */
    public boolean setRoomMaintenance(Long roomId) {
        return meetingRoomMapper.updateStatus(roomId, Constants.ROOM_STATUS_MAINTENANCE) > 0;
    }

    /**
     * 获取会议室在指定时间段的状态信息
     * 如果不指定时间段，则返回当前时刻的状态
     */
    public List<Map<String, Object>> getRoomStatusInPeriod(LocalDateTime startTime, LocalDateTime endTime) {
        List<MeetingRoom> allRooms = meetingRoomMapper.selectAll();
        List<Map<String, Object>> result = new ArrayList<>();

        LocalDateTime now = LocalDateTime.now();

        for (MeetingRoom room : allRooms) {
            Map<String, Object> roomInfo = new HashMap<>();
            roomInfo.put("id", room.getId());
            roomInfo.put("name", room.getName());
            roomInfo.put("type", room.getType());
            roomInfo.put("capacity", room.getCapacity());
            roomInfo.put("hasProjector", room.getHasProjector());
            roomInfo.put("hasSound", room.getHasSound());
            roomInfo.put("hasNetwork", room.getHasNetwork());
            roomInfo.put("pricePerHour", room.getPricePerHour());
            roomInfo.put("baseStatus", room.getStatus()); // 会议室基础状态（维护等）

            if (startTime == null || endTime == null) {
                // 默认模式：显示当前时刻的实时状态
                String currentStatus = getCurrentRoomStatus(room, now);
                roomInfo.put("currentStatus", currentStatus);
                roomInfo.put("statusDescription", getStatusDescription(currentStatus));
            } else {
                // 时间段模式：显示指定时间段的状态和冲突信息
                Map<String, Object> periodStatus = getRoomStatusInSpecificPeriod(room, startTime, endTime);
                roomInfo.putAll(periodStatus);
            }

            result.add(roomInfo);
        }

        return result;
    }

    /**
     * 获取会议室在当前时刻的实时状态
     */
    private String getCurrentRoomStatus(MeetingRoom room, LocalDateTime now) {
        // 如果会议室本身是维护状态，直接返回
        if (Constants.ROOM_STATUS_MAINTENANCE.equals(room.getStatus())) {
            return Constants.ROOM_STATUS_MAINTENANCE;
        }

        // 检查当前时刻是否有正在进行的预订
        List<Booking> currentBookings = bookingMapper.selectConflictBookings(
            room.getId(), now, now.plusMinutes(1));

        if (!currentBookings.isEmpty()) {
            // 有正在进行的预订，检查预订状态
            Booking currentBooking = currentBookings.get(0);
            if (Constants.BOOKING_STATUS_PAID.equals(currentBooking.getStatus())) {
                // 检查是否在使用时间内
                if (now.isAfter(currentBooking.getStartTime()) && now.isBefore(currentBooking.getEndTime())) {
                    return Constants.ROOM_STATUS_IN_USE;
                } else if (now.isBefore(currentBooking.getStartTime())) {
                    return Constants.ROOM_STATUS_BOOKED;
                }
            } else if (Constants.BOOKING_STATUS_LOCKED.equals(currentBooking.getStatus())) {
                return Constants.ROOM_STATUS_LOCKED;
            }
        }

        return Constants.ROOM_STATUS_AVAILABLE;
    }

    /**
     * 获取会议室在指定时间段的状态信息
     */
    private Map<String, Object> getRoomStatusInSpecificPeriod(MeetingRoom room, LocalDateTime startTime, LocalDateTime endTime) {
        Map<String, Object> result = new HashMap<>();

        // 如果会议室本身是维护状态
        if (Constants.ROOM_STATUS_MAINTENANCE.equals(room.getStatus())) {
            result.put("periodStatus", Constants.ROOM_STATUS_MAINTENANCE);
            result.put("statusDescription", "会议室维护中，无法预订");
            result.put("conflicts", new ArrayList<>());
            return result;
        }

        // 查找与指定时间段有冲突的预订
        List<Booking> conflictBookings = bookingMapper.selectConflictBookings(
            room.getId(), startTime, endTime);

        // 过滤有效的预订（已支付或锁定中）
        List<Booking> validConflicts = conflictBookings.stream()
            .filter(booking -> Constants.BOOKING_STATUS_PAID.equals(booking.getStatus())
                            || Constants.BOOKING_STATUS_LOCKED.equals(booking.getStatus()))
            .collect(java.util.stream.Collectors.toList());

        // 计算时间段状态和详细描述
        String periodStatus;
        String statusDescription;

        if (validConflicts.isEmpty()) {
            periodStatus = Constants.ROOM_STATUS_AVAILABLE;
            statusDescription = String.format("该时间段完全可用 (%s - %s)",
                formatDateTime(startTime), formatDateTime(endTime));
        } else {
            // 计算冲突时间的总时长
            long totalConflictMinutes = validConflicts.stream()
                .mapToLong(booking -> {
                    LocalDateTime conflictStart = booking.getStartTime().isBefore(startTime) ? startTime : booking.getStartTime();
                    LocalDateTime conflictEnd = booking.getEndTime().isAfter(endTime) ? endTime : booking.getEndTime();
                    return java.time.Duration.between(conflictStart, conflictEnd).toMinutes();
                })
                .sum();

            long totalPeriodMinutes = java.time.Duration.between(startTime, endTime).toMinutes();
            double conflictPercentage = (double) totalConflictMinutes / totalPeriodMinutes * 100;

            if (conflictPercentage >= 100) {
                periodStatus = "FULLY_OCCUPIED";
                statusDescription = String.format("该时间段完全被占用 (共%d个预订)", validConflicts.size());
            } else if (conflictPercentage >= 50) {
                periodStatus = "MOSTLY_OCCUPIED";
                statusDescription = String.format("该时间段大部分被占用 (%.1f%%, %d个预订)", conflictPercentage, validConflicts.size());
            } else {
                periodStatus = "PARTIALLY_OCCUPIED";
                statusDescription = String.format("该时间段部分被占用 (%.1f%%, %d个预订)", conflictPercentage, validConflicts.size());
            }
        }

        result.put("periodStatus", periodStatus);
        result.put("statusDescription", statusDescription);

        // 添加冲突详情，用于时间线显示
        List<Map<String, Object>> conflicts = new ArrayList<>();
        for (Booking booking : validConflicts) {
            Map<String, Object> conflict = new HashMap<>();
            conflict.put("bookingId", booking.getId());
            conflict.put("startTime", booking.getStartTime());
            conflict.put("endTime", booking.getEndTime());
            conflict.put("status", booking.getStatus());
            conflict.put("customerId", booking.getCustomerId());
            conflict.put("participantCount", booking.getParticipantCount());
            conflicts.add(conflict);
        }
        result.put("conflicts", conflicts);

        return result;
    }

    /**
     * 格式化日期时间
     */
    private String formatDateTime(LocalDateTime dateTime) {
        return dateTime.format(java.time.format.DateTimeFormatter.ofPattern("MM-dd HH:mm"));
    }

    /**
     * 获取状态描述
     */
    private String getStatusDescription(String status) {
        switch (status) {
            case Constants.ROOM_STATUS_AVAILABLE:
                return "空闲可用";
            case Constants.ROOM_STATUS_LOCKED:
                return "预订锁定中";
            case Constants.ROOM_STATUS_BOOKED:
                return "已预订";
            case Constants.ROOM_STATUS_IN_USE:
                return "使用中";
            case Constants.ROOM_STATUS_MAINTENANCE:
                return "维护中";
            default:
                return status;
        }
    }
}
