package com.email.project.backend.service;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.BulkUpdateMail;
import com.email.project.backend.dto.MailDto;
import com.email.project.backend.dto.SendMailDto;
import com.email.project.backend.dto.UpdateMail;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.entity.User;
import com.email.project.backend.repository.FileDataRepository;
import com.email.project.backend.repository.MailRepository;
import com.email.project.backend.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeUtility;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
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
            Optional<Page<Mail>> mailPage = null;
            MailStatus[] statuses;
            switch (mailStatus) {
                case SENT:
                    statuses = new MailStatus[]{MailStatus.SENT, MailStatus.STARRED};
                    mailPage = mailRepository.getMailByFromAddressAndSenderStatusIn(email, statuses, pageable);
                    break;
                case INBOX:
                    statuses = new MailStatus[]{MailStatus.INBOX, MailStatus.STARRED};
                    mailPage = mailRepository.getMailByToAddressAndReceiverStatusIn(email, statuses, pageable);
                    break;
                case TRASH:
                    mailPage = mailRepository.getMailBySpecifyStatus(email, MailStatus.TRASH, pageable);
                    break;
                case SPAM:
                    mailPage = mailRepository.getMailBySpecifyStatus(email, MailStatus.SPAM, pageable);
                    break;
//                case DELETED:
//                    mailPage = mailRepository.getMailBySpecifyStatus(email, MailStatus.DELETED, pageable);
//                    break;
                case STARRED:
                    mailPage = mailRepository.getMailBySpecifyStatus(email, MailStatus.STARRED, pageable);
                    break;
                default:
                    return new PageImpl<>(new ArrayList<>());
            }


            if (mailPage.isPresent()) {
                Page<MailDto> mailDtos = mailPage.get().map(mail -> mail.toDto());
                mailDtos.forEach(mailDto -> {
                    Optional<User> fromUserOptional = userRepository.getUserByEmail(mailDto.getFromAddress());
                    Optional<User> toUserOptional = userRepository.getUserByEmail(mailDto.getToAddress());
                    if (fromUserOptional.isPresent()) {
                        mailDto.setFromName(fromUserOptional.get().getFirstName() + " " + fromUserOptional.get().getLastName());
                    }
                    if (toUserOptional.isPresent()) {
                        mailDto.setToName(toUserOptional.get().getFirstName() + " " + toUserOptional.get().getLastName());
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
            if (!currentUsername.equals(sendMailDto.getFromAddress())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "From email and email in jwt is not equal");
            }
            MimeMessage comingMail = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(comingMail, true, String.valueOf(StandardCharsets.UTF_8));
            helper.setFrom(sendMailDto.getFromAddress());
            helper.setTo(sendMailDto.getToAddress());
            helper.setText(sendMailDto.getBody());
            helper.setSubject(sendMailDto.getSubject());
            helper.setSentDate(new Date());

            for (MultipartFile file : sendMailDto.getFiles()) {
                helper.addAttachment(MimeUtility.encodeWord(file.getOriginalFilename(), String.valueOf(StandardCharsets.UTF_8), "Q"), file);
            }

            javaMailSender.send(helper.getMimeMessage());

        } catch (MessagingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
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
    public void readMail(int id) {
        try {
            if (!mailRepository.findById(id).isPresent()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The mail with id " + id + " is not exist");
            }
            mailRepository.updateReadById(id, true);
        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Transactional
    public void updateMailStatus(UpdateMail mail) {
        String ownerEmail = UserService.getCurrentUsername();
        try {
            Optional<Mail> mailOptional = mailRepository.findById(mail.getId());
            if (mailOptional.get().getToAddress().equals(ownerEmail)) {
                mailRepository.updateReceiverStatusById(mail.getId(), mail.getStatus());
            } else if (mailOptional.get().getFromAddress().equals(ownerEmail)) {
                mailRepository.updateSenderStatusById(mail.getId(), mail.getStatus());
            } else {
                String msg = "user with " + ownerEmail + " is not the owner of mail with id " + mail.getId();
                log.error(msg);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, msg);
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
    public void bulkUpdateMailStatus(BulkUpdateMail mail) {
        String ownerEmail = UserService.getCurrentUsername();
        try {
            List<Mail> mails = mailRepository.findByIdIn(mail.getIds());

            for (Mail m : mails) {
                if (m.getToAddress().equals(ownerEmail)) {
                    mailRepository.updateReceiverStatusById(m.getId(), mail.getStatus());
                } else if (m.getFromAddress().equals(ownerEmail)) {
                    mailRepository.updateSenderStatusById(m.getId(), mail.getStatus());
                }
            }
        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
