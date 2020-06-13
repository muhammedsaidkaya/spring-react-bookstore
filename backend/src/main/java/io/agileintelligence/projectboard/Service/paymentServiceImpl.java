package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.Product;
import io.agileintelligence.projectboard.Entity.cc;
import io.agileintelligence.projectboard.Entity.payment;
import io.agileintelligence.projectboard.Entity.pp;
import io.agileintelligence.projectboard.Repository.BucketDAO;
import io.agileintelligence.projectboard.Repository.ProductDAO;
import io.agileintelligence.projectboard.RequestBody.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    ProductDAO productDAO;

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
    public PaymentDTO makePaymentWCC(ccDTO cc){
        payment p = paymentDAO.findById(cc.getCc().getPaymentIden()).orElse(null);
        if(p!=null)
            return null;
        long millis = System.currentTimeMillis();
        payment pp = new payment(cc.getCc().getPaymentIden(),new Date(millis),new Time(millis),(short) 0,(int) paymentDAO.getTotalBucketPrice(cc.getCc().getPaymentIden().getUser_email(),cc.getCc().getPaymentIden().getBucket_id()));
        pp.setAddress_id(cc.getAddress().getAddressIdentifier().getId());
        pp.setStat("Preparing");
        pp.setStat_time(new Date(millis));
        for(ItemDTO item : cc.getItems() ){
            Product pro= productDAO.findById(new ProductIDentifier(item.getItemIdentifier().getProduct_name(),item.getItemIdentifier().getProduct_printer(),item.getItemIdentifier().getProduct_author(),item.getItemIdentifier().getProduct_volume())).orElse(null);
            if(pro==null){
                return null;
            }
            if(pro.getStock()<item.getAmount()){
                return null;
            }else{
                pro.setStock(pro.getStock()-item.getAmount());
                productDAO.save(pro);
            }
        }
        paymentDAO.save(pp);
        ccDAO.save(cc.getCc());
        return new PaymentDTO(cc.getItems(),cc.getAddress().getAddress(),pp.getPayment_date(),pp.getPayment_time(),(float) pp.getTotal_price(),pp.getStat(),pp.getStat_time(),"Credit Card");
    }

    @Override
    public PaymentDTO makePaymentWPP(ppDTO cc){
        ppDAO.save(cc.getPp());
        payment p = paymentDAO.findById(cc.getPp().getPaymentIden()).orElse(null);
        if(p!=null)
            return null;
        long millis = System.currentTimeMillis();
        payment pp = new payment(cc.getPp().getPaymentIden(),new Date(millis),new Time(millis),(short) 0,(int) paymentDAO.getTotalBucketPrice(cc.getPp().getPaymentIden().getUser_email(),cc.getPp().getPaymentIden().getBucket_id()));
        pp.setAddress_id(cc.getAddress().getAddressIdentifier().getId());
        pp.setStat("Preparing");
        pp.setStat_time(new Date(millis));
        for(ItemDTO item : cc.getItems() ){
            Product pro= productDAO.findById(new ProductIDentifier(item.getItemIdentifier().getProduct_name(),item.getItemIdentifier().getProduct_printer(),item.getItemIdentifier().getProduct_author(),item.getItemIdentifier().getProduct_volume())).orElse(null);
            if(pro==null){
                return null;
            }
            if(pro.getStock()<item.getAmount()){
                return null;
            }else{
                pro.setStock(pro.getStock()-item.getAmount());
                productDAO.save(pro);
            }
        }
        paymentDAO.save(pp);
        return new PaymentDTO(cc.getItems(),cc.getAddress().getAddress(),pp.getPayment_date(),pp.getPayment_time(),(float) pp.getTotal_price(),pp.getStat(),pp.getStat_time(),"Credit Card");
    }

    @Override
    public payment updateStat(statDTO new_stat){
        payment pay = paymentDAO.findById(new_stat.getPaymentIden()).orElse(null);
        long millis = System.currentTimeMillis();
        if(pay==null){
            return null;
        }else{
            pay.setStat_time(new Date(millis));
            pay.setStat(new_stat.getNew_stat());
            paymentDAO.save(pay);
        }
        return pay;
    }



    /*
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
*/
}
