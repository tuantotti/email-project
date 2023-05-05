package com.email.project.backend.dto;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.entity.Mail;
import lombok.*;

import java.util.Date;
import java.util.List;

import static com.email.project.backend.constant.Constant.SPLIT_STRING;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MailDto {
    private String subject;
    private String body;
    private String fromAddress;
    private String toAddress;
    private String ccAddress;
    private String bccAddress;
    private List<String> fileNames;
    private Date sendDate;
    private Date receivedDate;
    private MailStatus status;
    private boolean is_read;

    public Mail toEntity() {
        StringBuilder stringBuilder = new StringBuilder();

        for (String name : fileNames) {
            stringBuilder.append(name + SPLIT_STRING);
        }

        stringBuilder.deleteCharAt(stringBuilder.length() - 1);
        String fileNameConcat = stringBuilder.toString();
        return Mail.builder()
                .toAddress(toAddress)
                .fromAddress(fromAddress)
                .bccAddress(bccAddress)
                .ccAddress(ccAddress)
                .subject(subject)
                .body(body)
                .fileNames(fileNameConcat)
                .receivedDate(receivedDate)
                .sendDate(sendDate)
                .is_read(is_read)
                .status(status)
                .build();
    }
}
