package io.agileintelligence.projectboard.Entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "pp")
public class pp {

    @EmbeddedId
    io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden paymentIden;

    private String acc_num;

    public pp() {
    }

    public pp(io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden paymentIden, String acc_num) {
        this.paymentIden = paymentIden;
        this.acc_num = acc_num;
    }

    public io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden getPaymentIden() {
        return paymentIden;
    }

    public void setPaymentIden(io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden paymentIden) {
        this.paymentIden = paymentIden;
    }

    public String getAcc_num() {
        return acc_num;
    }

    public void setAcc_num(String acc_num) {
        this.acc_num = acc_num;
    }
}
