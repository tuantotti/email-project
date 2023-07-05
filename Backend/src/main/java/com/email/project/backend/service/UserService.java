package com.email.project.backend.service;

import com.email.project.backend.dto.*;
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
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    private final UserRepository _userRepository;
    private final PasswordEncoder passwordEncoder;

    private final CredentialRepository credentialRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final StorageService _storageService;

    @Autowired
    public UserService(UserRepository _userRepository, PasswordEncoder passwordEncoder, CredentialRepository credentialRepository, JwtService jwtService, AuthenticationManager authenticationManager, StorageService storageService) {
        this._userRepository = _userRepository;
        this.passwordEncoder = passwordEncoder;
        this.credentialRepository = credentialRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this._storageService = storageService;
    }

    public UserView getUserInfo(int id) {
        var user = _userRepository.getReferenceById(id);
        var res = new UserView();
        res.loadFromUser(user);
        return res;
    }

    public UserView getUserInfoByEmail(String email) {
        try {
            var user = _userRepository.getUserByEmail(email).get();
            var res = new UserView();
            res.loadFromUser(user);
            return res;
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found in system");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public User update(String email, UserEdit userEdit) {
        try {
            var user = _userRepository.getUserByEmail(email);
            var currentUser = user.get();
            userEdit.applyToUser(currentUser);
            return _userRepository.save(currentUser);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found in system");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public FileDto editAvatar(MultipartFile avatar) {
        // Get user from database
        String email = UserService.getCurrentUsername();
        Optional<User> userOptional = _userRepository.getUserByEmail(email);
        User user = null;
        if (userOptional.isPresent()) user = userOptional.get();

        // Edit file name to store
        String fileName = avatar.getOriginalFilename();
        String avatarFileName = null;
        long size = 0;
        if (fileName != null) {
            int extensionIndex = fileName.lastIndexOf(".");
            String extensionFile = fileName.substring(extensionIndex);
            String name = fileName.substring(0, extensionIndex);

            avatarFileName = name + "_" + System.currentTimeMillis() + extensionFile;
            size = avatar.getSize();

            // Save avatarPath to User database
            if (user != null) {
                user.setAvatarFileName(avatarFileName);
                _userRepository.save(user);
            }

            String avatarPath = _storageService.getAvatarFolder() + File.separator + avatarFileName;

            // Save avatar to file system
            _storageService.uploadFileToSystem(avatar, avatarPath);

        }
        return new FileDto(avatarFileName, size);
    }

    public User create(User user) {
        user.setActive(true);
        user.setCreateAt(new Date());

        Credential credential = new Credential();
        credential.setEmail(user.getEmail());
        credential.setPassword("1");
        credential.setUser(user);
        user.setCredential(credential);

        return _userRepository.save(user);
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

            return new JwtView(accessToken);

        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public User inActive(int id) {
        var user = _userRepository.getReferenceById(id);
        if (user.isActive()) {
            user.setActive(false);
            _userRepository.save(user);
        }
        return user;
    }

    public User active(int id) {
        var user = _userRepository.getReferenceById(id);
        if (!user.isActive()) {
            user.setActive(true);
            _userRepository.save(user);
        }
        return user;
    }

    public void changePassword(CredentialEditDto c) {
        Optional<Credential> credentialOptional = credentialRepository.findByEmail(c.getEmail());
        Credential credential = null;

        if (credentialOptional.isPresent()) credential = credentialOptional.get();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(c.getEmail(), c.getOldPassword())
            );

            if (credential != null) {
                if (c.getConfirmPassword().equals(c.getNewPassword())) {
                    String encodedPassword = passwordEncoder.encode(c.getNewPassword());
                    credential.setPassword(encodedPassword);
                }
                credentialRepository.save(credential);
            }
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong password!");
        } catch (Exception e) {
            throw new RuntimeException("New password and confirm password are not equals!");
        }
    }


    public JwtView authenticate(CredentialDto credentialDto) {
        try {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(credentialDto.getEmail(), credentialDto.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String accessToken = jwtService.generateAccessToken(userDetails);

            return new JwtView(accessToken);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong username or password");
        }
    }

    public JwtView refreshToken(JwtView jwtView) {
        boolean isExpiredAccessToken = jwtService.isExpired(jwtView.getAccessToken());
        String username = jwtService.extractUsernameFromToken(jwtView.getAccessToken());
        String newAccessToken = jwtView.getAccessToken();
        if (isExpiredAccessToken) {
            newAccessToken = jwtService.generateAccessToken(username);
        }
        if (isExpiredAccessToken) {
            newAccessToken = jwtService.generateAccessToken(username);
        }

        JwtView res = JwtView.builder()
                .accessToken(newAccessToken)
                .build();

        return res;
    }

    /**
     * @return get the username of request
     */
    public static String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        return email;
    }

    public String getCurrentAvatar() {
        String email = UserService.getCurrentUsername();
        Optional<User> userOptional = _userRepository.getUserByEmail(email);
        String avatarFileName = null;

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            avatarFileName = user.getAvatarFileName();
        }

        return avatarFileName;
    }


    public Resource getAvatarByEmail(String email) {
        Resource avatar = null;
        var user = _userRepository.getUserByEmail(email);
        String avatarFileName = user.get().getAvatarFileName();
        if (avatarFileName != null) {
            String avatarPath = _storageService.getAvatarFolder() + File.separator + avatarFileName;
            avatar = _storageService.loadFileAsResource(avatarPath);
        }

        return avatar;
    }

    public Resource getAvatar() {
        Resource avatar = null;
        try {
            String avatarFileName = getCurrentAvatar();
            if (avatarFileName != null) {
                String avatarPath = _storageService.getAvatarFolder() + File.separator + avatarFileName;
                avatar = _storageService.loadFileAsResource(avatarPath);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

        return avatar;
    }
}
