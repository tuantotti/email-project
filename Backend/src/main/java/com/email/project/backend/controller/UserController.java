package com.email.project.backend.controller;

import com.email.project.backend.entity.User;
import com.email.project.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private UserService _userService;

    @Autowired
    public UserController(UserService userService){
        this._userService = userService;
    }

    @GetMapping
    @RequestMapping("{id}")
    public User getProfile(){
        return new User();
    }

    @PostMapping
    @RequestMapping("/edit/{id}")
    public void editProfile(User user){

    }

    @PostMapping
    @RequestMapping("/create/{id}")
    public void createProfile(User user){

    }

    @PostMapping
    @RequestMapping("{id}")
    public void inactiveProfile(){

    }

    @PostMapping
    @RequestMapping("{id}")
    public void activeProfile(){

    }
}
