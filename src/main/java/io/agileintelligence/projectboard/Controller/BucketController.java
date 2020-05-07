package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.Service.BucketService;
import io.agileintelligence.projectboard.Entity.Bucket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/bucket")
public class BucketController {

    @Autowired
    BucketService bucketService;

    /* Manipulate Bucket */
    @GetMapping("/current/email={email}")
    public Optional<Bucket> getBucket(@PathVariable String email) {
        return bucketService.getBucket(email);
    }

    /* View All Orders için kullanılacak */
    @GetMapping("/paid")
    public List<Bucket> getPaidBuckets() {
        return bucketService.getPaidBuckets();
    }

    /* List Orders için kullanılacak */
    @GetMapping("/paid/email={email}")
    public List<Bucket> getPaidBuckets(@PathVariable String email) {
        return bucketService.getPaidBuckets(email);
    }
}
