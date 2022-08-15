package com.exercise.demo.users;

import java.util.*;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.exercise.demo.exceptions.UserNotFoundException;

@RestController
public class PrimaryUserJPAController {

    @Autowired
    private PrimaryUserRepo primaryUserRepo;

    //retrieve all users with USD or DKK account, i.e., GET /jpa/users
    @GetMapping("/jpa/users")
    public ResponseEntity<List<PrimaryUser>> getAllUsers() {
        return ResponseEntity.ok(primaryUserRepo.findAll());
    }

    //retrieve a user by ID, i.e., GET /jpa/users/{id}
    @GetMapping(value="/jpa/users/{id}")
    // use EntityModel to implement HATEOAS which would include extra links
    public ResponseEntity<PrimaryUser> getUserById(@PathVariable int id) {
        Optional<PrimaryUser> user = primaryUserRepo.findById(id);
        if (!user.isPresent()) {
            throw new UserNotFoundException("Primary User id not found: " + id);
        }
        return ResponseEntity.ok(user.get());
    }

    @PostMapping("/jpa/users")
    public ResponseEntity<PrimaryUser> createUSDUser(@Valid @RequestBody PrimaryUser user) {
        PrimaryUser savedUser = primaryUserRepo.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/jpa/users/{id}")
    public void deleteUSDUserById(@PathVariable int id) { 
        primaryUserRepo.deleteById(id);
    }

}
