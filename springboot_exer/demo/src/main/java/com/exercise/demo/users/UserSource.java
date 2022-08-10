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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpHeaders;
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
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    //retrieve a user by ID, i.e., GET /users/{id}
    @GetMapping("/users/{id}")
    // use EntityModel to implement HATEOAS which would include extra links
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

    @PostMapping("/users")
    public ResponseEntity<Object> createUser(@Valid @RequestBody User user) {
        User savedUser = userService.create(user);
        // respond the post sender with "application/json"
        // CREATED
        // /user/{id}   id=savedUser.getId()
        URI destUri = ServletUriComponentsBuilder. // A URI doesn't contain its protocol/domain like URL
            fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
        // respond the URI with status 201 with empty body
        HttpHeaders respHeaders = new HttpHeaders();
        respHeaders.setLocation(destUri);
        return new ResponseEntity<>(savedUser, respHeaders, HttpStatus.CREATED);
    }

    @PatchMapping("/users/{id}")
    // "ResponseEntity<User>" is essentially the same as "User" here
    public ResponseEntity<User> updateUserUSD(
        @PathVariable int id, 
        @RequestBody HashMap<String, Double> req
    ) { 
        User user = userService.updateUserUSD(id, req.get("amount"));
        if (user==null) {
            throw new UserNotFoundException("id not found for update: " + id);
        }
        return ResponseEntity.ok(user);
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

}
