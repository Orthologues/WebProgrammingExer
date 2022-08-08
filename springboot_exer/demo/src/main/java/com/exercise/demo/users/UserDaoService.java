package com.exercise.demo.users;

import java.util.*;
//import lombok.extern.slf4j.Slf4j; //testing
import org.springframework.stereotype.Component;
// "DAO" refers to "data access object"

//@Slf4j // to use the function "log.info(String msg)"
@Component
public class UserDaoService {
    private static List<User> users = new ArrayList<>();
    private static HashMap<Integer, User> IdToUserInfoMap = new HashMap<>();

    static { // define static variables which would only be created with one instance
        users.add(new User(1, "Rasmus", new Date()));
        users.add(new User(2, "Hanna", new Date()));
        users.add(new User(3, "Erik", new Date()));
        for (User user: users) {
            IdToUserInfoMap.putIfAbsent(user.getId(), new User(user.getId(), user.getName(), user.getDate()));
        }
    }

    public List<User> getAllUsers() {
        return users;
    }

    public HashMap<Integer, User> getAllUsersMap() {
        return IdToUserInfoMap;
    }

    public User save(User user) {
        // user.getId() would be automatically set to zero if it's not specified
        //log.info(user.getId().toString()); //testing => 0
        Integer userId = user.getId();  
        //log.info(newId.toString()); //testing => 0
        int newId = (userId==null || userId==0) ? Collections.max(IdToUserInfoMap.keySet())+1 : userId;
        if (user.getDate()==null) {
            user.setDate(new Date());
        }
        if (!IdToUserInfoMap.containsKey(newId)) {
            user.setId(newId);
            users.add(user);
            IdToUserInfoMap.putIfAbsent(newId, user);
        }
        return user;
    }

    public User getUser(int id) {
        return IdToUserInfoMap.containsKey(id) ? IdToUserInfoMap.get(id) : null;
    }
}