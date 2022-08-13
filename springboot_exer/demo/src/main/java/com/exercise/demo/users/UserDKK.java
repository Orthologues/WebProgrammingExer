package com.exercise.demo.users;

import java.util.Date;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFilter("RawDateFilter")
public class UserDKK {

    @JsonProperty("id")
    private Integer id; // could be either int or null

    @JsonProperty("name")
    //@Size to validate an attribute's value between the attributes min and max
    @Size(min=2, max=20, message="Name should have between 2-20 characters!")
    private String name;

    @JsonProperty("registrationDate")
    @Past(message="The registration date must be in the past!")
    private Date registrationDate;
    
    @JsonProperty("signedUpDate")
    private String signedUpDate;

    @JsonProperty("DKK")
    private double DKK;

    protected static final double minAmount = 30;
    protected static final double maxAmount = 7 * Math.pow(10, 8);

    public UserDKK(Integer id, String name, Date registrationDate, String signedUpDate, double DKK) {
        this.id = id;
        this.name = name;
        this.registrationDate = registrationDate;
        this.signedUpDate = signedUpDate;
        this.DKK = DKK;
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

    public Date getRegistrationDate() {
        return this.registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getSignedUpDate() {
        return this.signedUpDate;
    }

    public void setSignedUpDate(String signedUpDate) {
        this.signedUpDate = signedUpDate;
    }

    public double getDKK() {
        return this.DKK;
    }

    public void setDKK(double DKK) {
        this.DKK = DKK;
    }
    
    @Override
    public String toString() {
        return String.format("Bean [id=%s, name=%s, registrationDate=%s owns %.1f DKK]", id, name, registrationDate, DKK);
    }

}