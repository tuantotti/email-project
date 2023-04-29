package com.email.project.backend.configuration;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(
        prefix = "file-path"
)
@Getter
public class Config {
    private String filePath;
}
