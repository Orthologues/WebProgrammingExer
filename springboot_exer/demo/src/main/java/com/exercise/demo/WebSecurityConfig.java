package com.exercise.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.savedrequest.NullRequestCache;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.httpBasic().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
        .authorizeRequests()
			.antMatchers(HttpMethod.GET, "/").permitAll() // allow guest users
		    .antMatchers(HttpMethod.GET, "/hei-suomi/**").permitAll()
			.antMatchers(HttpMethod.GET, "/users/**").authenticated()
            .antMatchers(HttpMethod.POST, "/users/**").hasAnyRole("ADMIN", "USER")
		    .antMatchers(HttpMethod.PUT, "/users/**").authenticated()
            .antMatchers(HttpMethod.PATCH, "/users/**").authenticated()
            .antMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN").and()
        .requestCache().requestCache(new NullRequestCache()).and()
        .cors().and()
        .csrf().disable();
        return httpSecurity.build();
    }

}