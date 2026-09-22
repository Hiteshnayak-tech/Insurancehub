package com.insurehub.repository;

import com.insurehub.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    List<Policy> findByCustomerId(Long customerId);
    boolean existsByPolicyNumber(String policyNumber);
}
