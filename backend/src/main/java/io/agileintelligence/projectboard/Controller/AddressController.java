package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.Service.AddressService;
import io.agileintelligence.projectboard.Entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/addresses")
public class AddressController {

    @Autowired
    AddressService addressService;

    @GetMapping
    public List<Address> getAllAddresses() {
        return addressService.getAllAddresses();
    }

    @GetMapping("/email={email}")
    public List<Address> getAddresses(@PathVariable String email) {
        return addressService.getAddresses(email);
    }

    @PostMapping
    public void addAddress(@RequestBody Address address) {
        addressService.addAddress(address);
    }
    /*
        {
            "addressIdentifier": {
                "user_email": "saidkaya1239@gmail.com",
                "address": "Sentepe"
            }
        }

     */

    @DeleteMapping("/email={email}&address={address}")
    public void deleteAddress(@PathVariable String email, @PathVariable String address) {
        addressService.deleteAddress(email, address);
    }
}
