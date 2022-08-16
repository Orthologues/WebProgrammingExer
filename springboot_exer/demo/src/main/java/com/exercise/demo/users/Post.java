package com.exercise.demo.users;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;

import io.swagger.annotations.ApiModel;

@Entity
@Table(name = "USER_POSTS")
@ApiModel(description="All posts of a primary user account ")
public class Post {
    @Id
    @GeneratedValue
    private Integer id;
    
    private String text;

    @ManyToOne(fetch=FetchType.LAZY)
    private PrimaryUser user;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
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
        return String.format("ID: %d, Text: %s", id, text);
    }
}
