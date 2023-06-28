package com.email.project.backend.dto.user;

import com.email.project.backend.entity.User;
import com.email.project.backend.service.StorageService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.core.io.Resource;

import java.io.File;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class UserView {
    private int id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private Date createAt;

    private boolean active;

    private File avatar;


    public void loadFromUser(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.createAt = user.getCreateAt();
        this.active = user.isActive();
    }
}
