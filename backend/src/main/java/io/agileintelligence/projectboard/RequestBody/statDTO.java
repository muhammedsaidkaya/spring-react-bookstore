package io.agileintelligence.projectboard.RequestBody;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class statDTO {

    private paymentIden paymentIden;
    private String new_stat;

}
