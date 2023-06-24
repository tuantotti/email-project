package com.email.project.backend.service;

import com.email.project.backend.entity.FileData;
import com.email.project.backend.repository.FileDataRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@Slf4j
public class StorageService {
    private final FileDataRepository fileDataRepository;

    @Value("${folder.path}")
    private String folderPath;

    @Autowired
    public StorageService(FileDataRepository fileDataRepository) {
        this.fileDataRepository = fileDataRepository;
    }


    public byte[] getFileFromSystem(String fileName) {

        try {
            byte[] file = Files.readAllBytes(Path.of(folderPath + fileName));
            return file;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean uploadFileToSystem(MultipartFile file) {
        String filePath = folderPath + file.getOriginalFilename();
        FileData comingFile = FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .size(file.getSize())
                .filePath(filePath)
                .build();

        boolean isSaveToFileSystem, isSaveToDb;

        try {
            // save file to file system
            file.transferTo(new File(filePath));
            isSaveToFileSystem = true;
        } catch (IOException e) {
            isSaveToFileSystem = false;
        }

        try {
            if (isSaveToFileSystem) {
                // save to db
                fileDataRepository.save(comingFile);
                isSaveToDb = true;
            } else {
                isSaveToDb = false;
            }
        } catch (Exception e) {
            isSaveToDb = false;
        }

        if (isSaveToFileSystem && isSaveToDb) {
            return true;
        }

        return false;
    }
}
