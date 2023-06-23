package com.email.project.backend.service;

import com.email.project.backend.dto.CredentialDto;
import com.email.project.backend.dto.JwtView;
import com.email.project.backend.dto.UserCreateDto;
import com.email.project.backend.dto.user.UserEdit;
import com.email.project.backend.dto.user.UserView;
import com.email.project.backend.entity.Credential;
import com.email.project.backend.entity.User;
import com.email.project.backend.entity.security.UserDetailsImpl;
import com.email.project.backend.exception.UserAlreadyExistException;
import com.email.project.backend.repository.CredentialRepository;
import com.email.project.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Service
@Slf4j
public class UserService {

    private final UserRepository _userRepository;
    private final PasswordEncoder passwordEncoder;

    private final CredentialRepository credentialRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository _userRepository, PasswordEncoder passwordEncoder, CredentialRepository credentialRepository, JwtService jwtService, AuthenticationManager authenticationManager) {
        this._userRepository = _userRepository;
        this.passwordEncoder = passwordEncoder;
        this.credentialRepository = credentialRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public UserView getUserInfo(int id) {
        var user = _userRepository.getReferenceById(id);
        var res = new UserView();
        res.loadFromUser(user);
        return res;
    }

    public void update(int id, UserEdit userEdit) throws Exception {
        var user = _userRepository.getReferenceById(id);
        userEdit.applyToUser(user);
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

    public JwtView create(UserCreateDto userCreateDto) {
        if (credentialRepository.findByEmail(userCreateDto.getEmail()).isPresent()) {
            log.error("user " + userCreateDto.getEmail() + " already exists");
            throw new UserAlreadyExistException(userCreateDto.getEmail());
        }
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
            UserDetails userDetails = new UserDetailsImpl(credential);
            String accessToken = jwtService.generateAccessToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            return new JwtView(accessToken, refreshToken);

        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
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


    public JwtView authenticate(CredentialDto credentialDto) {
        try {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(credentialDto.getEmail(), credentialDto.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String accessToken = jwtService.generateAccessToken(userDetails);
            String refreshToken = jwtService.generateRefreshToken(userDetails);

            return new JwtView(accessToken, refreshToken);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong username or password");
        }
    }

    public JwtView refreshToken(JwtView jwtView) {
        boolean isExpiredAccessToken = jwtService.validateToken(jwtView.getAccessToken());
        boolean isExpiredRefreshToken = jwtService.validateToken(jwtView.getRefreshToken());
        String username = jwtService.extractUsernameFromToken(jwtView.getAccessToken());
        if (isExpiredAccessToken && !isExpiredRefreshToken) {
            var newAccessToken = jwtService.generateAccessToken(username);

            return JwtView.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(jwtView.getRefreshToken())
                    .build();
        }

        String accessToken = jwtService.generateAccessToken(username);
        String refreshToken = jwtService.generateRefreshToken(username);

        return JwtView.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
