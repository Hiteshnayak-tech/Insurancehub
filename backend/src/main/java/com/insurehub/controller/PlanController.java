package com.insurehub.controller;

import com.insurehub.dto.PlanDTO;
import com.insurehub.dto.response.ApiResponse;
import com.insurehub.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PlanDTO>>> getActivePlans() {
        List<PlanDTO> plans = planService.getActivePlans();
        return ResponseEntity.ok(ApiResponse.success(plans));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlanDTO>> getPlanById(@PathVariable Long id) {
        PlanDTO plan = planService.getPlanById(id);
        return ResponseEntity.ok(ApiResponse.success(plan));
    }
}
