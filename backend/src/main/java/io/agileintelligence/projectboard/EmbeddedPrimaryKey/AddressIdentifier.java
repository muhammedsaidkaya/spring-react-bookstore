package io.agileintelligence.projectboard.EmbeddedPrimaryKey;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AddressIdentifier implements Serializable {

    private String user_email;
    private String address;

    public AddressIdentifier() {
    }

    public AddressIdentifier(String user_email, String address) {
        this.user_email = user_email;
        this.address = address;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressIdentifier that = (AddressIdentifier) o;
        return Objects.equals(user_email, that.user_email) &&
                Objects.equals(address, that.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_email, address);
    }
}
