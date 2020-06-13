package io.agileintelligence.projectboard.Controller;


import io.agileintelligence.projectboard.Hash;
import io.agileintelligence.projectboard.RequestBody.LoginDTO;
import io.agileintelligence.projectboard.RequestBody.UserDTO;
import io.agileintelligence.projectboard.RequestBody.UserDelete;
import io.agileintelligence.projectboard.Service.UserService;
import io.agileintelligence.projectboard.Entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    ModelMapper modelMapper;

    @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/login")
    public ResponseEntity createAuthenticationToken(@RequestBody LoginDTO loginDTO){
        return ResponseEntity.ok(userService.login(loginDTO.getEmail(), Hash.sha1(loginDTO.getPassword())));
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity deleteUser(@RequestBody UserDelete delete) {
        if(userService.deleteUser(delete.getEmail())){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @GetMapping("/get/{email}")
    public UserDTO get(@PathVariable String email){
        return userService.getUser(email);
    }

    @PostMapping("/register")
    public ResponseEntity addUser(@RequestBody User user) {
        if(userService.addUser(user)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @PutMapping("/updateAccount")
    public ResponseEntity updateUser(@RequestBody User user) {
        if(userService.updateUser(user)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @PostMapping("/forgetPassword")
    public ResponseEntity forgetPassword(@RequestBody UserDelete userDelete){
        if(userService.forgetPassword(userDelete.getEmail())){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.unprocessableEntity().build();
    }


    @PostMapping
    public ResponseEntity getUser(@RequestBody String email){
        return ResponseEntity.ok(userService.getUser(email));
    }
}
