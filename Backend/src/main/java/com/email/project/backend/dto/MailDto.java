package com.email.project.backend.dto;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.entity.FileData;
import com.email.project.backend.entity.Mail;
import jakarta.annotation.Nullable;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MailDto {
    @Nullable
    private String subject;
    private String body;
    private String fromAddress;
    private String toAddress;
    //    private List<MultipartFile> files;
    @Nullable
    private String ccAddress;
    @Nullable
    private String bccAddress;
    private Date sendDate;
    private Date receivedDate;
    private MailStatus status;
    private List<FileData> fileDataList;
    @Nullable
    private boolean is_read;

    public Mail toEntity() {
        return Mail.builder()
                .toAddress(toAddress)
                .fromAddress(fromAddress)
                .bccAddress(bccAddress)
                .ccAddress(ccAddress)
                .subject(subject)
                .body(body)
                .fileDataList(fileDataList)
                .receivedDate(receivedDate)
                .sendDate(sendDate)
                .is_read(is_read)
                .status(status)
                .build();
    }
}
