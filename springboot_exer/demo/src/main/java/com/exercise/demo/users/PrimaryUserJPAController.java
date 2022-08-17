package com.exercise.demo.users;

import java.util.*;
import java.net.URI;
import java.math.BigDecimal;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.exercise.demo.exceptions.UserNotFoundException;

@RestController
public class PrimaryUserJPAController {

    @Autowired
    private PrimaryUserRepo primaryUserRepo;

    @Autowired
    private PostRepo postRepo;

    // CRUD methods for "PRIMARY_USERS"
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
    public ResponseEntity<Object> createUser(@Valid @RequestBody PrimaryUser user) {
        PrimaryUser savedUser = primaryUserRepo.save(user);
        URI destUri = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(savedUser.getId()).toUri();
        return ResponseEntity.created(destUri).build();
    }

    @DeleteMapping("/jpa/users/{id}")
    public ResponseEntity<PrimaryUser> deleteUserById(@PathVariable int id) { 
        Optional<PrimaryUser> user = primaryUserRepo.findById(id);
        if (!user.isPresent()) {
            throw new UserNotFoundException("Primary User id not found: " + id);
        }
        // check if the user has any posts
        
        primaryUserRepo.deleteById(id);
        return ResponseEntity.ok(user.get());
    }

    @PatchMapping("/jpa/users/{id}")
    public ResponseEntity<PrimaryUser> updateUserDepositById(
        @PathVariable int id, @RequestBody HashMap<String, BigDecimal> req
    ) { 
        Optional<PrimaryUser> user = primaryUserRepo.findById(id);
        if (!user.isPresent()) {
            throw new UserNotFoundException("Primary User id not found: " + id);
        }
        BigDecimal suppAmount = req.containsKey("amount") ? req.get("amount") : new BigDecimal(0);
        user.get().updateAmount(suppAmount);
        return ResponseEntity.ok(user.get());
    }

    // CRUD methods for "USER_POSTS"
    @GetMapping("/jpa/users/{id}/p")
    public ResponseEntity<List<Post>> getAllPostsByUserId(@PathVariable int id) {
        Optional<PrimaryUser> user = primaryUserRepo.findById(id);
        if (!user.isPresent()) {
            throw new UserNotFoundException("Primary User id not found: " + id);
        }
        return ResponseEntity.ok(user.get().getPosts());
    }

    @GetMapping("/jpa/users/{uid}/p/{pid}")
    public ResponseEntity<Post> getPostByUserIdAndPostId(
        @PathVariable int uid, @PathVariable int pid
    ) {
        Optional<PrimaryUser> user = primaryUserRepo.findById(uid);
        if (!user.isPresent()) {
            throw new UserNotFoundException("Primary User id not found: " + uid);
        }
        return ResponseEntity.ok(user.get().getPostById(pid));
    }
    
    @PostMapping("/jpa/users/{id}/p")
    public ResponseEntity<Object> createAPost(@PathVariable int id, @RequestBody Post post) {
        Optional<PrimaryUser> optUser = primaryUserRepo.findById(id);
        if (!optUser.isPresent()) {
            throw new UserNotFoundException("Primary User id not found: " + id);
        }
        PrimaryUser user = optUser.get();
        post.setUser(user);
        postRepo.save(post);
        URI destUri = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(post.getId()).toUri();
        return ResponseEntity.created(destUri).build();
    }

    @PatchMapping("/jpa/users/{uid}/p/{pid}")
    public ResponseEntity<Post> updatePostByUserIdAndPostId(
        @PathVariable int uid, @PathVariable int pid, @RequestBody HashMap<String, String> newTextObj
    ) { 
        Optional<PrimaryUser> optUser = primaryUserRepo.findById(uid);
        if (!optUser.isPresent()) {
            throw new UserNotFoundException("Primary User id not found: " + uid);
        }
        PrimaryUser user = optUser.get();
        Post matched_post = user.getPostById(pid);
        if (newTextObj.containsKey("text")) {
            matched_post.setText(newTextObj.get("text"));
            postRepo.deleteById(pid);
            postRepo.save(matched_post);
        }
        return ResponseEntity.ok(matched_post);
    }

    @DeleteMapping("/jpa/users/{uid}/p/{pid}")
    public ResponseEntity<Post> deletePostByUserIdAndPostId(@PathVariable int uid, @PathVariable int pid) { 
        Optional<PrimaryUser> optUser = primaryUserRepo.findById(uid);
        if (!optUser.isPresent()) {
            throw new UserNotFoundException("Primary User id not found: " + uid);
        }
        PrimaryUser user = optUser.get();
        Post matched_post = user.getPostById(pid);
        postRepo.deleteById(pid);
        return new ResponseEntity<>(matched_post, HttpStatus.CREATED);
    }

    @GetMapping("/jpa/users/p")
    public ResponseEntity<List<Post>> getAllPost() {
        return ResponseEntity.ok(postRepo.findAll());
    }

}
