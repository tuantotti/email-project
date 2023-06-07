package com.email.project.backend.repository;

import com.email.project.backend.dto.user.UserView;
import com.email.project.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    UserView getUserViewById(int id);
}
