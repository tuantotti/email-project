package com.email.project.backend.controller;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mail")
public class MailController {
    private MailService mailService;

    @Autowired
    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @GetMapping
    public ResponseEntity<List<Mail>> getMail(@RequestParam String status) {
        List<Mail> mailList = mailService.getMail(MailStatus.valueOf(status));

        return ResponseEntity.ok(mailList);
    }

    @DeleteMapping("/remove/{id}")
    public void removeMail(@RequestParam int id) {
        mailService.removeMail(id);
    }

    @DeleteMapping("/restore/{id}")
    public void restoreMail(@RequestParam int id) {
        mailService.restoreMail(id);
    }

    @DeleteMapping("{id}")
    public void deleteMail(@RequestParam int id) {
        mailService.deleteMail(id);
    }
}
