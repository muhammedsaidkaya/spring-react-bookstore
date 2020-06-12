package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.Entity.Log;
import io.agileintelligence.projectboard.Service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/log")
public class DashboardController {

    @Autowired
    LogService logService;

    @GetMapping("/list")
    public ResponseEntity list(){
        return ResponseEntity.ok(logService.list());
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Log log){
        if(logService.add(log)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @GetMapping("/statistics")
    public HashMap<String,ResponseEntity> statistics() throws ParseException {
        return logService.statistics();
    }



}
