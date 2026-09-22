package com.insurehub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ClaimCreateRequest {
    @NotBlank(message = "Policy number is required")
    private String policyNumber;

    private String planName;
    private String insurerName;

    @NotBlank(message = "Claim type is required")
    private String claimType;

    @NotNull(message = "Amount claimed is required")
    @Positive(message = "Amount claimed must be greater than zero")
    private BigDecimal amountClaimed;

    @NotBlank(message = "Description is required")
    private String description;

    private String customerEmail;
    private String customerName;
    private List<String> documents;
}
