package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.cc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ccServiceImpl implements ccService {

    @Autowired
    io.agileintelligence.projectboard.Repository.ccDAO ccDAO;

    @Override
    public List<cc> getAllCCPayments(){
        return ccDAO.findAll();
    }

    @Override// Get credit card information with separated composite primary keys
    public Optional<cc> getCCInfo(String e_mail, int bucketId) {
        return ccDAO.findById(new paymentIden(e_mail,bucketId));
    }

    @Override// Get credit card information with merged composite primary keys
    public Optional<cc> getCCInfo(paymentIden ccIden){
        return ccDAO.findById(ccIden);
    }

    @Override// Add new record to cc table with separate composite primary keys
    public cc payWithCreditCard(String e_mail, int bucketId, String cardNum, int cvc){
        cc c = new cc(new paymentIden(e_mail,bucketId),cardNum,cvc);
        ccDAO.save(c);
        return c;
    }

    @Override// Add new record to cc table with merged composite primary keys
    public void payWithCreditCard(cc cc) {
        ccDAO.save(cc);
    }

}
