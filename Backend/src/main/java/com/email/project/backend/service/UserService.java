package com.email.project.backend.service;

import com.email.project.backend.entity.User;
import com.email.project.backend.dto.UserView;
import com.email.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository _userRepository;

    public UserView getUserInfo(int id){
        var user = _userRepository.getUserViewById(id);
        return user;
//        var res = new UserView();
//        res.loadFromUser(user);
//        return res;
    }

    public void update(User user){
        _userRepository.save(user);
    }

    public void create(User user){
        _userRepository.save(user);
    }

    public void inActive(User user){
        if (user.isActive()){
            user.setActive(false);
            _userRepository.save(user);
        }
    }

    public void active(User user){
        if (!user.isActive()){
            user.setActive(true);
            _userRepository.save(user);
        }
    }


}
