package com.exercise.demo.users;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "PRIMARY_USERS")
@ApiModel(description="All details about a DKK user account ")
public class PrimaryUser {

    @Id
    @GeneratedValue
    private Integer id; // could be either int or null
    //@Size to validate an attribute's value between the attributes min and max

    @Size(min=2, max=20, message="Name should have between 2-20 characters!")
    @ApiModelProperty(notes="Name should have between 2-20 characters!")
    private String name;
    private String signedUpDate;

    public PrimaryUser(Integer id, String name, String signedUpDate) {
        this.id = id;
        this.name = name;
        this.signedUpDate = signedUpDate;
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

    public String getSignedUpDate() {
        return this.signedUpDate;
    }

    public void setSignedUpDate(String signedUpDate) {
        this.signedUpDate = signedUpDate;
    }
    
    @Override
    public String toString() {
        return String.format("Bean [id=%s, name=%s, signedUpDate=%s]", id, name, signedUpDate);
    }

}