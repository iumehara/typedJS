package io.umehara.typedJSExample;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("restaurants")
public class RestaurantsController {
    private long serialId = 0;
    private List<Restaurant> database = new ArrayList<>();

    @GetMapping
    @CrossOrigin
    public List<Restaurant> getAll() {
        return database;
    }

    @PostMapping
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    public List<Restaurant> create(@RequestBody NewRestaurant newRestaurant) {
        serialId++;
        Restaurant restaurant = new Restaurant(serialId, newRestaurant);
        database.add(restaurant);
        return database;
    }
 }
