package io.agileintelligence.projectboard.Repository;


import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.payment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface paymentDAO extends JpaRepository<payment, paymentIden> {


    @Query(value = "select * from payment where payment_date>?1 and payment_date<?2", nativeQuery = true)
    Slice<payment> fromTO_payments(Date from, Date to, Pageable page);
    // Get payments between two dates

    @Query(value = "select * from payment where payment_date>?1", nativeQuery = true)
    Slice<payment> fromTo_today(Date from, Pageable page);
    // Get payments from a date to last payment

    @Query(value = "select payment from payment payment")
    Slice<payment> pageBypage(Pageable page);
    // Get all payments page by page

    @Query(value = "select COUNT(unit_price*amount) from includes_bucket where user_email=?1 and bucket_id=?2", nativeQuery = true)
    double getTotalBucketPrice(String e_mail, int bucketId);
    // Total price of a bucket

    @Query(value = "UPDATE payment SET type=NULL WHERE user_email=?1 AND bucketId=?2", nativeQuery = true)
    void cancelPayment(String email, int bucket_id);
    // Cancel Payment but still hold old payment information
}
