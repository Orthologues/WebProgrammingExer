package com.exercise.demo.users;

import java.text.DecimalFormat;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) // which equals to 404
public class UserIllegalAmountException extends RuntimeException {
    public UserIllegalAmountException(String name, double min, double max, String currency) {
        super(String.join(" ", 
            "Illegal amount at", "the bank acount of", String.join("", name, "!"), 
            "The deposit must exceed",
            Double.toString(min), currency, "and do not exceed",
            new DecimalFormat("#").format(max), currency)
        );
    }
}

