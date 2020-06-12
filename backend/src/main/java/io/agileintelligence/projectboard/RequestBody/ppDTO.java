package io.agileintelligence.projectboard.RequestBody;

import io.agileintelligence.projectboard.Entity.Address;
import io.agileintelligence.projectboard.Entity.cc;
import io.agileintelligence.projectboard.Entity.payment;
import io.agileintelligence.projectboard.Entity.pp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ppDTO {

    private pp pp;
    private List<ItemDTO> items;
    private Address address;
}
