package com.insurehub.controller;

import com.insurehub.dto.PlanCreateRequest;
import com.insurehub.dto.PlanDTO;
import com.insurehub.dto.PlanStatusUpdateRequest;
import com.insurehub.dto.response.ApiResponse;
import com.insurehub.service.PlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/plans")
@RequiredArgsConstructor
public class AdminPlanController {

    private final PlanService planService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PlanDTO>>> getAllPlans() {
        List<PlanDTO> plans = planService.getAllPlans();
        return ResponseEntity.ok(ApiResponse.success(plans));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlanDTO>> getPlanById(@PathVariable Long id) {
        PlanDTO plan = planService.getPlanById(id);
        return ResponseEntity.ok(ApiResponse.success(plan));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PlanDTO>> createPlan(@Valid @RequestBody PlanCreateRequest request) {
        PlanDTO created = planService.createPlan(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Insurance plan published successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PlanDTO>> updatePlan(
            @PathVariable Long id,
            @Valid @RequestBody PlanCreateRequest request
    ) {
        PlanDTO updated = planService.updatePlan(id, request);
        return ResponseEntity.ok(ApiResponse.success(updated, "Insurance plan updated successfully"));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<PlanDTO>> updatePlanStatus(
            @PathVariable Long id,
            @RequestBody(required = false) PlanStatusUpdateRequest request
    ) {
        PlanDTO updated = planService.updatePlanStatus(id, request);
        String msg = updated.isActive() ? "Insurance plan activated" : "Insurance plan deactivated";
        return ResponseEntity.ok(ApiResponse.success(updated, msg));
    }
}
