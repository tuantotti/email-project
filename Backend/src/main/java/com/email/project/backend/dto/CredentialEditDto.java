package com.email.project.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CredentialEditDto {

    private String email;
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
