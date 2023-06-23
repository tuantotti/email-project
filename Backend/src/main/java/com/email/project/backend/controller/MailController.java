package com.email.project.backend.controller;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.MailDto;
import com.email.project.backend.entity.Mail;
import com.email.project.backend.service.MailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Mail API", description = "The api for mail operation")
@RestController
@RequestMapping("/api/mail")
public class MailController {
    private final MailService mailService;

    @Autowired
    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @GetMapping
    public ResponseEntity<Page<MailDto>> getMail(@RequestParam MailStatus status, Pageable pageable) {
        Page<MailDto> mailDtoList = mailService.getMail(status, pageable);

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
    public void deleteMail(@PathVariable int id) {
        mailService.deleteMail(id);
    }
}
