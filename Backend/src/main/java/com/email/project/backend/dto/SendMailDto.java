package com.email.project.backend.dto;

import com.email.project.backend.entity.FileData;
import com.email.project.backend.entity.Mail;
import jakarta.annotation.Nullable;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendMailDto implements Serializable {
    @Nullable
    private String subject;
    private String body;
    private String fromAddress;
    private String toAddress;
    private List<MultipartFile> files;
    @Nullable
    private String ccAddress;
    @Nullable
    private String bccAddress;
    @Nullable
    private Date sendDate;

    public List<FileData> getFileDataList(String folderPath) {
        List<FileData> fileDataList = files.stream()
                .map(multipartfile -> {
                    String fileName = multipartfile.getOriginalFilename();
                    int extensionIndex = fileName.lastIndexOf(".");
                    String extensionFile = fileName.substring(extensionIndex);
                    String name = fileName.substring(0, extensionIndex);

                    String storeFileName = name + "_" + System.currentTimeMillis() + extensionFile;
                    return FileData.builder()
                            .name(storeFileName)
                            .type(multipartfile.getContentType())
                            .size(multipartfile.getSize())
                            .filePath(folderPath + "\\" + storeFileName)
                            .build();
                })
                .collect(Collectors.toList());
        return fileDataList;
    }

    public Mail toEntity(String folderPath) {
        List<FileData> fileDataList = getFileDataList(folderPath);

        Mail mail = Mail.builder()
                .subject(subject)
                .body(body)
                .fromAddress(fromAddress)
                .toAddress(toAddress)
                .fileDataList(fileDataList)
                .sendDate(sendDate)
                .build();

        fileDataList.stream().forEach(fileData -> fileData.setMail(mail));
        return mail;
    }
}
