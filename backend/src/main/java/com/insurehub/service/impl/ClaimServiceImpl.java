package com.insurehub.service.impl;

import com.insurehub.dto.ClaimCreateRequest;
import com.insurehub.dto.ClaimDTO;
import com.insurehub.dto.ClaimStatusUpdateRequest;
import com.insurehub.entity.Claim;
import com.insurehub.entity.enums.ClaimStatus;
import com.insurehub.exception.ResourceNotFoundException;
import com.insurehub.repository.ClaimRepository;
import com.insurehub.service.ClaimService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClaimServiceImpl implements ClaimService {

    private final ClaimRepository claimRepository;

    @Override
    @Transactional
    public ClaimDTO createClaim(ClaimCreateRequest request, String userEmail, String userName) {
        String email = (userEmail != null && !userEmail.isBlank()) ? userEmail : request.getCustomerEmail();
        String name = (userName != null && !userName.isBlank()) ? userName : request.getCustomerName();
        if (email == null || email.isBlank()) {
            email = "demo@insurehub.com";
        }
        if (name == null || name.isBlank()) {
            name = "Demo Customer";
        }

        int randomNum = 100000 + new Random().nextInt(900000);
        String claimNumber = "CLM-" + LocalDate.now().getYear() + "-" + randomNum;

        String docsString = null;
        if (request.getDocuments() != null && !request.getDocuments().isEmpty()) {
            docsString = String.join(",", request.getDocuments());
        } else {
            docsString = "Hospital_Discharge_Summary.pdf,Final_Bill_Receipt.pdf";
        }

        Claim claim = Claim.builder()
                .claimNumber(claimNumber)
                .policyNumber(request.getPolicyNumber())
                .planName(request.getPlanName() != null ? request.getPlanName() : "Insurance Plan")
                .insurerName(request.getInsurerName() != null ? request.getInsurerName() : "InsureHub Partner")
                .claimType(request.getClaimType())
                .amountClaimed(request.getAmountClaimed())
                .amountApproved(null)
                .status(ClaimStatus.SUBMITTED)
                .submittedDate(LocalDate.now())
                .lastUpdated(LocalDate.now())
                .description(request.getDescription())
                .adminRemarks(null)
                .customerEmail(email)
                .customerName(name)
                .documents(docsString)
                .build();

        Claim saved = claimRepository.save(claim);
        return mapToDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClaimDTO> getMyClaims(String userEmail) {
        String email = (userEmail != null && !userEmail.isBlank()) ? userEmail : "demo@insurehub.com";
        List<Claim> claims = claimRepository.findByCustomerEmailOrderBySubmittedDateDesc(email);
        
        // If no claims found specifically by email, also include any claims with empty or demo email
        if (claims.isEmpty()) {
            claims = claimRepository.findAllByOrderBySubmittedDateDesc();
        }

        return claims.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClaimDTO> getAllClaims() {
        return claimRepository.findAllByOrderBySubmittedDateDesc().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ClaimDTO getClaimById(Long id) {
        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not found with id: " + id));
        return mapToDTO(claim);
    }

    @Override
    @Transactional
    public ClaimDTO updateClaimStatus(Long id, ClaimStatusUpdateRequest request) {
        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not found with id: " + id));

        claim.setStatus(request.getStatus());
        if (request.getAmountApproved() != null) {
            claim.setAmountApproved(request.getAmountApproved());
        } else if (request.getStatus() == ClaimStatus.APPROVED || request.getStatus() == ClaimStatus.SETTLED) {
            if (claim.getAmountApproved() == null) {
                claim.setAmountApproved(claim.getAmountClaimed());
            }
        }
        if (request.getAdminRemarks() != null) {
            claim.setAdminRemarks(request.getAdminRemarks());
        }
        claim.setLastUpdated(LocalDate.now());

        Claim updated = claimRepository.save(claim);
        return mapToDTO(updated);
    }

    private ClaimDTO mapToDTO(Claim claim) {
        List<String> docsList = new ArrayList<>();
        if (claim.getDocuments() != null && !claim.getDocuments().isBlank()) {
            docsList = Arrays.stream(claim.getDocuments().split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }

        return ClaimDTO.builder()
                .id(claim.getId())
                .claimNumber(claim.getClaimNumber())
                .policyNumber(claim.getPolicyNumber())
                .planName(claim.getPlanName())
                .insurerName(claim.getInsurerName())
                .claimType(claim.getClaimType())
                .amountClaimed(claim.getAmountClaimed())
                .amountApproved(claim.getAmountApproved())
                .status(claim.getStatus())
                .submittedDate(claim.getSubmittedDate())
                .lastUpdated(claim.getLastUpdated())
                .description(claim.getDescription())
                .adminRemarks(claim.getAdminRemarks())
                .customerEmail(claim.getCustomerEmail())
                .customerName(claim.getCustomerName())
                .documents(docsList)
                .build();
    }
}
