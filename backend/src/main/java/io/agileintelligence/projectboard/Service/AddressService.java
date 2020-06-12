package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.AddressIdentifier;
import io.agileintelligence.projectboard.Entity.Address;
import io.agileintelligence.projectboard.RequestBody.AddressDTO;

import java.util.List;

public interface AddressService {
    List<Address> getAddresses(String email);


    Address addAddress(AddressDTO addressDTO);

    Boolean deleteAddress(AddressIdentifier addressIdentifier);

    Address updateAddress(Address address);


    //void updateAddress(Address address);
}
