package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.LogDBIdentifier;
import io.agileintelligence.projectboard.Entity.LogDB;
import io.agileintelligence.projectboard.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogDBDAO extends JpaRepository<LogDB, LogDBIdentifier> {

    @Query(value = "select logDB from LogDB logDB where logDB.logDBIdentifier.user_email = ?1" )
    List<LogDB> findById(String user_email);

    @Query(value = "select * from logdb  where user_email= ?1 and end_date IS NULL",nativeQuery =true)
    LogDB findLastLog(String email);
}
