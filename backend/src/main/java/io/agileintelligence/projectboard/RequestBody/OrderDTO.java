package io.agileintelligence.projectboard.RequestBody;

import io.agileintelligence.projectboard.Entity.Address;
import io.agileintelligence.projectboard.Entity.payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private List<ItemDTO> itemList;
	private String username;
	private String profile_pic;
    private Address address;
    private payment payment;
    private int phoneFirst;
    private int phoneRest;
}
