package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ItemIdentifier;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import io.agileintelligence.projectboard.Entity.Rate;
import io.agileintelligence.projectboard.Service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/rate")
public class RateController {
    @Autowired
    RateService rateService;

    @PostMapping("/list")
    public ResponseEntity getProductRate(@RequestBody ProductIDentifier productIDentifier){
        return ResponseEntity.ok(rateService.getProductRate(productIDentifier));
    }

    @PostMapping("/add")
    public ResponseEntity makeComment(@RequestBody Rate rate){
        return ResponseEntity.ok(rateService.makeComment(rate));
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteComment(@RequestBody ItemIdentifier itemIdentifier){
        return ResponseEntity.ok(rateService.deleteComment(itemIdentifier));
    }

    @PutMapping("/update")
    public ResponseEntity updateComment(@RequestBody Rate rate){
        Rate temp = rateService.updateComment(rate);
        if (temp != null){
            return ResponseEntity.ok(temp);
        }
        return ResponseEntity.unprocessableEntity().build();
    }
}
