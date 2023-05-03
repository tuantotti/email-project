package com.email.project.backend.service;

import com.email.project.backend.entity.Role;
import com.email.project.backend.entity.User;
import com.email.project.backend.repository.RoleRepository;
import com.email.project.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    public User saveUser(User user){
        log.info("Saving new user have mail {} to the database", user.getEmail());
        return userRepository.save(user);
    }
    public Role saveRole(Role role){
        log.info("Saving new role {} to the database", role.getName());
        return roleRepository.save(role);
    }
    public void addRoleToUser(String mail, String roleName){
        log.info("Adding role {} to user have mail {}", roleName,mail);
        User user=userRepository.findByEmail(mail);
        Role role=roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    public User getUser(String mail){
        log.info("Fetching user have mail {}",mail);
        return userRepository.findByEmail(mail);
    }
    public List<User>getUsers(){
        log.info("Fetching all users");
        return userRepository.findAll();
    }
}
