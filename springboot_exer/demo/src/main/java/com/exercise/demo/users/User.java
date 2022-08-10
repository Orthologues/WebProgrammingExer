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
    private double USD;
    protected static final double minAmount = 4.99;
    protected static final double maxAmount = Math.pow(10, 8);

    protected User(int id, String name, Date birthdate, double USD) {
        super(); // no parent class at the moment
        this.id = id;
        this.name = name;
        this.birthdate = birthdate;
        this.USD = USD;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthdate() {
        return this.birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public double getUSD() {
        return this.USD;
    }

    public void setUSD(double USD) {
        this.USD = USD;
    }
    
    @Override
    public String toString() {
        return String.format("Bean [id=%s, name=%s, birthdate=%s]", id, name, birthdate);
    }

}