package com.exercise.demo.users;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;

import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "PRIMARY_USERS")
@ApiModel(description="All details about a DKK user account ")
public class PrimaryUser {

    @Id
    // if we use '@GeneratedValue' decorator, the inserted users would start from id=1, thus automatically incrementing by 1 each
    @GeneratedValue
    private Integer id;
    //@Size to validate an attribute's value between the attributes min and max

    @Size(min=2, max=20, message="Name should have between 2-20 characters!")
    @ApiModelProperty(notes="Name should have between 2-20 characters!")
    private String name;

    @Column(name = "DEPOSIT")
    private float amount;

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

    public PrimaryUser(Integer id, String name, float amount, Currency currency) {
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

    public float getAmount() {
        return this.amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public Currency getCurrency() {
        return this.currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }    
    
    @Override
    public String toString() {
        return String.format("PrimaryUser [id=%s, name=%s, deposit=%.1f, currency=%s]", 
        id, name, amount, currency);
    }

}