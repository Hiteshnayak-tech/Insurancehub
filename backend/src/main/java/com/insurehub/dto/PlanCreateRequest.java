package com.insurehub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PlanCreateRequest {
    @NotBlank(message = "Plan name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Insurer name is required")
    private String insurerName;

    @NotNull(message = "Base premium is required")
    @Positive(message = "Base premium must be positive")
    private BigDecimal basePremium;

    @NotNull(message = "Coverage limit is required")
    @Positive(message = "Coverage limit must be positive")
    private BigDecimal coverageLimit;

    private Double rating;
    private Integer reviewsCount;
    private Integer cashlessHospitals;
    private Double claimSettlementRatio;
    private String waitingPeriod;
    private Integer deductible;
    private String description;
    private List<String> features;
    private List<String> exclusions;
    private boolean popular;
}
