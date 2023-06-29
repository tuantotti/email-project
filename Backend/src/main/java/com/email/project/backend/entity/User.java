package com.email.project.backend.entity;

import com.email.project.backend.dto.user.UserView;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "users")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "create_at")
    private Date createAt;

    private boolean active;

    @OneToOne(mappedBy = "user")
    private Credential credential;

    @Column(name = "avatar_path")
    private String avatarPath;

    public UserView toUserView() {
        UserView userView = new UserView();
        userView.loadFromUser(this);
        return userView;
    }

}
