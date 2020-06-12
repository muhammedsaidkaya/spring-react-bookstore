package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, String> {


    @Query(value="select user from User user where user.email=?1")
    Optional<User> findByEmail(String email);

    @Query(value="select user from User user where user.email=?1 and user.password=?2")
    User findLogin(String email, String password);
}
