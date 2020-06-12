package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ItemIdentifier;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import io.agileintelligence.projectboard.Entity.Rate;

import java.util.List;

public interface RateService {
    List<Rate> getProductRate(ProductIDentifier productIDentifier);

    Rate makeComment(Rate rate);

    boolean deleteComment(ItemIdentifier itemIdentifier);

    Rate updateComment(Rate rate);
}
