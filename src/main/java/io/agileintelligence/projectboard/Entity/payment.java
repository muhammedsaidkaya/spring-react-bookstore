package io.agileintelligence.projectboard.Entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name = "payment")
public class payment {

    @EmbeddedId
    io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden paymentIden;

    private Date payment_date;
    private Time payment_time;
    private Short type;
    private int total_price;

    public payment() {
    }

    public payment(io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden paymentIden, Date payment_date, Time payment_time, short type, int total_price) {
        this.paymentIden = paymentIden;
        this.payment_date = payment_date;
        this.payment_time = payment_time;
        this.type = type;
        this.total_price = total_price;
    }

    public io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden getPaymentIden() {
        return paymentIden;
    }

    public Date getPayment_date() {
        return payment_date;
    }

    public Time getPayment_time() {
        return payment_time;
    }

    public boolean isType() {

        return type == (short) 1;
    }

    public int getTotal_price() {
        return total_price;
    }

    public void setType(short type) {
        this.type = type;
    }

    public void setType() {
        this.type = null;
    }
}
