package com.email.project.backend.dto;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.entity.FileData;
import com.email.project.backend.entity.Mail;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MailDto {
    private int id;
    private String subject;
    private String body;
    private String fromAddress;
    private String fromName;
    private String toAddress;
    private String ccAddress;
    private String bccAddress;
    private Date sendDate;
    private Date receivedDate;
    private MailStatus senderStatus;
    private MailStatus receiverStatus;
    private List<FileData> fileDataList;
    private boolean isRead;

    public Mail toEntity() {
        return Mail.builder()
                .id(id)
                .toAddress(toAddress)
                .fromAddress(fromAddress)
                .bccAddress(bccAddress)
                .ccAddress(ccAddress)
                .subject(subject)
                .body(body)
                .fileDataList(fileDataList)
                .receivedDate(receivedDate)
                .sendDate(sendDate)
                .isRead(isRead)
                .senderStatus(senderStatus)
                .receiverStatus(receiverStatus)
                .build();
    }

    public void setFromName(String fromName) {
        this.fromName = fromName;
    }

    @JsonProperty("isRead")
    public boolean isRead() {
        return isRead;
    }
}
