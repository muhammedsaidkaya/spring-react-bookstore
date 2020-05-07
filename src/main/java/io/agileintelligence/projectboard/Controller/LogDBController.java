package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.Entity.LogDB;
import io.agileintelligence.projectboard.Service.LogDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/logdb")
public class LogDBController {

    @Autowired
    LogDBService logDBService;

    @GetMapping
    public List<LogDB> getLogs(){
        return logDBService.getLogs();
    }

    @GetMapping("/email={email}")
    public List<LogDB> getLogs(@PathVariable String email){
        return logDBService.getLogs(email);
    }

    @PutMapping("/logout/email={email}")
    public void updateLog(@PathVariable String email){
        logDBService.updateLog(email);
    }

}
