package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ItemIdentifier;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import io.agileintelligence.projectboard.Entity.Rate;
import io.agileintelligence.projectboard.Repository.RateDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RateServiceImpl implements RateService{
    @Autowired
    RateDAO rateDAO;

    @Override
    public List<Rate> getProductRate(ProductIDentifier productIDentifier) {
        return rateDAO.findByProduct(productIDentifier.getName(), productIDentifier.getPrinter(),
                productIDentifier.getWritter(), productIDentifier.getVolume());
    }

    @Override
    public Rate makeComment(Rate rate) {
        return rateDAO.save(rate);
    }

    @Override
    public boolean deleteComment(ItemIdentifier itemIdentifier) {
        try{
            rateDAO.deleteById(itemIdentifier);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public Rate updateComment(Rate rate) {
        return rateDAO.save(rate);
    }

}
