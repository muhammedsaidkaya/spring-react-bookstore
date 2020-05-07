package io.agileintelligence.projectboard.Entity;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.AddressIdentifier;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "has_addresses")
public class Address {

    @EmbeddedId
    AddressIdentifier addressIdentifier;

    public Address() {
    }

    public Address(AddressIdentifier addressIdentifier) {
        this.addressIdentifier = addressIdentifier;
    }

    public AddressIdentifier getAddressIdentifier() {
        return addressIdentifier;
    }

    public void setAddressIdentifier(AddressIdentifier addressIdentifier) {
        this.addressIdentifier = addressIdentifier;
    }
}
