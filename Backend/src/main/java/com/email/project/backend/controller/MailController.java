package com.email.project.backend.controller;

import com.email.project.backend.constant.MailStatus;
import com.email.project.backend.dto.BulkUpdateMail;
import com.email.project.backend.dto.MailDto;
import com.email.project.backend.dto.SendMailDto;
import com.email.project.backend.dto.UpdateMail;
import com.email.project.backend.service.MailService;
import com.email.project.backend.service.StorageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.nio.file.Files;
import java.io.File;
import java.io.IOException;

@Tag(name = "Mail API", description = "The api for mail operation")
@RestController
@RequestMapping("/api/mail")
public class MailController {
    private final MailService mailService;
    private final StorageService storageService;

    @Autowired
    public MailController(MailService mailService, StorageService storageService) {
        this.mailService = mailService;
        this.storageService = storageService;
    }

    @GetMapping
    public ResponseEntity<Page<MailDto>> getMail(@RequestParam MailStatus status, Pageable pageable) {
        Page<MailDto> mailDtoList = mailService.getMail(status, pageable);

        return ResponseEntity.ok(mailDtoList);
    }

    @PostMapping("/send")
    public ResponseEntity<Void> sendMail(@ModelAttribute SendMailDto sendMailDto) {
        mailService.sendMail(sendMailDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/file/{fileName:.+}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        String filePath = storageService.getEmailFolder() + File.separator + fileName;
        Resource resource = storageService.loadFileAsResource(filePath);
        String contentType = "application/octet-stream";
        try {
            byte[] bytes = Files.readAllBytes(resource.getFile().toPath());
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(bytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/status")
    public ResponseEntity<?> updateMailStatus(@RequestBody UpdateMail mail) {
        mailService.updateMailStatus(mail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/status/bulk")
    public ResponseEntity<?> bulkUpdateMailStatus(@RequestBody BulkUpdateMail mail) {
        mailService.bulkUpdateMailStatus(mail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteMail(@PathVariable int id) {
        mailService.deleteMail(id);
    }
}
