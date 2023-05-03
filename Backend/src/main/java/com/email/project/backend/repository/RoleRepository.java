package com.email.project.backend.repository;

import com.email.project.backend.entity.Role;
import com.email.project.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Integer> {
    Role findByName(String name);
}
