package com.insurehub.dto;

import com.insurehub.entity.enums.ClaimStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ClaimStatusUpdateRequest {
    @NotNull(message = "Status is required")
    private ClaimStatus status;

    private BigDecimal amountApproved;
    private String adminRemarks;
}
