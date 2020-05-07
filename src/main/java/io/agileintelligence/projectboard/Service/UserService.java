package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getUsers();

    Optional<User> getUser(String e_mail, String password);

    void addUser(User user);

    void updateUser(User user);

    void deleteUser(String e_mail);
}
