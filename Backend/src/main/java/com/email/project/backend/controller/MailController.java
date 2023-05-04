package com.email.project.backend.controller;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.MailDto;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mail")
public class MailController {
    private MailService mailService;

    @Autowired
    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @GetMapping
    public ResponseEntity<List<MailDto>> getMail(@RequestParam String status) {
        List<MailDto> mailDtoList = mailService.getMail(MailStatus.valueOf(status));

        return ResponseEntity.ok(mailDtoList);
    }

    @PostMapping
    public ResponseEntity<MailDto> sendMail(@RequestBody MailDto mailDto) {
        MailDto sentMail = mailService.sendMail(mailDto);

        return ResponseEntity.ok(sentMail);
    }

    @PutMapping("/status")
    public void updateMailStatus(@RequestBody Mail mail) {
        mailService.updateMailStatus(mail);
    }

    @DeleteMapping("/{id}")
    public void deleteMail(@RequestParam int id) {
        mailService.deleteMail(id);
    }
}
