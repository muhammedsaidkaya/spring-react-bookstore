package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Entity.User;
import io.agileintelligence.projectboard.RequestBody.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User login(String email,String password);

    List<UserDTO> getUsers();

    UserDTO getUser(String e_mail);


    Boolean addUser(User user);

    Boolean updateUser(User user);

    Boolean deleteUser(String e_mail);

    Boolean forgetPassword(String email);
}
