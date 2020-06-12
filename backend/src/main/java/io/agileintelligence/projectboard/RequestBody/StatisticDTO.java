package io.agileintelligence.projectboard.RequestBody;

import io.agileintelligence.projectboard.Entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticDTO {
    private Product product;
    private float averageRate;
}
