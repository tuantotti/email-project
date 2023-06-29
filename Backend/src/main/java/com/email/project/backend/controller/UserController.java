package com.email.project.backend.controller;

import com.email.project.backend.dto.CredentialEditDto;
import com.email.project.backend.dto.user.UserEdit;
import com.email.project.backend.dto.user.UserView;
import com.email.project.backend.entity.User;
import com.email.project.backend.entity.security.UserDetailsImpl;
import com.email.project.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/edit/password")
    public ResponseEntity<Void> changePassword(@RequestBody CredentialEditDto credentialEditDto) {
        _userService.changePassword(credentialEditDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/edit/avatar")
    public ResponseEntity<Void> editAvatar(@ModelAttribute MultipartFile avatar) {
        _userService.editAvatar(avatar);

        return new ResponseEntity<>(HttpStatus.OK);
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
