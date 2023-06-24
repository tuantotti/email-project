package com.email.project.backend.service;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.MailDto;
import com.email.project.backend.entity.FileData;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.repository.FileDataRepository;
import com.email.project.backend.repository.MailRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MailService {
    private final MailRepository mailRepository;
    private final StorageService storageService;

    private final FileDataRepository fileDataRepository;
    private final JavaMailSender javaMailSender;

    @Autowired
    public MailService(MailRepository mailRepository, StorageService storageService,
                       FileDataRepository fileDataRepository, JavaMailSender javaMailSender) {
        this.mailRepository = mailRepository;
        this.storageService = storageService;
        this.fileDataRepository = fileDataRepository;
        this.javaMailSender = javaMailSender;
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
                    .status(mailStatus)
                    .build();

            MailDto mailDto2 = MailDto.builder()
                    .toAddress("tuan.nv198269@sis.hust.edu.vn")
                    .fromAddress("dat.dt1234@gmail.com")
                    .ccAddress("")
                    .bccAddress("")
                    .body("Hello")
                    .subject("Hello")
                    .fileDataList(new ArrayList<>())
                    .receivedDate(new Date())
                    .sendDate(new Date())
                    .is_read(false)
                    .status(mailStatus)
                    .build();

            List<MailDto> list = List.of(mailDto, mailDto2);
            mailDtos = new PageImpl<>(list);
        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

        return mailDtos;
    }

    public MailDto sendMail(MailDto mailDto) {
        return null;
    }

    public MailDto sendSimpleMail(MailDto details) {
        SimpleMailMessage mailMessage
                = new SimpleMailMessage();

        mailMessage.setFrom(details.getFromAddress());
        mailMessage.setTo(details.getToAddress());
        mailMessage.setText(details.getBody());
        mailMessage.setSubject(details.getSubject());

        javaMailSender.send(mailMessage);

        return details;
    }

    public MailDto sendMailWithAttachment(MailDto details) {
        return details;
    }

    public void deleteMail(int mailId) {
        try {
            mailRepository.deleteById(mailId);
            List<String> fileNames = fileDataRepository.getFileDataByMailId(mailId)
                    .stream()
                    .map(fileData -> fileData.getName())
                    .collect(Collectors.toList());

            for (String name : fileNames) {
                storageService.deleteFileFromFileSystem(name);
            }
        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Transactional
    public void updateMailStatus(Mail mail) {
        mailRepository.updateStatusById(mail.getId(), mail.getStatus());
    }
}
