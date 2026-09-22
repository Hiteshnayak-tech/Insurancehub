package com.insurehub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanDTO {
    private Long id;
    private String name;
    private String category;
    private String insurerName;
    private Double rating;
    private Integer reviewsCount;
    private BigDecimal basePremium;
    private BigDecimal coverageLimit;
    private Integer cashlessHospitals;
    private Double claimSettlementRatio;
    private String waitingPeriod;
    private Integer deductible;
    private String description;
    private List<String> features;
    private List<String> exclusions;
    private boolean popular;
    private boolean active;
}
