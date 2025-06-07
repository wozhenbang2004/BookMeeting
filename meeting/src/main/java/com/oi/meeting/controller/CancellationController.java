package com.oi.meeting.controller;

import com.oi.meeting.common.Constants;
import com.oi.meeting.common.Result;
import com.oi.meeting.entity.CancellationRequest;
import com.oi.meeting.service.CancellationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cancellation")
@CrossOrigin
public class CancellationController {
    
    @Autowired
    private CancellationService cancellationService;
    
    /**
     * 获取退费规则
     */
    @GetMapping("/rules")
    public Result<String> getRefundRules() {
        try {
            String rules = cancellationService.getRefundRules();
            return Result.success(rules);
        } catch (Exception e) {
            return Result.error("获取退费规则失败：" + e.getMessage());
        }
    }
    
    /**
     * 提交取消申请（客户功能）
     */
    @PostMapping("/submit")
    public Result<String> submitCancellationRequest(@RequestBody CancellationRequest request) {
        try {
            String errorMessage = cancellationService.submitCancellationRequest(request);
            if (errorMessage == null) {
                return Result.success("取消申请提交成功，请等待员工审核");
            } else {
                return Result.error(errorMessage);
            }
        } catch (Exception e) {
            return Result.error("提交取消申请失败：" + e.getMessage());
        }
    }
    
    /**
     * 审核取消申请（员工功能）
     */
    @PostMapping("/review/{requestId}")
    public Result<String> reviewCancellationRequest(
            @PathVariable Long requestId,
            @RequestBody ReviewRequest reviewRequest) {
        try {
            // 将approved转换为status
            String status = reviewRequest.isApproved() ? Constants.CANCEL_STATUS_APPROVED : Constants.CANCEL_STATUS_REJECTED;

            // 这里暂时使用固定的reviewerId，实际应该从登录用户获取
            Long reviewerId = 1L; // TODO: 从当前登录用户获取
            String reviewComment = reviewRequest.getReviewComment();

            if (cancellationService.reviewCancellationRequest(requestId, status, reviewerId, reviewComment)) {
                return Result.success("审核完成");
            } else {
                return Result.error("审核失败");
            }
        } catch (Exception e) {
            return Result.error("审核失败：" + e.getMessage());
        }
    }

    /**
     * 审核请求DTO
     */
    public static class ReviewRequest {
        private boolean approved;
        private String reviewComment;

        public boolean isApproved() {
            return approved;
        }

        public void setApproved(boolean approved) {
            this.approved = approved;
        }

        public String getReviewComment() {
            return reviewComment;
        }

        public void setReviewComment(String reviewComment) {
            this.reviewComment = reviewComment;
        }
    }
    
    /**
     * 获取客户的取消申请
     */
    @GetMapping("/customer/{customerId}")
    public Result<List<CancellationRequest>> getCustomerCancellationRequests(@PathVariable Long customerId) {
        try {
            List<CancellationRequest> requests = cancellationService.getCustomerCancellationRequests(customerId);
            return Result.success(requests);
        } catch (Exception e) {
            return Result.error("获取取消申请失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取待审核的取消申请（员工功能）
     */
    @GetMapping("/pending")
    public Result<List<CancellationRequest>> getPendingCancellationRequests() {
        try {
            List<CancellationRequest> requests = cancellationService.getPendingCancellationRequests();
            return Result.success(requests);
        } catch (Exception e) {
            return Result.error("获取待审核取消申请失败：" + e.getMessage());
        }
    }
    
    /**
     * 获取所有取消申请（管理员功能）
     */
    @GetMapping("/all")
    public Result<List<CancellationRequest>> getAllCancellationRequests() {
        try {
            List<CancellationRequest> requests = cancellationService.getAllCancellationRequests();
            return Result.success(requests);
        } catch (Exception e) {
            return Result.error("获取取消申请列表失败：" + e.getMessage());
        }
    }
    
    /**
     * 根据ID获取取消申请详情
     */
    @GetMapping("/{requestId}")
    public Result<CancellationRequest> getCancellationRequestById(@PathVariable Long requestId) {
        try {
            CancellationRequest request = cancellationService.getCancellationRequestById(requestId);
            if (request != null) {
                return Result.success(request);
            } else {
                return Result.error("取消申请不存在");
            }
        } catch (Exception e) {
            return Result.error("获取取消申请详情失败：" + e.getMessage());
        }
    }
}
