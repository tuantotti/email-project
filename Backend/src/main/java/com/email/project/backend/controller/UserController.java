package com.email.project.backend.controller;

import com.email.project.backend.dto.Response;
import com.email.project.backend.dto.user.UserEdit;
import com.email.project.backend.dto.user.UserView;
import com.email.project.backend.entity.User;
import com.email.project.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Response<UserView> getProfile(@PathVariable(name = "id") int id) {
        try {
            var user = _userService.getUserInfo(id);
            return Response.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return Response.fail("Something went wrong!");
        }
    }

    @PostMapping("/edit/{id}")
    public Response<UserView> editProfile(@PathVariable(name = "id") int id, UserEdit userEdit) {
        try {
            User user = _userService.update(id, userEdit);
            return Response.ok(user.toUserView(), "User edited successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return Response.fail();
        }
    }

//    @PostMapping("/create")
//    public Response<UserView> createProfile(@RequestBody User user) {
//        try {
//            User newUser = _userService.create(user);
//            return Response.ok(newUser.toUserView(), "User created successfully!");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }

    @PostMapping("/inactive/{id}")
    public Response<Object> inactiveProfile(@PathVariable(name = "id") int id) {
        try {
            _userService.inActive(id);
            return Response.ok(null, "Inactive!");
        } catch (Exception e) {
            e.printStackTrace();
            return Response.fail();
        }
    }

    @PostMapping("/active/{id}")
    public Response<Object> activeProfile(@PathVariable(name = "id") int id) {
        try {
            _userService.active(id);
            return Response.ok(null, "Active!");
        } catch (Exception e) {
            e.printStackTrace();
            return Response.fail();
        }
    }
}
