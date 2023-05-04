package com.email.project.backend.entity;

import com.email.project.backend.dto.MailDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

import static com.email.project.backend.constant.Constant.SPLIT_STRING;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
@Entity
@Table(name = "mail")
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String subject;
    private String body;
    @Column(name = "from_address")
    private String fromAddress;

    @Column(name = "to_address")
    private String toAddress;

    @Column(name = "cc_address")
    private String ccAddress;

    @Column(name = "bcc_address")
    private String bccAddress;

    @Column(name = "file_names")
    private String fileNames;

    @Column(name = "sent_date")
    private Date sendDate;

    @Column(name = "received_date")
    private Date receivedDate;

    @Column(name = "status")
    private String status;

    @Column(name = "is_read")
    private boolean is_read;

    public MailDto toDto() {
        return MailDto.builder()
                .fromAddress(fromAddress)
                .toAddress(toAddress)
                .bccAddress(bccAddress)
                .ccAddress(ccAddress)
                .subject(subject)
                .body(body)
                .fileNames(List.of(fileNames.split(SPLIT_STRING)))
                .receivedDate(receivedDate)
                .sendDate(sendDate)
                .is_read(is_read)
                .status(status)
                .build();
    }
}
