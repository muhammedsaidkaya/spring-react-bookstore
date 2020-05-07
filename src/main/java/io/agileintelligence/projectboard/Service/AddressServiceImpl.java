package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Repository.AddressDAO;
import io.agileintelligence.projectboard.Entity.Address;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.AddressIdentifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    AddressDAO addressDAO;

    @Override
    public List<Address> getAddresses(String email) {
        return addressDAO.findAllAddress(email);
    }

    @Override
    public void addAddress(Address address) {
        addressDAO.save(address);
    }


    @Override
    public void deleteAddress(String email, String address) {
        addressDAO.deleteById(new AddressIdentifier(email, address));
    }

    @Override
    public List<Address> getAllAddresses() {
        return addressDAO.findAll();
    }
}
