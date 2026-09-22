package com.insurehub.repository;

import com.insurehub.entity.InsurancePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InsurancePlanRepository extends JpaRepository<InsurancePlan, Long> {
    List<InsurancePlan> findByActiveTrue();
    List<InsurancePlan> findAllByOrderByIdAsc();
    List<InsurancePlan> findByCategoryAndActiveTrue(String category);
    List<InsurancePlan> findByInsurerIdAndActiveTrue(Long insurerId);
}
