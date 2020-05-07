package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.Hash;
import io.agileintelligence.projectboard.RequestBody.UserDelete;
import io.agileintelligence.projectboard.RequestBody.Login;
import io.agileintelligence.projectboard.Service.UserService;
import io.agileintelligence.projectboard.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/login")
    public Optional<User> getUser(@RequestBody Login login) {
        return userService.getUser(login.getEmail(), Hash.sha1(login.getPassword()));
    }

    @DeleteMapping("/deleteAccount")
    public void deleteUser(@RequestBody UserDelete delete) {
        userService.deleteUser(delete.getEmail());
    }


    @PostMapping("/register")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @PutMapping("/updateAccount")
    public void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }


}
