package com.email.project.backend.exception;

import org.springframework.web.client.RestClientException;

public class UserAlreadyExistException extends RestClientException {
    public UserAlreadyExistException(String email) {
        super(String.format("User with email '%s' already exists.", email));
    }
}
