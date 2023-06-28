package com.smtp.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class SmtpServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmtpServerApplication.class, args);
    }
}
