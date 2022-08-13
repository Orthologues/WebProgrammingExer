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
    private static List<DKKUser> dkkUserList = new ArrayList<>();

    static { // define static variables which would only be created with one instance
        final Date newDate = new Date();
        userList.add(new User(1, "Rasmus", newDate, new SimpleDateFormat("yyyy-MM-dd").format(newDate), 100.5));
        userList.add(new User(2, "Anna", newDate, new SimpleDateFormat("yyyy-MM-dd").format(newDate), 80.2));
        userList.add(new User(3, "Erik", newDate, new SimpleDateFormat("yyyy-MM-dd").format(newDate), 120.8));
        dkkUserList.add(new DKKUser(1, "Mads", newDate, new SimpleDateFormat("yyyy-MM-dd").format(newDate), 1500.2));
        dkkUserList.add(new DKKUser(2, "Hanne", newDate, new SimpleDateFormat("yyyy-MM-dd").format(newDate), 2000.2));
        //log.info("UniqlyIdentifyUserList!" + dkkUserList.toString());
    }

    public String simpleDate(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }
    
    public List<User> getUSDUsers() {
        return userList;
    }

    public List<DKKUser> getDKKUsers() {
        return dkkUserList;
    }

    public User createUSDUser(User user) {
        // user.getId() would be automatically set to zero if it's not specified
        //log.info(user.getId().toString()); //testing => 0
        final double minAmount = User.minAmount;
        final double maxAmount = User.maxAmount;
        final double USD = user.getUSD();
        if (USD < minAmount || USD > maxAmount) {
            throw new UserIllegalAmountException(user.getName(), minAmount, maxAmount, "USD");
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

    public DKKUser createDKKUser(DKKUser user) {
        // user.getId() would be automatically set to zero if it's not specified
        //log.info(user.getId().toString()); //testing => 0
        final double minAmount = DKKUser.minAmount;
        final double maxAmount = DKKUser.maxAmount;
        final double DKK = user.getDKK();
        if (DKK < minAmount || DKK > maxAmount) {
            throw new UserIllegalAmountException(user.getName(), minAmount, maxAmount, "DKK");
        }
        Integer userId = user.getId();  
        //log.info(newId.toString()); //testing => 0
        List<Integer> allUserIds = dkkUserList.stream().map(el -> el.getId()).collect(Collectors.toList());
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
            dkkUserList.add(user);
        }
        return user;
    }

    public User getUSDUserById(int id) {
        List<Integer> allUserIds = userList.stream().map(el -> el.getId()).collect(Collectors.toList());
        return allUserIds.contains(id) ? userList.get(allUserIds.indexOf(id)) : null;
    }

    public DKKUser getDKKUserById(int id) {
        List<Integer> allUserIds = dkkUserList.stream().map(el -> el.getId()).collect(Collectors.toList());
        return allUserIds.contains(id) ? dkkUserList.get(allUserIds.indexOf(id)) : null;
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
                throw new UserIllegalAmountException(user.getName(), minAmount, maxAmount, "USD");
            }
            user.setUSD(updatedAmount);
            userList.set(userInd, user);
            return user;
        } 
        return null;
    }

    public DKKUser updateUserDKK(int id, double amount) {
        // checks the hashmap first
        List<Integer> allUserIds = dkkUserList.stream().map(el -> el.getId()).collect(Collectors.toList());
        if (allUserIds.contains(id)) {
            int userInd = allUserIds.indexOf(id);
            DKKUser user = dkkUserList.get(userInd);
            final double updatedAmount = user.getDKK() + amount; 
            final double minAmount = DKKUser.minAmount;
            final double maxAmount = DKKUser.maxAmount;
            if (updatedAmount < minAmount || updatedAmount > maxAmount) {
                throw new UserIllegalAmountException(user.getName(), minAmount, maxAmount, "DKK");
            }
            user.setDKK(updatedAmount);
            dkkUserList.set(userInd, user);
            return user;
        } 
        return null;
    }

    public User deleteUSDUserById(int id) {  
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

    public DKKUser deleteDKKUserById(int id) {  
        // checks the hashmap first
        List<Integer> allUserIds = dkkUserList.stream().map(el -> el.getId()).collect(Collectors.toList());
        if (allUserIds.contains(id)) {
            int userInd = allUserIds.indexOf(id);
            DKKUser user = dkkUserList.get(userInd);
            dkkUserList.remove(userInd);
            return user;
        } 
        return null;
    }
}