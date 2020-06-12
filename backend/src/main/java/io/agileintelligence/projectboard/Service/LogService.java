package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Entity.Log;
import io.agileintelligence.projectboard.RequestBody.LogDTO;
import org.springframework.http.ResponseEntity;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;

public interface LogService {

    Boolean add(Log log);

    List<LogDTO> list();

    Integer todayCount() throws ParseException;

    Integer allCount() throws ParseException;

    HashMap<String,ResponseEntity> statistics() throws ParseException;
}
