package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.cc;
import io.agileintelligence.projectboard.Entity.payment;
import io.agileintelligence.projectboard.Entity.pp;
import io.agileintelligence.projectboard.Repository.BucketDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Service
public class paymentServiceImpl implements paymentService{

    @Autowired
    io.agileintelligence.projectboard.Repository.paymentDAO paymentDAO;
    @Autowired
    BucketDAO bucketDAO;
    @Autowired
    io.agileintelligence.projectboard.Repository.ccDAO ccDAO;
    @Autowired
    io.agileintelligence.projectboard.Repository.ppDAO ppDAO;

    @Override// Get payment record from payment table
    public Optional<payment> getPayment(paymentIden paymentIden){
        return paymentDAO.findById(paymentIden);
    }

    @Override// Get all records from payment table
    public List<payment> getPayments(){
        return paymentDAO.findAll();
    }

    @Override// Get all payments page by page
    public List<payment> getPayments(int page){
        if (page<1) page=1;
        Pageable paging = PageRequest.of(page-1,10);
        Slice<payment> pagedResult=paymentDAO.pageBypage(paging);
        return pagedResult.getContent();
    }

    @Override// Convert boolean type to integer
    public int getPaymentType(paymentIden paymentIden){
        return paymentDAO.findById(paymentIden).get().isType() ? 1 : 0;
        // 1 -> pp
        // 0 -> cc
    }

    @Override
    public void makePayment(payment payment){
            paymentDAO.save(payment);
    }

    @Override
    public void makePaymentWCC(cc cc){
        long millis = System.currentTimeMillis();
        int total_price = (int) paymentDAO.getTotalBucketPrice(cc.getPaymentIden().getUser_email(),
                cc.getPaymentIden().getBucket_id());
        paymentDAO.save(new payment(new paymentIden(cc.getPaymentIden().getUser_email(),
                cc.getPaymentIden().getBucket_id()),new Date(millis),new Time(millis),(short) 0 ,total_price));
        ccDAO.save(cc);
    }

    @Override
    public void makePaymentWPP(pp pp){
        long millis = System.currentTimeMillis();
        int total_price = (int) paymentDAO.getTotalBucketPrice(pp.getPaymentIden().getUser_email(),
                pp.getPaymentIden().getBucket_id());
        paymentDAO.save(new payment(new paymentIden(pp.getPaymentIden().getUser_email(),
                pp.getPaymentIden().getBucket_id()),new Date(millis),new Time(millis),(short) 0 ,total_price));
        ppDAO.save(pp);
    }

}
