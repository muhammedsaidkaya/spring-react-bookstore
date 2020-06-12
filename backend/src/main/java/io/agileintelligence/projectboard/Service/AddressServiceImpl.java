package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Repository.AddressDAO;
import io.agileintelligence.projectboard.Entity.Address;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.AddressIdentifier;
import io.agileintelligence.projectboard.RequestBody.AddressDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    AddressDAO addressDAO;

    @Override
    public List<Address> getAddresses(String email) {
        return addressDAO.findAllAddress(email);
    }

    @Override
    public Address addAddress(AddressDTO addressDTO) {

        if(addressDAO.findByEmail(addressDTO.getUser_email()) == null){
            return addressDAO.save(new Address(new AddressIdentifier(addressDTO.getUser_email(),1),addressDTO.getAddress()));
        }
        else{
            return addressDAO.save(new Address(new AddressIdentifier(addressDTO.getUser_email(),addressDAO.findByEmail(addressDTO.getUser_email())+1),addressDTO.getAddress()));
        }

    }

    @Override
    public Boolean deleteAddress(AddressIdentifier addressIdentifier) {

        try{
            addressDAO.deleteById(addressIdentifier);
            return true;
        }catch (Exception e){
            return false;
        }

    }
    @Override
    public Address updateAddress(Address address){
        return addressDAO.save(address);
    }

}
