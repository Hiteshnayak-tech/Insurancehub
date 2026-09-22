package com.insurehub.repository;

import com.insurehub.entity.Insurer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsurerRepository extends JpaRepository<Insurer, Long> {
}
