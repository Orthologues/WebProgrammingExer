package com.exercise.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PostIdNotFoundException extends RuntimeException {

    //PostIdNotFoundException(this.id, name, id)
    public PostIdNotFoundException(int userId, String userName, int postId) {
        super(String.format("Post ID=%d is non-exisistent for user ID=%d with a name as '%s'", postId, userId, userName));
    }
    
}
