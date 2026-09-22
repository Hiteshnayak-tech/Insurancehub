package com.insurehub.dto;

import com.insurehub.entity.enums.ClaimStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClaimDTO {
    private Long id;
    private String claimNumber;
    private String policyNumber;
    private String planName;
    private String insurerName;
    private String claimType;
    private BigDecimal amountClaimed;
    private BigDecimal amountApproved;
    private ClaimStatus status;
    private LocalDate submittedDate;
    private LocalDate lastUpdated;
    private String description;
    private String adminRemarks;
    private String customerEmail;
    private String customerName;
    private List<String> documents;
}
