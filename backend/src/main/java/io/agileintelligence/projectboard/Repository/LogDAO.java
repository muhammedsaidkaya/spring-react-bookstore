package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.LogIdentifier;
import io.agileintelligence.projectboard.Entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface LogDAO extends JpaRepository<Log, LogIdentifier> {

    @Query("select count(log) from Log log where log.logIdentifier.date > ?1")
    Integer findByStartDateAfter(Date date);

    @Query("select count(log) from Log log")
    Integer findAllLog();
}
