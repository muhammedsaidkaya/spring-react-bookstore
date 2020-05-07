package io.agileintelligence.projectboard.Controller;


import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.pp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/pp")
public class ppController {

    @Autowired
    io.agileintelligence.projectboard.Service.ppService ppService;

    @GetMapping
    public List<pp> getAllPaymetns(){
        return ppService.getAllPays();
    }

    @GetMapping(path="/info")
    public Optional<pp> getPPInfo(@RequestBody paymentIden paymentIden){
        return ppService.getPPInfo(paymentIden);
    }

    @PostMapping
    public void payWithPP(@RequestBody pp pp){
        ppService.payWithPayPal(pp);
    }

}
