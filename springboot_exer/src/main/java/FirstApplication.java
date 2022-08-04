import java.util.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.SpringApplication;

@RestController
@EnableAutoConfiguration
public class FirstApplication {

    @RequestMapping("/")
    String home() {
        HashMap<Character, String> test_map = new HashMap<>();
        test_map.putIfAbsent('A', "Israel");
        test_map.putIfAbsent('B', "Hello");
        test_map.put('A', "Suomi!");
        test_map.replace('A', "Hello", "Hei");
        List<String> map_vals = new ArrayList<>(test_map.values());
        Collections.reverse(map_vals);
        return String.join(" ", map_vals);
    }

    public static void main(String[] args) {
        SpringApplication sprApp = new SpringApplication(FirstApplication.class);
        sprApp.setLazyInitialization(true);
        sprApp.run(args);
    }

}