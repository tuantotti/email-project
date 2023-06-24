package com.email.project.backend.service;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.MailDto;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.repository.MailRepository;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Slf4j
public class MailService {
    private final MailRepository mailRepository;
    private final FileService fileService;
    private final JavaMailSender javaMailSender;

    @Autowired
    public MailService(MailRepository mailRepository, FileService fileService, JavaMailSender javaMailSender) {
        this.mailRepository = mailRepository;
        this.fileService = fileService;
        this.javaMailSender = javaMailSender;
    }

    public Page<MailDto> getMail(MailStatus mailStatus, Pageable pageable) {
        Page<MailDto> mailDtos = new PageImpl<>(new ArrayList<>());
        try {
            Optional<Page<Mail>> mailPage = mailRepository.getMailByStatus(mailStatus, pageable);
            if (mailPage.isPresent())
                mailDtos = mailPage.get().map(mail -> mail.toDto());
        } catch (DataAccessException e) {
            log.error(e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return mailDtos;
    }

    public MailDto sendSimpleMail(MailDto details)
    {
        SimpleMailMessage mailMessage
                = new SimpleMailMessage();

        mailMessage.setFrom(details.getFromAddress());
        mailMessage.setTo(details.getToAddress());
        mailMessage.setText(details.getBody());
        mailMessage.setSubject(details.getSubject());

        javaMailSender.send(mailMessage);

        return details;
    }

    public MailDto sendMailWithAttachment(MailDto details)
    {
        return details;
    }

    @Transactional
    public void updateMailStatus(Mail mail) {
        mailRepository.updateStatusById(mail.getId(), mail.getStatus());
    }

    public void deleteMail(int id) {
        mailRepository.deleteById(id);
    }
}
