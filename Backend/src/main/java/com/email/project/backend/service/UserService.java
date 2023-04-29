package com.email.project.backend.service;

import com.email.project.backend.dto.UserCreateDto;
import com.email.project.backend.dto.UserView;
import com.email.project.backend.entity.Credential;
import com.email.project.backend.entity.User;
import com.email.project.backend.repository.CredentialRepository;
import com.email.project.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    private UserRepository _userRepository;
    private PasswordEncoder passwordEncoder;

    private CredentialRepository credentialRepository;

    @Autowired
    public UserService(UserRepository _userRepository, PasswordEncoder passwordEncoder, CredentialRepository credentialRepository) {
        this._userRepository = _userRepository;
        this.passwordEncoder = passwordEncoder;
        this.credentialRepository = credentialRepository;
    }

    public UserView getUserInfo(int id) {
        var user = _userRepository.getReferenceById(id);
        var res = new UserView();
        res.loadFromUser(user);
        return res;
    }

    public void update(User user) {
        _userRepository.save(user);
    }

    public void create(User user) {
        user.setActive(true);
        user.setCreateAt(new Date());

        Credential credential = new Credential();
        credential.setEmail(user.getEmail());
        credential.setPassword("1");
        credential.setUser(user);
        user.setCredential(credential);

        _userRepository.save(user);
    }

    public void create(UserCreateDto userCreateDto) {
        User user = User.builder()
                .firstName(userCreateDto.getFirstName())
                .lastName(userCreateDto.getLastName())
                .phoneNumber(userCreateDto.getPhoneNumber())
                .email(userCreateDto.getEmail())
                .active(true)
                .createAt(new Date())
                .build();

        String encodedPassword = passwordEncoder.encode(userCreateDto.getPassword());
        Credential credential = Credential.builder()
                .email(userCreateDto.getEmail())
                .password(encodedPassword)
                .user(user)
                .build();

        try {
            credentialRepository.save(credential);
        } catch (DataAccessException e) {
            log.error(e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    public void inActive(int id) {
        var user = _userRepository.getReferenceById(id);
        if (user.isActive()) {
            user.setActive(false);
            _userRepository.save(user);
        }
    }

    public void active(int id) {
        var user = _userRepository.getReferenceById(id);
        if (!user.isActive()) {
            user.setActive(true);
            _userRepository.save(user);
        }
    }


}
