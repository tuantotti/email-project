package com.email.project.backend.service;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.MailDto;
import com.email.project.backend.dto.SendMailDto;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.entity.User;
import com.email.project.backend.repository.FileDataRepository;
import com.email.project.backend.repository.MailRepository;
import com.email.project.backend.repository.UserRepository;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MailService {
    private final MailRepository mailRepository;
    private final StorageService storageService;

    private final UserRepository userRepository;

    private final FileDataRepository fileDataRepository;
    private final JavaMailSender javaMailSender;

    @Autowired
    public MailService(MailRepository mailRepository, StorageService storageService,
                       UserRepository userRepository, FileDataRepository fileDataRepository,
                       JavaMailSender javaMailSender) {
        this.mailRepository = mailRepository;
        this.storageService = storageService;
        this.userRepository = userRepository;
        this.fileDataRepository = fileDataRepository;
        this.javaMailSender = javaMailSender;
    }

    public Page<MailDto> getMail(MailStatus mailStatus, Pageable pageable) {
        try {
            String email = UserService.getCurrentUsername();
            Optional<Page<Mail>> mailPage = mailRepository.getMailByToAddressAndStatus(email, mailStatus, pageable);
            if (mailPage.isPresent()) {
                Page<MailDto> mailDtos = mailPage.get().map(mail -> mail.toDto());
                mailDtos.forEach(mailDto -> {
                    Optional<User> fromUserOptional = userRepository.getUserByEmail(mailDto.getFromAddress());
                    if (fromUserOptional.isPresent()) {
                        mailDto.setFromName(fromUserOptional.get().getFirstName() + " " + fromUserOptional.get().getLastName());
                    }
                });

                return mailDtos;
            }
        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

        return new PageImpl<>(new ArrayList<>());
    }

    public void sendMail(SendMailDto sendMailDto) {
        try {
            String currentUsername = UserService.getCurrentUsername();
            String fromAddress = sendMailDto.getFromAddress();
            String toAddress = sendMailDto.getToAddress();
            String ccAddress = sendMailDto.getCcAddress();
            String bccAddress = sendMailDto.getBccAddress();
            sendMailDto.setSendDate(new Date());

            // check mail is exist
            if (!currentUsername.equals(fromAddress)) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Current email and from email must be the same");
            }

            if (!userRepository.getUserByEmail(toAddress).isPresent()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "toAddress is not exist");
            }

            Mail mail = sendMailDto.toEntity(storageService.getFolderPath());
            mail.setStatus(MailStatus.INBOX);

            // save mail to database
            mailRepository.save(mail);

            // save file to filesystem
            sendMailDto.getFiles().stream().forEach(file -> storageService.uploadFileToSystem(file));
        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
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
