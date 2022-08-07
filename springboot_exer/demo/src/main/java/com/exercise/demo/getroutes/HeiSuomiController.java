package com.exercise.demo.getroutes;

import java.util.*;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeiSuomiController {
    
    HashMap<Character, String> test_map;
    List<String> map_vals;

    HeiSuomiController() { //controller
        test_map = new HashMap<>();
        test_map.putIfAbsent('A', "Israel");
        test_map.putIfAbsent('B', "Hello");
        test_map.put('A', "Suomi!");
        test_map.put('B', "Hei");
        map_vals = new ArrayList<>(test_map.values());
        Collections.reverse(map_vals);
    }

    @GetMapping("/hei-suomi")
    public String heiSuomi() {
        return String.join(" ", map_vals);
    }

    @GetMapping("/hei-suomi-bean")
    public HeiSuomiBean heiSuomiBean() {
        HeiSuomiBean test_bean = new HeiSuomiBean("israel");
        test_bean.setMsg(String.join(" ", map_vals));
        return test_bean;
    }

    // enable a path-variable
    @GetMapping("/hei-suomi/{id}")
    public HeiSuomiBean heiSuomiID(@PathVariable String id) {
        Deque<String> msgStrs = new ArrayDeque<>(map_vals);
        msgStrs.addFirst(id);
        return new HeiSuomiBean(String.format("%s ".repeat(msgStrs.size()), msgStrs.toArray()));
    }
    
}