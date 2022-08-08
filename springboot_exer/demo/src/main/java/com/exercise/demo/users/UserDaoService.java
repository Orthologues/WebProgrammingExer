package com.exercise.demo.users;

import java.util.*;
import org.springframework.stereotype.Component;

// "DAO" refers to "data access object"

@Component
public class UserDaoService {
    private static List<User> users = new ArrayList<>();
    private static int usersCount;
    private static HashMap<Integer, User> IdToUserInfoMap = new HashMap<>();

    static { // define static variables which would only be created with one instance
        users.add(new User(1, "Rasmus", new Date()));
        users.add(new User(2, "Hanna", new Date()));
        users.add(new User(3, "Erik", new Date()));
        usersCount = users.size();
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
        if (user.getId()==null) {
            user.setId(++usersCount);
        }
        users.add(user);
        IdToUserInfoMap.putIfAbsent(user.getId(), new User(user.getId(), user.getName(), user.getDate()));
        return user;
    }

    public User getUser(int id) {
        return IdToUserInfoMap.containsKey(id) ? IdToUserInfoMap.get(id) : null;
    }
}