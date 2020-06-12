package io.agileintelligence.projectboard.RequestBody;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import io.agileintelligence.projectboard.Entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookCountDTO {
    private Product product;
    private int count;
}
