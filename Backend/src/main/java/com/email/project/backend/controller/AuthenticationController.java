package com.email.project.backend.controller;

import com.email.project.backend.dto.CredentialDto;
import com.email.project.backend.dto.JwtResponse;
import com.email.project.backend.dto.UserCreateDto;
import com.email.project.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthenticationController {
    private UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtResponse> signup(@RequestBody UserCreateDto userCreateDto) {
        JwtResponse jwtResponse = userService.create(userCreateDto);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody CredentialDto credentialDto) {
        JwtResponse jwtResponse = userService.authenticate(credentialDto);
        return ResponseEntity.ok(jwtResponse);
    }
}
