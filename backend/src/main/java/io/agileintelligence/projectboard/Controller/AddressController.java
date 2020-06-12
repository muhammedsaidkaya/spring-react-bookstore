package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.AddressIdentifier;
import io.agileintelligence.projectboard.RequestBody.AddressDTO;
import io.agileintelligence.projectboard.Service.AddressService;
import io.agileintelligence.projectboard.Entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/addresses")
public class AddressController {

    @Autowired
    AddressService addressService;
/*adamın emailine göre addreslerini çek list
* bir adama adres ekleyebilme
* bir adamın adresini silme
* bir adamın adresini updateleme
*  */

    @GetMapping("/email={email}")
    public ResponseEntity getAddresses(@PathVariable String email) {

        return ResponseEntity.ok(addressService.getAddresses(email));

    }

    @PutMapping
    public void updateAddress(@RequestBody Address address){
        addressService.updateAddress(address);
    }


    @PostMapping
    public ResponseEntity addAddress(@RequestBody AddressDTO addressDTO) {
        Address temp = addressService.addAddress(addressDTO);
        if(temp != null){
            return ResponseEntity.ok(temp);

        }
        return ResponseEntity.unprocessableEntity().build();

    }

    @DeleteMapping
        public ResponseEntity deleteAddress(@RequestBody AddressIdentifier addressIdentifier) {
        if(addressService.deleteAddress(addressIdentifier)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.unprocessableEntity().build();


    }
}
