package com.email.project.backend.controller;

import com.email.project.backend.entity.User;
import com.email.project.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @RequestMapping("/create")
    public User createProfile(@RequestBody User user){
        try{
            _userService.create(user);
            return user;
        }
        catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }

    @PostMapping
    @RequestMapping("/inactive/{id}")
    public void inactiveProfile(){

    }

    @PostMapping
    @RequestMapping("/active/{id}")
    public void activeProfile(){

    }
}
