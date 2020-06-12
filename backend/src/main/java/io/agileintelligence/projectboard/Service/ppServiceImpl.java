package io.agileintelligence.projectboard.Service;


import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.pp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ppServiceImpl implements ppService{

    @Autowired
    io.agileintelligence.projectboard.Repository.ppDAO ppDAO;

    @Override
    public List<pp> getAllPays(){
        return ppDAO.findAll();
    }

    @Override// Get PayPal information with separated composite primary keys
    public Optional<pp> getPPInfo(String e_mail, int bucketId){
        return ppDAO.findById(new paymentIden(e_mail,bucketId));
    }

    @Override// Get PayPal information with merged composite primary keys
    public Optional<pp> getPPInfo(paymentIden paymentIden){
        return ppDAO.findById(paymentIden);
    }

    @Override// Add new record to pp table with separate composite primary keys
    public pp payWithPayPal(String e_mail, int bucketId, String accNum){
        pp p = new pp(new paymentIden(e_mail,bucketId),accNum);
        ppDAO.save(p);
        return p;
    }

    @Override// Add new record to pp table with merged composite primary keys
    public void payWithPayPal(pp pp){
        ppDAO.save(pp);
    }
}
