package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.LogDBIdentifier;
import io.agileintelligence.projectboard.Entity.LogDB;
import io.agileintelligence.projectboard.Entity.User;
import io.agileintelligence.projectboard.Repository.LogDBDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class LogDBServiceImpl implements LogDBService{

    @Autowired
    LogDBDAO logDBDAO;

    public List<LogDB> getLogs(){
        return logDBDAO.findAll();
    }
    public List<LogDB> getLogs(String user_email){
        return logDBDAO.findById(user_email);
    }

    @Override
    public void addLog(String email) {
        logDBDAO.save(new LogDB(new LogDBIdentifier(email, new Date()),null));
    }

    @Override
    public void updateLog(String email) {
        LogDB temp = logDBDAO.findLastLog(email);
         temp.setEnd_date(new Date());
         logDBDAO.save(temp);
    }

}
