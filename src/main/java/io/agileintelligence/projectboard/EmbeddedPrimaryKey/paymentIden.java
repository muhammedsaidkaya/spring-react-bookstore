package io.agileintelligence.projectboard.EmbeddedPrimaryKey;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class paymentIden implements Serializable {

    private int bucket_id;
    private String user_email;


    public paymentIden() {
    }

    public paymentIden(String user_email, int bucket_id) {
        this.user_email = user_email;
        this.bucket_id = bucket_id;
    }

    public int getBucket_id() {
        return bucket_id;
    }

    public void setBucket_id(int bucket_id) {
        this.bucket_id = bucket_id;
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
        paymentIden that = (paymentIden) o;
        return bucket_id == that.bucket_id &&
                Objects.equals(user_email, that.user_email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_email, bucket_id);
    }
}
