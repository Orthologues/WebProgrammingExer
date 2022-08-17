package com.exercise.demo.users;

import javax.persistence.Entity;
import javax.persistence.FetchType;
//import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.ManyToOne;

import io.swagger.annotations.ApiModel;

@Entity
@Table(name = "USER_POSTS")
@ApiModel(description="All posts of a primary user account ")
public class Post {
    @Id
    //@GeneratedValue
    private Integer pid;
    
    private String text;

    @ManyToOne(fetch=FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name="id", nullable=false)
    private PrimaryUser user;

    public Integer getId() {
        return this.pid;
    }

    public void setId(Integer pid) {
        this.pid = pid;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public PrimaryUser getUser() {
        return this.user;
    }

    public void setUser(PrimaryUser user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return String.format("ID: %d, Text: %s", pid, text);
    }
}
