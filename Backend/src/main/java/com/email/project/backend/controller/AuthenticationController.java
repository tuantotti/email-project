package com.email.project.backend.controller;

import com.email.project.backend.dto.CredentialDto;
import com.email.project.backend.dto.JwtView;
import com.email.project.backend.dto.UserCreateDto;
import com.email.project.backend.exception.UserAlreadyExistException;
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
    public ResponseEntity<JwtView> signup(@RequestBody UserCreateDto userCreateDto) {
        JwtView jwtView = userService.create(userCreateDto);
        return ResponseEntity.ok(jwtView);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtView> login(@RequestBody CredentialDto credentialDto) {
        JwtView jwtView = userService.authenticate(credentialDto);
        return ResponseEntity.ok(jwtView);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<JwtView> refreshToken(@RequestBody JwtView jwtView) {
        JwtView response = userService.refreshToken(jwtView);
        return ResponseEntity.ok(response);
    }
}
