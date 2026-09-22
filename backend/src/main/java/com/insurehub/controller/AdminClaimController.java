package com.insurehub.controller;

import com.insurehub.dto.ClaimDTO;
import com.insurehub.dto.ClaimStatusUpdateRequest;
import com.insurehub.dto.response.ApiResponse;
import com.insurehub.service.ClaimService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/claims")
@RequiredArgsConstructor
public class AdminClaimController {

    private final ClaimService claimService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ClaimDTO>>> getAllClaims() {
        List<ClaimDTO> claims = claimService.getAllClaims();
        return ResponseEntity.ok(ApiResponse.success(claims));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ClaimDTO>> getClaimById(@PathVariable Long id) {
        ClaimDTO claim = claimService.getClaimById(id);
        return ResponseEntity.ok(ApiResponse.success(claim));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ClaimDTO>> updateClaimStatus(
            @PathVariable Long id,
            @Valid @RequestBody ClaimStatusUpdateRequest request
    ) {
        ClaimDTO updated = claimService.updateClaimStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success(updated, "Claim status updated successfully"));
    }
}
