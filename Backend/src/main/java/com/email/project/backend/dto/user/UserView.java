package com.email.project.backend.dto.user;

import com.email.project.backend.entity.User;
import lombok.Getter;

import java.util.Date;

@Getter
public class UserView {
    private int id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private Date createAt;

    private boolean active;

    public void loadFromUser(User user){
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.createAt = user.getCreateAt();
        this.active = user.isActive();
    }
}
