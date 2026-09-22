package com.insurehub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "insurance_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsurancePlan extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // e.g., Health, Motor, Life, Home, Travel, Business

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "insurer_id")
    private Insurer insurer;

    @Column(name = "insurer_name", nullable = false)
    private String insurerName;

    @Column(name = "base_premium", nullable = false)
    private BigDecimal basePremium;

    @Column(name = "coverage_limit", nullable = false)
    private BigDecimal coverageLimit;

    private Double rating;

    @Column(name = "reviews_count")
    private Integer reviewsCount;

    @Column(name = "cashless_hospitals")
    private Integer cashlessHospitals;

    @Column(name = "claim_settlement_ratio")
    private Double claimSettlementRatio;

    @Column(name = "waiting_period")
    private String waitingPeriod;

    private Integer deductible;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String features; // JSON or comma/newline separated

    @Column(columnDefinition = "TEXT")
    private String exclusions; // JSON or comma/newline separated

    @Builder.Default
    private boolean popular = false;

    @Builder.Default
    @Column(nullable = false)
    private boolean active = true;
}
