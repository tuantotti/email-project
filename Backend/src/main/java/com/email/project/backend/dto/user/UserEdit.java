package com.email.project.backend.dto.user;

import com.email.project.backend.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserEdit {
    private String firstName;

    private String lastName;

    private String phoneNumber;

    public void applyToUser(User user) throws Exception {
        if (firstName != null){
            user.setFirstName(firstName);
        }

        if (lastName != null){
            user.setLastName(lastName);
        }

        if (user.getFirstName().isEmpty() && user.getLastName().isEmpty()){
            throw new Exception("Both firstname and lastname is empty!");
        }

        if (phoneNumber != null){
            // TODO: validate phone number
            user.setPhoneNumber(phoneNumber);
        }
    }
}
