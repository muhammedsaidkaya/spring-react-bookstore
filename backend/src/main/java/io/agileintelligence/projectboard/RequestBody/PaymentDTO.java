package io.agileintelligence.projectboard.RequestBody;

import io.agileintelligence.projectboard.Entity.Address;
import io.agileintelligence.projectboard.Entity.Item;
import io.agileintelligence.projectboard.Entity.payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.sql.Time;
import java.util.Date;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {

    private List<ItemDTO> items;
    private String address;
    private Date payment_date;
    private Time payment_time;
    private Float total_price;
    private String stat;
    private Date stat_time;
    private String payment_type;

}
