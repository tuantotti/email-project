package com.email.project.backend;

import com.email.project.backend.entity.Credential;
import com.email.project.backend.entity.security.UserDetailsImpl;
import com.email.project.backend.service.JwtService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private JwtService jwtService;

    @Test
    void test_generate_token() {
        Credential credential = Credential.builder().email("test").password("test").build();
        String key = jwtService.generateAccessToken(new UserDetailsImpl(credential));

        Assertions.assertNotNull(key);
    }

}
