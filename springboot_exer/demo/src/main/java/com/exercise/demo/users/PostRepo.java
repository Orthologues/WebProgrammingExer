package com.exercise.demo.users;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepo extends JpaRepository<Post, Integer> {
    @Transactional
    @Modifying(clearAutomatically=true, flushAutomatically=true)
    @Query(value="UPDATE POSTS SET text = :newtext WHERE pid = :pid", nativeQuery = true)
    void updateTextByPid (@Param("pid") Integer pid, @Param("newtext") String newtext);

    @Transactional
    @Modifying(clearAutomatically=true, flushAutomatically=true)
    @Query(value="DELETE FROM POSTS WHERE id = :uid", nativeQuery = true)
    void deleteAllPostsByUid(@Param("uid") Integer uid);
}
