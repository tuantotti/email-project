package com.email.project.backend.service;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
public class StorageService {

    @Value("${folder.path}")
    private String folderPath;
    private final String AVATAR_FOLDER = "avatar";
    private final String EMAIL = "email-file";

    public StorageService() {
    }

    @PostConstruct
    public void init() {
        try {
            Path avatarPath = Path.of(folderPath + File.separator + AVATAR_FOLDER);
            Path emailPath = Path.of(folderPath + File.separator + EMAIL);
            Files.createDirectories(avatarPath);
            Files.createDirectories(emailPath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    public byte[] getFileFromSystem(String fileName) {

        try {
            byte[] file = Files.readAllBytes(Path.of(folderPath + fileName));
            return file;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean deleteFileFromFileSystem(String fileName) {
        boolean isDeleted = false;
        try {
            Files.delete(Path.of(folderPath + fileName));
            isDeleted = true;
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            return isDeleted;
        }
    }

    public boolean uploadFileToSystem(MultipartFile file, String filePath) {

        boolean isSaveToFileSystem = false;

        try {
            // save file to file system
            file.transferTo(new File(filePath));
            isSaveToFileSystem = true;
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        } finally {
            return isSaveToFileSystem;
        }
    }

    public String getAvatarFolder() {
        return folderPath + File.separator + AVATAR_FOLDER;
    }

    public String getEmailFolder() {
        return folderPath + File.separator + EMAIL;
    }

    public Resource loadFileAsResource(String filePath) {
        try {
            URI uri = Paths.get(filePath).toUri();
            Resource resource = new UrlResource(uri);
            if (resource.exists())
                return resource;
            else
                throw new RuntimeException("File not found " + filePath);
        } catch (MalformedURLException e) {
            throw new RuntimeException("File not found " + filePath, e);
        }
    }
}
