package com.email.project.backend.service;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.MailDto;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.repository.MailRepository;
import lombok.extern.slf4j.Slf4j;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class MailService {
    private MailRepository mailRepository;
    private FileService fileService;

    @Autowired
    public MailService(MailRepository mailRepository, FileService fileService) {
        this.mailRepository = mailRepository;
        this.fileService = fileService;
    }

    public List<MailDto> getMail(MailStatus mailStatus) {
        List<MailDto> mailDtoList = new ArrayList<>();
        try {
            List<Mail> mailList = mailRepository.getMailByStatus(mailStatus);
            mailDtoList = mailList.stream().map(mail -> mail.toDto()).toList();
        } catch (DataAccessException e) {
            log.error(e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return mailDtoList;
    }

    public MailDto sendMail(MailDto mailDto) {
        Mail mail = mailDto.toEntity();
//        boolean isUpload = fileService.uploadFileToSystem(mailDto.getFileBytes());
        boolean isUpload = false;

        MailDto sentMail = new MailDto();
        try {
            if (isUpload) {
                Mail savedmail = mailRepository.save(mail);
                sentMail = savedmail.toDto();
            } else {
                log.error("Can not upload file to system");
            }
        } catch (DataAccessException e) {
            log.error(e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return sentMail;
    }

    @Transactional
    public void updateMailStatus(Mail mail) {mailRepository.updateStatusById(mail.getId(), mail.getStatus());}

    public void deleteMail(int id) {
        mailRepository.deleteById(id);
    }
}
