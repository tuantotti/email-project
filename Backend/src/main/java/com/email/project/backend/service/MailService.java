package com.email.project.backend.service;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.repository.MailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MailService {
    private MailRepository mailRepository;

    @Autowired
    public MailService(MailRepository mailRepository) {
        this.mailRepository = mailRepository;
    }

    public List<Mail> getMail(MailStatus mailStatus) {
        List<Mail> mailList = new ArrayList<>();
        try {
            mailList = mailRepository.getMailByStatus(mailStatus.toString());
            // get file if exist
        } catch (DataAccessException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return mailList;
    }

    public void removeMail(int id) {
        mailRepository.updateStatusById("inactive", id);
    }

    public void restoreMail(int id) {
        mailRepository.updateStatusById("active", id);
    }

    public void deleteMail(int id) {
        mailRepository.deleteById(id);
    }
}
