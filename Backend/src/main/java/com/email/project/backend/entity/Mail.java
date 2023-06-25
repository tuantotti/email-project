package com.email.project.backend.entity;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.MailDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

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

    @Column(name = "sent_date")
    private Date sendDate;

    @Column(name = "received_date")
    private Date receivedDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private MailStatus status;

    @Column(name = "is_read")
    private boolean isRead;

    @OneToMany(mappedBy = "mail", cascade = CascadeType.ALL)
    private List<FileData> fileDataList;

    public MailDto toDto() {
        return MailDto.builder()
                .fromAddress(fromAddress)
                .toAddress(toAddress)
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
}
