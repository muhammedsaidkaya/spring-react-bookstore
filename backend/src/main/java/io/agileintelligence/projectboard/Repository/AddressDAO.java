package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.Entity.Address;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.AddressIdentifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressDAO extends JpaRepository<Address, AddressIdentifier> {

    @Query(value = "select address from Address address WHERE address.addressIdentifier.user_email = ?1 ")
    List<Address> findAllAddress(String email);
}
