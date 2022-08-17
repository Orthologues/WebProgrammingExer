package com.exercise.demo.users;

import java.util.*;
import com.exercise.demo.exceptions.PostIdNotFoundException;
import java.util.stream.Collectors;
import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;

import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "PRIMARY_USERS")
@ApiModel(description="All details about a primary user account ")
public class PrimaryUser {

    @Id
    // if we use '@GeneratedValue' decorator, the inserted users would start from id=1, thus automatically incrementing by 1 each
    @GeneratedValue
    private Integer id;
    //@Size to validate an attribute's value between the attributes min and max

    @Size(min=2, max=20, message="Name should have between 2-20 characters!")
    @ApiModelProperty(notes="Name should have between 2-20 characters!")
    private String name;

    private BigDecimal amount;

    public enum Currency { //
        USD,
        EUR,
        DKK,
        SEK,
        NOK,
        CHF,
        PLN,
        JPY
    }

    @Enumerated(EnumType.STRING)
    private Currency currency;

    @OneToMany(mappedBy="user")
    private List<Post> posts;

    public PrimaryUser(Integer id, String name, BigDecimal amount, Currency currency) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.currency = currency;
    }

    public PrimaryUser() {
        super();
    }

    @Override
	public int hashCode() {
		return Objects.hash(id, name, currency, amount);
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

    public BigDecimal getAmount() {
        return this.amount;
    }

    public void updateAmount(BigDecimal suppAmount) {
        this.amount = this.amount.add(suppAmount);
    }

    public Currency getCurrency() {
        return this.currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public List<Post> getPosts() {
        return this.posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public Post getPostById(int id) {
        List<Post> matchedPosts = posts.stream().filter(post -> post.getId()==id).collect(Collectors.toList());
        if (matchedPosts.size() == 0) {
            throw new PostIdNotFoundException(this.id, name, id);
        }
        return matchedPosts.get(0);
    }
    
    @Override
    public String toString() {
        return String.format("PrimaryUser [id=%s, name=%s, deposit=%.1f, currency=%s]", 
        id, name, amount, currency);
    }

}