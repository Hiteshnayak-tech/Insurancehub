package com.insurehub.controller;

import com.insurehub.dto.ClaimCreateRequest;
import com.insurehub.dto.ClaimDTO;
import com.insurehub.dto.response.ApiResponse;
import com.insurehub.service.ClaimService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimService claimService;

    @PostMapping
    public ResponseEntity<ApiResponse<ClaimDTO>> createClaim(
            @Valid @RequestBody ClaimCreateRequest request,
            @RequestHeader(value = "X-User-Email", required = false) String userEmail,
            @RequestHeader(value = "X-User-Name", required = false) String userName
    ) {
        ClaimDTO created = claimService.createClaim(request, userEmail, userName);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Claim submitted successfully"));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ClaimDTO>>> getMyClaims(
            @RequestHeader(value = "X-User-Email", required = false) String userEmail,
            @RequestParam(value = "email", required = false) String paramEmail
    ) {
        String email = (paramEmail != null && !paramEmail.isBlank()) ? paramEmail : userEmail;
        List<ClaimDTO> claims = claimService.getMyClaims(email);
        return ResponseEntity.ok(ApiResponse.success(claims));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ClaimDTO>> getClaimById(@PathVariable Long id) {
        ClaimDTO claim = claimService.getClaimById(id);
        return ResponseEntity.ok(ApiResponse.success(claim));
    }
}
