package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Hash;
import io.agileintelligence.projectboard.Repository.UserDAO;
import io.agileintelligence.projectboard.Entity.User;
import io.agileintelligence.projectboard.RequestBody.UserDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public User login(String email,String password) {
        return userDAO.findLogin(email,password);
    }

    @Override
    public List<UserDTO> getUsers() {
        List<UserDTO> userDTOS = new ArrayList<>();
        userDAO.findAll().forEach(user -> userDTOS.add(modelMapper.map(user,UserDTO.class)));
        return userDTOS;
    }

    @Override
    public UserDTO getUser(String e_mail) {
        return modelMapper.map(userDAO.findByEmail(e_mail).get(),UserDTO.class);
    }

    @Override
    public Boolean addUser(User user) {
        if(userDAO.findByEmail(user.getEmail()).isPresent()==false){
            user.setPassword(Hash.sha1(user.getPassword()));
            userDAO.save(user);
            return true;
        }
        else{
            return false;
        }
    }

    @Override
    public Boolean updateUser(User user) {
        Optional<User> temp = userDAO.findByEmail(user.getEmail());
        if(temp.isPresent()==true){
            if(user.getPassword()==null) user.setPassword(temp.get().getPassword());
            else user.setPassword(Hash.sha1(user.getPassword()));
            userDAO.save(user);
            return true;
        }
        else{
            return false;
        }
    }

    @Override
    public Boolean deleteUser(String e_mail) {
        try{
            userDAO.deleteById(e_mail);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Boolean forgetPassword(String email) {
        Optional<User> user = userDAO.findByEmail(email);
        if(user.isPresent()) {
            user.get().setPassword(Hash.sha1("devamke"));
            userDAO.save(user.get());
            return true;
        }
        return false;
    }

}
