package com.exercise.demo.users;

import java.util.*;
//import lombok.extern.slf4j.Slf4j; //testing
import org.springframework.stereotype.Component;
// "DAO" refers to "data access object"

//@Slf4j // to use the function "log.info(String msg)"
@Component
public class UserDaoService {
    // use a hashmap instead since its time complexity is O(1) instead of o(n)
    //private static List<User> users = new ArrayList<>();
    private static HashMap<Integer, User> IdToUserMap = new HashMap<>();

    static { // define static variables which would only be created with one instance
        IdToUserMap.putIfAbsent(1, new User(1, "Rasmus", new Date(), 100.5));
        IdToUserMap.putIfAbsent(2, new User(2, "Hanna", new Date(), 80.2));
        IdToUserMap.putIfAbsent(3, new User(3, "Erik", new Date(), 120.8));
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>(IdToUserMap.values());
        return users;
    }

    public HashMap<Integer, User> getAllUsersMap() {
        return IdToUserMap;
    }

    public User create(User user) {
        // user.getId() would be automatically set to zero if it's not specified
        //log.info(user.getId().toString()); //testing => 0
        final double minAmount = User.minAmount;
        final double maxAmount = User.maxAmount;
        final double USD = user.getUSD();
        if (USD < minAmount || USD > maxAmount) {
            throw new UserIllegalAmountException(user.getName(), minAmount, maxAmount);
        }
        Integer userId = user.getId();  
        //log.info(newId.toString()); //testing => 0
        int newId = (userId==null || userId==0) ? Collections.max(IdToUserMap.keySet())+1 : userId;
        if (user.getBirthdate()==null) {
            user.setBirthdate(new Date());
        }
        if (!IdToUserMap.containsKey(newId)) {
            user.setId(newId);
            IdToUserMap.putIfAbsent(newId, user);
        }
        return user;
    }

    public User getUserById(int id) {
        return IdToUserMap.containsKey(id) ? IdToUserMap.get(id) : null;
    }

    public User updateUserUSD(int id, double amount) {
        // checks the hashmap first
        if (IdToUserMap.containsKey(id)) {
            User user = IdToUserMap.get(id);
            final double updatedAmount = user.getUSD() + amount; 
            final double minAmount = User.minAmount;
            final double maxAmount = User.maxAmount;
            if (updatedAmount < minAmount || updatedAmount > maxAmount) {
                throw new UserIllegalAmountException(user.getName(), minAmount, maxAmount);
            }
            user.setUSD(updatedAmount);
            IdToUserMap.put(id, user);
            return user;
        } 
        return null;
    }

    public User deleteUserById(int id) {  
        // checks the hashmap first
        if (IdToUserMap.containsKey(id)) {
            User user = IdToUserMap.get(id);
            IdToUserMap.remove(id);
            return user;
        } 
        return null;
    }
}