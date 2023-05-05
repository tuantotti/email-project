package com.email.project.backend.service;

import com.email.project.backend.entity.Credential;
import com.email.project.backend.entity.security.UserDetailsImpl;
import com.email.project.backend.repository.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final CredentialRepository credentialRepository;

    @Autowired
    public UserDetailsServiceImpl(CredentialRepository credentialRepository) {
        this.credentialRepository = credentialRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Credential> credentialOptional = credentialRepository.findByEmail(username);
        if (!credentialOptional.isPresent()) {
            throw new UsernameNotFoundException(username);
        }

        return new UserDetailsImpl(credentialOptional.get());
    }
}
