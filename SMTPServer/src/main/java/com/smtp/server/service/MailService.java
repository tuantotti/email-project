package com.smtp.server.service;


import com.smtp.server.model.Mail;
import com.smtp.server.repository.MailRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@Slf4j
public class MailService {
    private final MailRepository mailRepository;

    @Value("${folder.path}")
    private String FOLDER_PATH;
    private static MailRepository staticMailRepository;
    private static String STATIC_FOLDER_PATH;

    @Autowired
    public MailService(MailRepository mailRepository) {
        this.mailRepository = mailRepository;
    }

    @PostConstruct
    public void init() {
        staticMailRepository = mailRepository;
        STATIC_FOLDER_PATH = FOLDER_PATH;
    }

    public static Mail save(Mail mail) {
        try {
            Mail savedMail = staticMailRepository.save(mail);

            return savedMail;
        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public static String getFolderPath() {
        return STATIC_FOLDER_PATH;
    }
}
