package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.BucketIdentifier;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ItemIdentifier;
import io.agileintelligence.projectboard.Entity.Item;
import io.agileintelligence.projectboard.RequestBody.ItemDTO;
import io.agileintelligence.projectboard.RequestBody.addProductToBucketDTO;
import io.agileintelligence.projectboard.Service.BucketService;
import io.agileintelligence.projectboard.Entity.Bucket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/bucket")
public class BucketController {

    @Autowired
    BucketService bucketService;

    @GetMapping("/current/email={email}")
    public List<ItemDTO> getBucket(@PathVariable String email) {
        return bucketService.getBucket(email);
    }

    @GetMapping("/content")
    public List<ItemDTO> getBucket(@RequestBody BucketIdentifier bucketIden) {
        return bucketService.getBucket(bucketIden.getUser_email(),bucketIden.getId());}


    @GetMapping("/current/total/email={email}")
    public int getTotalAmount(@PathVariable String email){
        return bucketService.getTotal(email);
    }

    @PostMapping("/addTbucket")
    public ResponseEntity addTbucket(@RequestBody addProductToBucketDTO item){
        List<ItemDTO> l = bucketService.addTbucket(item);
        if(l==null){
            return  ResponseEntity.unprocessableEntity().build();
        }else {
            return ResponseEntity.ok().body(l);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteFbucket(@RequestBody Item product){
        return ResponseEntity.ok().body(bucketService.deleteProduct(product));
    }

    @PutMapping
    public  ResponseEntity updatePIbucket(@RequestBody Item item){
        List<ItemDTO> k = bucketService.updateBucket(item);
        if(k==null){
            return ResponseEntity.unprocessableEntity().build();
        }else{
            return ResponseEntity.ok().body(k);
        }
    }

    /* Manipulate Bucket
    @GetMapping("/current/email={email}")
    public Optional<Bucket> getBucket(@PathVariable String email) {
        return bucketService.getBucket(email);
    }*/

    /* View All Orders için kullanılacak */
    @GetMapping("/paid")
    public ResponseEntity getPaidBuckets() {
        return ResponseEntity.ok(bucketService.getPaidBuckets());
    }

    /* List Orders için kullanılacak */
    @GetMapping("/paid/email={email}")
    public ResponseEntity getPaidBuckets(@PathVariable String email) {
        return ResponseEntity.ok(bucketService.getPaidBuckets(email));
    }

    @GetMapping("/totalPrice")
    public ResponseEntity getTotalPrice(@RequestBody BucketIdentifier k){
        return ResponseEntity.ok().body(bucketService.getTotalPrice(k));
    }

    @GetMapping("/totalPrice/email={email}")
    public ResponseEntity getTotalPrice(@PathVariable String email){
        Integer l=bucketService.getTotalPrice(email);
        return l==null?ResponseEntity.notFound().build():ResponseEntity.ok().body(l);
    }

}
