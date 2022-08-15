package com.exercise.demo.users;

import java.util.Date;

import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description="All details about a USD user account ")
public class USDUser {

    private Integer id; // could be either int or null

    //@Size to validate an attribute's value between the attributes min and max
    @Size(min=2, max=20, message="Name should have between 2-20 characters!")
    @ApiModelProperty(notes="Name should have between 2-20 characters!")
    private String name;

    @Past(message="The registration date must be in the past!")
    @ApiModelProperty(notes="The registration date must be in the past!")
    private Date registrationDate;
    
    private String signedUpDate;

    private double USD;

    protected static final double minAmount = 4.99;
    protected static final double maxAmount = Math.pow(10, 8);

    public USDUser(Integer id, String name, Date registrationDate, String signedUpDate, double USD) {
        this.id = id;
        this.name = name;
        this.registrationDate = registrationDate;
        this.signedUpDate = signedUpDate;
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

    public double getUSD() {
        return this.USD;
    }

    public void setUSD(double USD) {
        this.USD = USD;
    }
    
    @Override
    public String toString() {
        return String.format("Bean [id=%s, name=%s, registrationDate=%s owns %.2f USD]", id, name, registrationDate, USD);
    }

}