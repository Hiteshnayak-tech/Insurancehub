package com.insurehub.repository;

import com.insurehub.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {

    List<Claim> findByCustomerEmailOrderBySubmittedDateDesc(String customerEmail);

    List<Claim> findAllByOrderBySubmittedDateDesc();

    Optional<Claim> findByClaimNumber(String claimNumber);
}
