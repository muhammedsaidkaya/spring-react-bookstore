package io.agileintelligence.projectboard.RequestBody;

import io.agileintelligence.projectboard.Entity.Address;
import io.agileintelligence.projectboard.Entity.cc;
import io.agileintelligence.projectboard.Entity.payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ccDTO {

    private cc cc;
    private List<ItemDTO> items;
    private Address address;
}
