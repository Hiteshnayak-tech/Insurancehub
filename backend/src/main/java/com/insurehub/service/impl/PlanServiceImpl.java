package com.insurehub.service.impl;

import com.insurehub.dto.PlanCreateRequest;
import com.insurehub.dto.PlanDTO;
import com.insurehub.dto.PlanStatusUpdateRequest;
import com.insurehub.entity.InsurancePlan;
import com.insurehub.exception.ResourceNotFoundException;
import com.insurehub.repository.InsurancePlanRepository;
import com.insurehub.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanServiceImpl implements PlanService {

    private final InsurancePlanRepository planRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PlanDTO> getActivePlans() {
        return planRepository.findByActiveTrue().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlanDTO> getAllPlans() {
        return planRepository.findAllByOrderByIdAsc().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PlanDTO getPlanById(Long id) {
        InsurancePlan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Insurance Plan not found with id: " + id));
        return mapToDTO(plan);
    }

    @Override
    @Transactional
    public PlanDTO createPlan(PlanCreateRequest request) {
        String featuresStr = (request.getFeatures() != null && !request.getFeatures().isEmpty())
                ? String.join(";;", request.getFeatures())
                : "Full Cashless Hospitalization;;Zero Room Rent Capping;;Instant Settlement";

        String exclusionsStr = (request.getExclusions() != null && !request.getExclusions().isEmpty())
                ? String.join(";;", request.getExclusions())
                : "Standard exclusions apply";

        InsurancePlan plan = InsurancePlan.builder()
                .name(request.getName())
                .category(request.getCategory())
                .insurerName(request.getInsurerName())
                .rating(request.getRating() != null ? request.getRating() : 4.8)
                .reviewsCount(request.getReviewsCount() != null ? request.getReviewsCount() : 1)
                .basePremium(request.getBasePremium())
                .coverageLimit(request.getCoverageLimit())
                .cashlessHospitals(request.getCashlessHospitals() != null ? request.getCashlessHospitals() : 5000)
                .claimSettlementRatio(request.getClaimSettlementRatio() != null ? request.getClaimSettlementRatio() : 98.2)
                .waitingPeriod(request.getWaitingPeriod() != null ? request.getWaitingPeriod() : "N/A")
                .deductible(request.getDeductible() != null ? request.getDeductible() : 0)
                .description(request.getDescription() != null ? request.getDescription() : "Comprehensive underwritten retail plan.")
                .features(featuresStr)
                .exclusions(exclusionsStr)
                .popular(request.isPopular())
                .active(true)
                .build();

        InsurancePlan saved = planRepository.save(plan);
        return mapToDTO(saved);
    }

    @Override
    @Transactional
    public PlanDTO updatePlanStatus(Long id, PlanStatusUpdateRequest request) {
        InsurancePlan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Insurance Plan not found with id: " + id));

        if (request != null && request.getActive() != null) {
            plan.setActive(request.getActive());
        } else {
            // Toggle active status
            plan.setActive(!plan.isActive());
        }

        InsurancePlan updated = planRepository.save(plan);
        return mapToDTO(updated);
    }

    @Override
    @Transactional
    public PlanDTO updatePlan(Long id, PlanCreateRequest request) {
        InsurancePlan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Insurance Plan not found with id: " + id));

        plan.setName(request.getName());
        plan.setCategory(request.getCategory());
        plan.setInsurerName(request.getInsurerName());
        plan.setBasePremium(request.getBasePremium());
        plan.setCoverageLimit(request.getCoverageLimit());
        if (request.getRating() != null) plan.setRating(request.getRating());
        if (request.getReviewsCount() != null) plan.setReviewsCount(request.getReviewsCount());
        if (request.getCashlessHospitals() != null) plan.setCashlessHospitals(request.getCashlessHospitals());
        if (request.getClaimSettlementRatio() != null) plan.setClaimSettlementRatio(request.getClaimSettlementRatio());
        if (request.getWaitingPeriod() != null) plan.setWaitingPeriod(request.getWaitingPeriod());
        if (request.getDeductible() != null) plan.setDeductible(request.getDeductible());
        if (request.getDescription() != null) plan.setDescription(request.getDescription());
        if (request.getFeatures() != null) plan.setFeatures(String.join(";;", request.getFeatures()));
        if (request.getExclusions() != null) plan.setExclusions(String.join(";;", request.getExclusions()));
        plan.setPopular(request.isPopular());

        InsurancePlan updated = planRepository.save(plan);
        return mapToDTO(updated);
    }

    private PlanDTO mapToDTO(InsurancePlan plan) {
        List<String> featuresList = new ArrayList<>();
        if (plan.getFeatures() != null && !plan.getFeatures().isBlank()) {
            featuresList = Arrays.stream(plan.getFeatures().split(";;"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }

        List<String> exclusionsList = new ArrayList<>();
        if (plan.getExclusions() != null && !plan.getExclusions().isBlank()) {
            exclusionsList = Arrays.stream(plan.getExclusions().split(";;"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }

        return PlanDTO.builder()
                .id(plan.getId())
                .name(plan.getName())
                .category(plan.getCategory())
                .insurerName(plan.getInsurerName())
                .rating(plan.getRating() != null ? plan.getRating() : 4.8)
                .reviewsCount(plan.getReviewsCount() != null ? plan.getReviewsCount() : 100)
                .basePremium(plan.getBasePremium())
                .coverageLimit(plan.getCoverageLimit())
                .cashlessHospitals(plan.getCashlessHospitals())
                .claimSettlementRatio(plan.getClaimSettlementRatio() != null ? plan.getClaimSettlementRatio() : 98.0)
                .waitingPeriod(plan.getWaitingPeriod())
                .deductible(plan.getDeductible())
                .description(plan.getDescription())
                .features(featuresList)
                .exclusions(exclusionsList)
                .popular(plan.isPopular())
                .active(plan.isActive())
                .build();
    }
}
