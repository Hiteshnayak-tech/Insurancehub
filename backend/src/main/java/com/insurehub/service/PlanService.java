package com.insurehub.service;

import com.insurehub.dto.PlanCreateRequest;
import com.insurehub.dto.PlanDTO;
import com.insurehub.dto.PlanStatusUpdateRequest;

import java.util.List;

public interface PlanService {
    List<PlanDTO> getActivePlans();
    List<PlanDTO> getAllPlans();
    PlanDTO getPlanById(Long id);
    PlanDTO createPlan(PlanCreateRequest request);
    PlanDTO updatePlanStatus(Long id, PlanStatusUpdateRequest request);
    PlanDTO updatePlan(Long id, PlanCreateRequest request);
}
