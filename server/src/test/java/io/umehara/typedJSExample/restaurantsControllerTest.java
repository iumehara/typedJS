package io.umehara.typedJSExample;

import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class restaurantsControllerTest {
    private MockMvc mockController = standaloneSetup(new RestaurantsController()).build();


    @Test
    public void createPersistsNewRestaurant() throws Exception {
        //language=json
        String newRestaurantBody = "{\n  \"name\": \"Pintokona\"\n}";
        mockController.perform(post("/restaurants")
                .contentType(APPLICATION_JSON_UTF8)
                .content(newRestaurantBody)
        )
                .andExpect(status().isCreated());



        mockController.perform(get("/restaurants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", equalTo(1)))
                .andExpect(jsonPath("$[0].name", equalTo("Pintokona")));
    }
}
