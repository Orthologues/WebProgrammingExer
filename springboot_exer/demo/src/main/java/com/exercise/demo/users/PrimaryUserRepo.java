package com.exercise.demo.users;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PrimaryUserRepo extends JpaRepository<PrimaryUser, Integer> {
    
}
