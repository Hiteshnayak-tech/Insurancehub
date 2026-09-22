package com.insurehub.repository;

import com.insurehub.entity.PlanDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanDocumentRepository extends JpaRepository<PlanDocument, Long> {
    List<PlanDocument> findByPlanId(Long planId);
}
