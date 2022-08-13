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

    //retrieve all users with USD or DKK account, i.e., GET /users
    @GetMapping("/users")
    public ResponseEntity<List<Object>> getAllUsers() {
        List<Object> allUsers = new ArrayList<>();
        allUsers.addAll(userService.getUSDUsers());
        allUsers.addAll(userService.getDKKUsers());
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    //retrieve all users with USD account (with params)
    @GetMapping(value="/users", params="currency=USD")
    public ResponseEntity<List<User>> getUSDUsers() {
        return new ResponseEntity<>(userService.getUSDUsers(), HttpStatus.OK);
    }

    //retrieve all users with DKK account (with params)
    @GetMapping(value="/users", params="currency=DKK")
    public ResponseEntity<List<DKKUser>> getDKKUsers() {
        return new ResponseEntity<>(userService.getDKKUsers(), HttpStatus.OK);
    }

    //retrieve a user by ID, i.e., GET /users/{id}
    @GetMapping(value="/users/{id}", params="currency=USD")
    // use EntityModel to implement HATEOAS which would include extra links
    public EntityModel<User> getUSDUserById(@PathVariable int id) {
        User user = userService.getUSDUserById(id);
        if (user==null) {
            throw new UserNotFoundException("id not found: " + id);
        }
        EntityModel<User> userModel = EntityModel.of(user);
        WebMvcLinkBuilder usersLinkBuilder = linkTo(methodOn(this.getClass()).getAllUsers());
        Link allUsersLink = usersLinkBuilder.withRel("All-users");
        userModel.add(allUsersLink);
        return userModel;
    }

    @PostMapping("/users")
    public ResponseEntity<String> createUSDUser(@Valid @RequestBody User user) {
        User savedUser = userService.createUSDUser(user);
        // respond the post sender with "application/json"
        // CREATED
        // /user/{id}   id=savedUser.getId()
        URI destUri = ServletUriComponentsBuilder. // A URI doesn't contain its protocol/domain like URL
            fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
        // respond the URI with status 201 with empty body
        HttpHeaders respHeaders = new HttpHeaders();
        respHeaders.setLocation(destUri);
        return new ResponseEntity<String>(savedUser.toString(), respHeaders, HttpStatus.CREATED);
    }

    @PostMapping(value="/users", headers="X-API-VERSION=2")
    public ResponseEntity<String> createDKKUser(@Valid @RequestBody DKKUser user) {
        DKKUser savedUser = userService.createDKKUser(user);
        // respond the post sender with "application/json"
        // CREATED
        // /user/{id}   id=savedUser.getId()
        URI destUri = ServletUriComponentsBuilder. // A URI doesn't contain its protocol/domain like URL
            fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
        // respond the URI with status 201 with empty body
        HttpHeaders respHeaders = new HttpHeaders();
        respHeaders.setLocation(destUri);
        return new ResponseEntity<String>(savedUser.toString(), respHeaders, HttpStatus.CREATED);
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

    @PatchMapping(value="/users/{id}", params="currency=DKK")
    // "ResponseEntity<User>" is essentially the same as "User" here
    public ResponseEntity<DKKUser> updateUserDKK(
        @PathVariable int id, 
        @RequestBody HashMap<String, Double> req
    ) { 
        DKKUser user = userService.updateUserDKK(id, req.get("amount"));
        if (user==null) {
            throw new UserNotFoundException("id not found for update: " + id);
        }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUSDUserById(@PathVariable int id) { 
        User user = userService.deleteUSDUserById(id);
        if (user==null) {
            throw new UserNotFoundException("id not found for deletion: " + id);
        } 
        return ResponseEntity.ok(user);
    }

    @DeleteMapping(value="/users/{id}", params="currency=DKK")
    public ResponseEntity<DKKUser> deleteDKKUserById(@PathVariable int id) { 
        DKKUser user = userService.deleteDKKUserById(id);
        if (user==null) {
            throw new UserNotFoundException("id not found for deletion: " + id);
        } 
        return ResponseEntity.ok(user);
    }

}
