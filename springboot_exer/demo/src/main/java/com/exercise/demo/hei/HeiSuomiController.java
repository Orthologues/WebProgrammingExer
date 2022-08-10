package com.exercise.demo.hei;

import java.net.URI;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class HeiSuomiController {
    
    @Autowired
    private MessageSource helloFinlandMsgSrc;
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
        HeiSuomi test_obj = new HeiSuomi("israel");
        test_obj.setMsg(String.join(" ", map_vals));
        return test_obj;
    }

    // enable a path-variable
    @GetMapping("/hei-suomi/{id}")
    public HeiSuomi heiSuomiID(@PathVariable String id) {
        Deque<String> msgStrs = new ArrayDeque<>(map_vals);
        msgStrs.addFirst(id);
        return new HeiSuomi(String.format("%s ".repeat(msgStrs.size()), msgStrs.toArray()));
    }

    @GetMapping("/hei-suomi/lang")
    public ResponseEntity<String> HeiSuomiMultiLang(
        //@RequestHeader(name="Accept-Language", required = false) Locale locale
    ) {
        Locale reqLocale = LocaleContextHolder.getLocale();
        URI reqUri = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
        HttpHeaders respHeaders = new HttpHeaders();
        respHeaders.setLocation(reqUri);
        respHeaders.set("Locale", reqLocale.toString());
        respHeaders.set("Requested-Language", reqLocale.getDisplayLanguage());
        String helloFinlandMsg = helloFinlandMsgSrc.getMessage(
            "hello.finland.message", null, "Hello Finland", reqLocale
        );
        return new ResponseEntity<>(
            helloFinlandMsg, // resp body as a string
            respHeaders, 
            HttpStatus.NON_AUTHORITATIVE_INFORMATION)
        ;
    }
}