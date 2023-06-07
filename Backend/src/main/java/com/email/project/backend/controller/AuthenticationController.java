package com.email.project.backend.controller;

import com.email.project.backend.dto.CredentialDto;
import com.email.project.backend.dto.JwtView;
import com.email.project.backend.dto.UserCreateDto;
import com.email.project.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Authentication API", description = "The api for authentication operation")
@RestController
@RequestMapping("/api")
public class AuthenticationController {
    private final UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Create a user with credential")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create user successfully", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = JwtView.class))
            }),
            @ApiResponse(responseCode = "400", description = "User already exists", content = {@Content(mediaType = "application/json")})
    })
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
