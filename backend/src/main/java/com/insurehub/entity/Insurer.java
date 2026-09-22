package com.insurehub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "insurers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Insurer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "support_phone")
    private String supportPhone;

    @Builder.Default
    @Column(nullable = false)
    private boolean active = true;
}
