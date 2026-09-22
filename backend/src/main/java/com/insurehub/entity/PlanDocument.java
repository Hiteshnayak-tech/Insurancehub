package com.insurehub.entity;

import com.insurehub.entity.enums.DocumentType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "plan_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanDocument extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private InsurancePlan plan;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_type", nullable = false)
    private DocumentType documentType;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;
}
