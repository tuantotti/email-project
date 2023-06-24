package com.email.project.backend.service;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.MailDto;
import com.email.project.backend.entity.FileData;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.repository.MailRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class MailService {
    private final MailRepository mailRepository;
    private final StorageService storageService;

    @Autowired
    public MailService(MailRepository mailRepository, StorageService storageService) {
        this.mailRepository = mailRepository;
        this.storageService = storageService;
    }

    public Page<MailDto> getMail(MailStatus mailStatus, Pageable pageable) {
        Page<MailDto> mailDtos = new PageImpl<>(new ArrayList<>());
        try {
//            Optional<Page<Mail>> mailPage = mailRepository.getMailByStatus(mailStatus, pageable);
//            if (mailPage.isPresent())
//                mailDtos = mailPage.get().map(mail -> mail.toDto());
            List<FileData> fileDataList = List.of(new FileData(), new FileData(), new FileData());
            MailDto mailDto = MailDto.builder()
                    .toAddress("tuan.nv198269@sis.hust.edu.vn")
                    .fromAddress("dat.dt1234@gmail.com")
                    .ccAddress("")
                    .bccAddress("")
                    .body("Hello")
                    .subject("Hello")
                    .fileDataList(fileDataList)
                    .receivedDate(new Date())
                    .sendDate(new Date())
                    .is_read(false)
                    .status(MailStatus.INBOX)
                    .build();

            MailDto mailDto2 = MailDto.builder()
                    .toAddress("tuan.nv198269@sis.hust.edu.vn")
                    .fromAddress("dat.dt1234@gmail.com")
                    .ccAddress("")
                    .bccAddress("")
                    .body("Hello")
                    .subject("Hello")
                    .fileDataList(fileDataList)
                    .receivedDate(new Date())
                    .sendDate(new Date())
                    .is_read(false)
                    .status(MailStatus.INBOX)
                    .build();

            List<MailDto> list = List.of(mailDto, mailDto2);
            mailDtos = new PageImpl<>(list);
        } catch (DataAccessException e) {
            log.error(e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return mailDtos;
    }

    public MailDto sendMail(MailDto mailDto) {
        return null;
    }

    @Transactional
    public void updateMailStatus(Mail mail) {
        mailRepository.updateStatusById(mail.getId(), mail.getStatus());
    }

    public void deleteMail(int id) {
        mailRepository.deleteById(id);
    }
}
