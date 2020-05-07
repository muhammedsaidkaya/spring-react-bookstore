package io.agileintelligence.projectboard.Service;


import io.agileintelligence.projectboard.Entity.LogDB;

import java.util.List;
import java.util.Optional;

public interface LogDBService {

    List<LogDB> getLogs();

    List<LogDB> getLogs(String email);

    void addLog(String email);

    void updateLog(String email);
}
