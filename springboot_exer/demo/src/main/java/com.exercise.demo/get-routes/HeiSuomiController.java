package com.exercise.demo;

import java.util.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeiSuomiController {

    @RequestMapping(method = RequestMethod.GET, path="/hei-suomi")
    public String heiSuomi() {
        HashMap<Character, String> test_map = new HashMap<>();
        test_map.putIfAbsent('A', "Israel");
        test_map.putIfAbsent('B', "Hello");
        test_map.put('A', "Suomi!");
        test_map.put('B', "Hei");        
        List<String> map_vals = new ArrayList<>(test_map.values());
        Collections.reverse(map_vals);
        return String.join(" ", map_vals);
    }
    
}