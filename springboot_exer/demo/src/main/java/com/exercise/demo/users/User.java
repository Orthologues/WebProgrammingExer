package com.exercise.demo.users;

import java.util.Date;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

public class User {
    private Integer id; // could be either int or null
    //@Size to validate an attribute's value between the attributes min and max
    @Size(min=2, max=20, message="Name should have between 2-20 characters!")
    private String name;
    @Past(message="The birthdate must be in the past!")
    private Date birthdate;

    protected User(int id, String name, Date birthdate) {
        super(); // no parent class at the moment
        this.id = id;
        this.name = name;
        this.birthdate = birthdate;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setDate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public Date getDate() {
        return birthdate;
    }
    
    @Override
    public String toString() {
        return String.format("Bean [id=%s, name=%s, birthdate=%s]", id, name, birthdate);
    }

}