package com.email.project.backend.controller;

import com.email.project.backend.dto.CredentialEditDto;
import com.email.project.backend.dto.user.UserEdit;
import com.email.project.backend.dto.user.UserView;
import com.email.project.backend.entity.Credential;
import com.email.project.backend.entity.User;
import com.email.project.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService _userService;

    @Autowired
    public UserController(UserService userService) {
        this._userService = userService;
    }

    @GetMapping("{id}")
    public UserView getProfile(@PathVariable(name = "id") int id) {
        try {
            var user = _userService.getUserInfo(id);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/edit/{id}")
    public void editProfile(@PathVariable(name = "id") int id, UserEdit userEdit) {
        try {
            _userService.update(id, userEdit);
        } catch (Exception e) {
            e.printStackTrace();
        }
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

    @PostMapping("/edit/password")
    public ResponseEntity<Credential> changePassword(@RequestBody CredentialEditDto credentialEditDto) {
        Credential credential = _userService.changePassword(credentialEditDto);
        return ResponseEntity.ok(credential);
    }
}
