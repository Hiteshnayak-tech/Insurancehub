package com.insurehub.service;

import com.insurehub.dto.ClaimCreateRequest;
import com.insurehub.dto.ClaimDTO;
import com.insurehub.dto.ClaimStatusUpdateRequest;

import java.util.List;

public interface ClaimService {
    ClaimDTO createClaim(ClaimCreateRequest request, String userEmail, String userName);
    List<ClaimDTO> getMyClaims(String userEmail);
    List<ClaimDTO> getAllClaims();
    ClaimDTO getClaimById(Long id);
    ClaimDTO updateClaimStatus(Long id, ClaimStatusUpdateRequest request);
}
