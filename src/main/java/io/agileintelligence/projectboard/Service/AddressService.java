package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Entity.Address;

import java.util.List;

public interface AddressService {
    List<Address> getAddresses(String email);

    void addAddress(Address address);

    void deleteAddress(String email, String address);

    List<Address> getAllAddresses();
}
