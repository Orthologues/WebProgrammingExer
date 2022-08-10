package com.exercise.demo.users;

import java.util.*;

import javax.validation.Valid;
import java.net.URI;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
//static imports reduces code redundancy and improves readability
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class UserSource {

    @Autowired //allows Spring to resolve and inject collaborating beans into our bean
    private UserDaoService userService;

    //retrieve all users, i.e., GET /users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        // returns to 203 only for testing
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }

    //retrieve a user by ID, i.e., GET /users/{id}
    @GetMapping("/users/{id}")
    public EntityModel<User> getUserById(@PathVariable int id) {
        User user = userService.getUserById(id);
        if (user==null) {
            throw new UserNotFoundException("id not found: " + id);
        }
        EntityModel<User> userModel = EntityModel.of(user);
        WebMvcLinkBuilder usersLinkBuilder = linkTo(methodOn(this.getClass()).getAllUsers());
        Link allUsersLink = usersLinkBuilder.withRel("All-users");
        userModel.add(allUsersLink);
        int latestAddedUserId = userService.getAllUsers().get(userService.getAllUsers().size() - 1).getId();
        Link latestAddedUserLink = linkTo(methodOn(this.getClass()).getUserById(latestAddedUserId)).withRel("Latest-added-user");
        userModel.add(latestAddedUserLink);
        return userModel;
    }

    @DeleteMapping("/users/{id}")
    // "ResponseEntity<User>" is essentially the same as "User" here
    public ResponseEntity<User> deleteUserById(@PathVariable int id) { 
        User user = userService.deleteUserById(id);
        if (user==null) {
            throw new UserNotFoundException("id not found for deletion: " + id);
        } 
        return ResponseEntity.ok(user);
    }

    @PostMapping("/users")
    public ResponseEntity<Object> createUser(@Valid @RequestBody User user) {
        User savedUser = userService.save(user);
        // respond the post sender with "application/json"
        // CREATED
        // /user/{id}   id=savedUser.getId()
        URI destUri = ServletUriComponentsBuilder. // A URI doesn't contain its protocol/domain like URL
            fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
        return ResponseEntity.created(destUri).build(); // respond the URI with status 201
    }
}
