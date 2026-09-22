package com.insurehub.entity;

import com.insurehub.entity.enums.ClaimStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "claims")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Claim extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "claim_number", unique = true, nullable = false)
    private String claimNumber;

    @Column(name = "policy_number", nullable = false)
    private String policyNumber;

    @Column(name = "plan_name")
    private String planName;

    @Column(name = "insurer_name")
    private String insurerName;

    @Column(name = "claim_type", nullable = false)
    private String claimType;

    @Column(name = "amount_claimed", nullable = false)
    private BigDecimal amountClaimed;

    @Column(name = "amount_approved")
    private BigDecimal amountApproved;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClaimStatus status;

    @Column(name = "submitted_date", nullable = false)
    private LocalDate submittedDate;

    @Column(name = "last_updated")
    private LocalDate lastUpdated;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "admin_remarks", columnDefinition = "TEXT")
    private String adminRemarks;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "customer_name")
    private String customerName;

    @Column(columnDefinition = "TEXT")
    private String documents;
}
