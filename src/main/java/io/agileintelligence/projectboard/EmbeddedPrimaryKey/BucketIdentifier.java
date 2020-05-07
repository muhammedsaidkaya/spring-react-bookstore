package io.agileintelligence.projectboard.EmbeddedPrimaryKey;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BucketIdentifier implements Serializable {

    private int id;
    private String user_email;

    public BucketIdentifier() {
    }

    public BucketIdentifier(int id, String user_email) {
        this.id = id;
        this.user_email = user_email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BucketIdentifier that = (BucketIdentifier) o;
        return id == that.id &&
                Objects.equals(user_email, that.user_email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user_email);
    }
}
