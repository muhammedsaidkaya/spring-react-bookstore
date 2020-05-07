package io.agileintelligence.projectboard.Entity;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "cc")
public class cc {

    @EmbeddedId
    paymentIden paymentIden;

    private int card_num;
    private int cvc;

    public cc() {
    }

    public cc(io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden paymentIden, int card_num, int cvc) {
        this.paymentIden = paymentIden;
        this.card_num = card_num;
        this.cvc = cvc;
    }

    public io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden getPaymentIden() {
        return paymentIden;
    }

    public void setPaymentIden(io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden paymentIden) {
        this.paymentIden = paymentIden;
    }

    public int getCard_num() {
        return card_num;
    }

    public void setCard_num(int card_num) {
        this.card_num = card_num;
    }

    public int getCvc() {
        return cvc;
    }

    public void setCvc(int cvc) {
        this.cvc = cvc;
    }
}
