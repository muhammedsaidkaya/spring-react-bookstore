package io.agileintelligence.projectboard.Entity;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private int address_id;
    private Date stat_time;
    private String stat;
    private String firm_code;



    public payment() {
    }



    public payment(paymentIden paymentIden, Date payment_date, Time payment_time, short type, int total_price) {
        this.paymentIden = paymentIden;
        this.payment_date = payment_date;
        this.payment_time = payment_time;
        this.type = type;
        this.total_price = total_price;
    }

    public int getAddress_id() {
        return address_id;
    }

    public void setAddress_id(int address_id) {
        this.address_id = address_id;
    }

    public Date getStat_time() {
        return stat_time;
    }

    public void setStat_time(Date stat_time) {
        this.stat_time = stat_time;
    }

    public String getStat() {
        return stat;
    }

    public void setStat(String stat) {
        this.stat = stat;
    }

    public String getFirm_code() {
        return firm_code;
    }

    public void setFirm_code(String firm_code) {
        this.firm_code = firm_code;
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
