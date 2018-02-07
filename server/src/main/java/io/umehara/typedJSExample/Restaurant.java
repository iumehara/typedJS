package io.umehara.typedJSExample;

public class Restaurant {
    private long id;
    private String name;

    public Restaurant(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Restaurant(long id, NewRestaurant newRestaurant) {
        this.id = id;
        this.name = newRestaurant.getName();
    }

    public String getName() {
        return name;
    }

    public long getId() {
        return id;
    }
}
