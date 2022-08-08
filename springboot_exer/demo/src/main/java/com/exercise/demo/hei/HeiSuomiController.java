package com.exercise.demo.hei;

import java.util.*;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeiSuomiController {
    
    private HashMap<Character, String> test_map;
    private List<String> map_vals;

    public HeiSuomiController() { //controller
        test_map = new HashMap<>();
        test_map.putIfAbsent('A', "Israel");
        test_map.putIfAbsent('B', "Hello");
        test_map.put('A', "Suomi!");
        test_map.put('B', "Hei");
        map_vals = new ArrayList<>(test_map.values());
        Collections.reverse(map_vals);
    }

    @GetMapping("/hei")
    public String hei() {
        return String.join(" ", map_vals);
    }

    @GetMapping("/hei-suomi")
    public HeiSuomi heiSuomi() {
        HeiSuomi test_ = new HeiSuomi("israel");
        test_.setMsg(String.join(" ", map_vals));
        return test_;
    }

    // enable a path-variable
    @GetMapping("/hei-suomi/{id}")
    public HeiSuomi heiSuomiID(@PathVariable String id) {
        Deque<String> msgStrs = new ArrayDeque<>(map_vals);
        msgStrs.addFirst(id);
        return new HeiSuomi(String.format("%s ".repeat(msgStrs.size()), msgStrs.toArray()));
    }
    
}