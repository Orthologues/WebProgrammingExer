package com.exercise.demo.users;

import java.util.*;
import java.util.stream.Collectors;

//import lombok.extern.slf4j.Slf4j; //testing
import org.springframework.stereotype.Component;
import java.text.SimpleDateFormat;

//@Slf4j // to use the function "log.info(String msg)"
@Component
public class UserDaoService {
    // use a hashmap instead since its time complexity is O(1) instead of o(n)
    private static List<User> userList = new ArrayList<>();

    static { // define static variables which would only be created with one instance
        final Date newDate = new Date();
        userList.add(new User(1, "Rasmus", newDate, new SimpleDateFormat("yyyy-MM-dd").format(newDate), 100.5));
        userList.add(new User(2, "Hanna", newDate, new SimpleDateFormat("yyyy-MM-dd").format(newDate), 80.2));
        userList.add(new User(3, "Erik", newDate, new SimpleDateFormat("yyyy-MM-dd").format(newDate), 120.8));
        //log.info("UniqlyIdentifyUserList!" + userList.toString());
    }

    public String simpleDate(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }
    
    public List<User> getAllUsers() {
        return userList;
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
        List<Integer> allUserIds = userList.stream().map(el -> el.getId()).collect(Collectors.toList());
        int newId = (userId==null || userId==0) ? Collections.max(allUserIds)+1 : userId;
        final Date newDate = new Date();
        if (user.getRegistrationDate()==null) {
            user.setRegistrationDate(newDate);
        }
        if (user.getSignedUpDate()==null) {
            user.setSignedUpDate(simpleDate(newDate));
        }
        if (!allUserIds.contains(newId)) {
            user.setId(newId);
            userList.add(user);
        }
        return user;
    }

    public User getUserById(int id) {
        List<Integer> allUserIds = userList.stream().map(el -> el.getId()).collect(Collectors.toList());
        return allUserIds.contains(id) ? userList.get(allUserIds.indexOf(id)) : null;
    }

    public User updateUserUSD(int id, double amount) {
        // checks the hashmap first
        List<Integer> allUserIds = userList.stream().map(el -> el.getId()).collect(Collectors.toList());
        if (allUserIds.contains(id)) {
            int userInd = allUserIds.indexOf(id);
            User user = userList.get(userInd);
            final double updatedAmount = user.getUSD() + amount; 
            final double minAmount = User.minAmount;
            final double maxAmount = User.maxAmount;
            if (updatedAmount < minAmount || updatedAmount > maxAmount) {
                throw new UserIllegalAmountException(user.getName(), minAmount, maxAmount);
            }
            user.setUSD(updatedAmount);
            userList.set(userInd, user);
            return user;
        } 
        return null;
    }

    public User deleteUserById(int id) {  
        // checks the hashmap first
        List<Integer> allUserIds = userList.stream().map(el -> el.getId()).collect(Collectors.toList());
        if (allUserIds.contains(id)) {
            int userInd = allUserIds.indexOf(id);
            User user = userList.get(userInd);
            userList.remove(userInd);
            return user;
        } 
        return null;
    }
}