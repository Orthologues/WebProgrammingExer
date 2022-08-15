package com.exercise.demo.exceptions;

import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


//@RestController is a specialized version of the controller. 
//It includes the @Controller and @ResponseBody
@RestController
@ControllerAdvice //render the controller available to all other controllers
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleGeneric(Exception excp, WebRequest req) {
        ExceptionResponse excepResp = new ExceptionResponse(
            new Date(), 
            excp.getMessage(), 
            req.getDescription(false)
        );
        // returns to 502, only for testing
        // eliminate "handleUserNotFoundException" to test the general exception handler here
        //return new ResponseEntity<Object>(excepResp, HttpStatus.BAD_GATEWAY);
        return new ResponseEntity<Object>(excepResp, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public final ResponseEntity<Object> handleUserNotFound(UserNotFoundException excp, 
        WebRequest req) {
        ExceptionResponse excepResp = new ExceptionResponse(
            new Date(), 
            excp.getMessage(), 
            req.getDescription(false)
        );
        // returns to 402, only for testing
        //return new ResponseEntity<Object>(excepResp, HttpStatus.PAYMENT_REQUIRED); 
        //returns to 500
        return new ResponseEntity<Object>(excepResp, HttpStatus.NOT_FOUND); 
    }

    @Override
    //the following decorator is unnecessary since this method already exists. Just override it.
    //@ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        MethodArgumentNotValidException excp, 
        HttpHeaders headers, 
        HttpStatus status,
        WebRequest req) {
        ExceptionResponse excepResp = new ExceptionResponse(
            new Date(), 
            "Validation failed", 
            excp.getBindingResult().toString()
        );
        return new ResponseEntity<>(excepResp, HttpStatus.BAD_REQUEST); //returns to 400
    }
    
}
