package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Repository.UserDAO;
import io.agileintelligence.projectboard.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public List<User> getUsers() {
        return userDAO.findAll();
    }

    @Override
    public Optional<User> getUser(String e_mail, String password) {
        return userDAO.findById(e_mail, password);
    }

    @Override
    public void addUser(User user) {
        System.out.println(user.toString());

        userDAO.save(user);
    }

    @Override
    public void updateUser(User user) {
        System.out.println(user.toString());

        userDAO.save(user);
    }

    @Override
    public void deleteUser(String e_mail) {
        userDAO.deleteById(e_mail);
    }

}
