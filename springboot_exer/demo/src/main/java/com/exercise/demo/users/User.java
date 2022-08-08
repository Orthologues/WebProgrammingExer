package com.exercise.demo.users;

import java.util.Date;

public class User {
    private Integer id; // could be either int or null
    private String name;
    private Date birthdate;

    public User(int id, String name, Date birthdate) {
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