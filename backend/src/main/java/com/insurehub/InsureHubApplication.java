package com.insurehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class InsureHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(InsureHubApplication.class, args);
    }
}
