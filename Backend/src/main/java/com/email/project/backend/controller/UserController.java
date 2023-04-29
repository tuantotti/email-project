package com.email.project.backend.controller;

import com.email.project.backend.dto.UserCreateDto;
import com.email.project.backend.dto.UserView;
import com.email.project.backend.entity.User;
import com.email.project.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private UserService _userService;

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
    public void editProfile(User user) {

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

    @PostMapping("/signup")
    public UserCreateDto signup(@RequestBody UserCreateDto userCreateDto) {
        try {
            _userService.create(userCreateDto);
            return userCreateDto;
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
