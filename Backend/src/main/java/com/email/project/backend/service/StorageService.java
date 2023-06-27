package com.email.project.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
public class StorageService {

    @Value("${folder.path}")
    private String folderPath;

    public StorageService() {
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

    public String getFolderPath() {
        return folderPath;
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = Paths.get(folderPath + "\\" + fileName);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists())
                return resource;
            else
                throw new RuntimeException("File not found " + fileName);
        } catch (MalformedURLException e) {
            throw new RuntimeException("File not found " + fileName, e);
        }
    }
}
