package io.agileintelligence.projectboard.RequestBody;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class addProductToBucketDTO {

    private String product_name;
    private String product_author;
    private int product_volume;
    private String product_printer;
    private String user_email;
    private String product_pic;
    private int amount;
    private int unit_price;


}
