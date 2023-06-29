package com.smtp.server.model;

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
    private MailStatus status;
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
                .status(status)
                .build();
    }

    public void setFromName(String fromName) {
        this.fromName = fromName;
    }

    public boolean isRead() {
        return isRead;
    }
}
