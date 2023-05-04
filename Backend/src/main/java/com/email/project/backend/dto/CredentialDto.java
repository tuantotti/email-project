package com.email.project.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CredentialDto {
    private String email;
    private String password;
}
