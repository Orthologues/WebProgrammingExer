package com.exercise.demo.users;

import java.util.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class UserSource {

    @Autowired //allows Spring to resolve and inject collaborating beans into our bean
    private UserDaoService userService;

    //retrieve all users, i.e., GET /users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    //retrieve a user by ID, i.e., GET /users/{id}
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUser(id);
    }
}
