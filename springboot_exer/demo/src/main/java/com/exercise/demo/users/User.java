package com.exercise.demo.users;

import java.util.Date;

public class User {
    private Integer id; // could be either int or null
    private String name;
    private Date date;

    public User(int id, String name, Date date) {
        super(); // no parent class at the moment
        this.id = id;
        this.name = name;
        this.date = date;
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

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public String toString() {
        return String.format("Bean [id=%s, name=%s, date=%s]", id, name, date);
    }

}