package com.exercise.demo.getroutes;

import java.util.*;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeiSuomiController {

    @GetMapping("/hei-suomi-bean")
    public HeiSuomiBean heiSuomiBean() {
        HashMap<Character, String> test_map = new HashMap<>();
        test_map.putIfAbsent('A', "Israel");
        test_map.putIfAbsent('B', "Hello");
        test_map.put('A', "Suomi!");
        test_map.put('B', "Hei");        
        List<String> map_vals = new ArrayList<>(test_map.values());
        Collections.reverse(map_vals);
        HeiSuomiBean test_bean = new HeiSuomiBean("israel");
        test_bean.setMsg(String.join(" ", map_vals));
        return test_bean;
    }
    
}