package com.email.project.backend.service;

import com.email.project.backend.configuration.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FileService {
    private final Config config;

    @Autowired
    public FileService(Config config) {
        this.config = config;
    }

    public byte[] getFileFromSystem(String fileName) {
        try {
            return Files.readAllBytes(Path.of(config.getFilePath() + fileName));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean uploadFileToSystem(byte[] fileBytes) {
        // TODO: 4/28/2023 save to the folder path/ username/ file.* 
        return true;
    }
}
