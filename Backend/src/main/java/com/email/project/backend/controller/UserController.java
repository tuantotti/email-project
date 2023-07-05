package com.email.project.backend.controller;

import com.email.project.backend.dto.CredentialEditDto;
import com.email.project.backend.dto.FileDto;
import com.email.project.backend.dto.user.UserEdit;
import com.email.project.backend.dto.user.UserView;
import com.email.project.backend.entity.User;
import com.email.project.backend.entity.security.UserDetailsImpl;
import com.email.project.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService _userService;

    @Autowired
    public UserController(UserService userService) {
        this._userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserView> getProfile() {
        var userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var email = userDetails.getUsername();
        var user = _userService.getUserInfoByEmail(email);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/edit")
    public ResponseEntity<UserView> editProfile(@RequestBody UserEdit userEdit) {
        var userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var email = userDetails.getUsername();
        var user = _userService.update(email, userEdit);
        var userView = new UserView();
        userView.loadFromUser(user);
        return ResponseEntity.ok(userView);
    }

    @GetMapping("/avatar")
    @ResponseBody
    public ResponseEntity<?> getAvatar(HttpServletRequest request) {
        Resource avatar = _userService.getAvatar();

        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + avatar.getFilename() + "\"";

        try {
            contentType = request.getServletContext().getMimeType(avatar.getFile().getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(avatar);
    }


    @GetMapping("/avatar/{email}")
    @ResponseBody
    public ResponseEntity<?> getAvatarByEmail(@PathVariable String email, HttpServletRequest request) {
        Resource avatar = _userService.getAvatarByEmail(email);

        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + avatar.getFilename() + "\"";

        try {
            contentType = request.getServletContext().getMimeType(avatar.getFile().getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(avatar);
    }

    @PostMapping("/edit/password")
    public ResponseEntity<Void> changePassword(@RequestBody CredentialEditDto credentialEditDto) {
        _userService.changePassword(credentialEditDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/edit/avatar")
    public ResponseEntity<FileDto> editAvatar(@ModelAttribute MultipartFile avatar) {
        FileDto fileDto = _userService.editAvatar(avatar);

        return new ResponseEntity<>(fileDto, HttpStatus.OK);
    }

    @PostMapping("/create")
    public User createProfile(@RequestBody User user) {
        try {
            _userService.create(user);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/inactive/{id}")
    public boolean inactiveProfile(@PathVariable(name = "id") int id) {
        try {
            _userService.inActive(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @PostMapping("/active/{id}")
    public boolean activeProfile(@PathVariable(name = "id") int id) {
        try {
            _userService.active(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
