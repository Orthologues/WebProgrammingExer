package com.exercise.demo.users;

import java.util.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
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
    public void getUserById(@PathVariable int id) {
        User user = userService.getUser(id);
        if (user==null) {
            throw new UserNotFoundException("id not found: " + id);
        }
    }

    @PostMapping("/users")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        User savedUser = userService.save(user);
        // respond the post sender with "application/json"
        // CREATED
        // /user/{id}   id=savedUser.getId()
        URI destUri = ServletUriComponentsBuilder. // A URI doesn't contain its protocol/domain like URL
            fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
        return ResponseEntity.created(destUri).build(); // respond the URI with status 201
    }
}
