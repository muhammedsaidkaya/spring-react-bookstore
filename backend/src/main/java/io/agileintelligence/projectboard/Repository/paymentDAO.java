package io.agileintelligence.projectboard.Repository;


import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.payment;
import io.agileintelligence.projectboard.RequestBody.BookCountDTO;
import io.agileintelligence.projectboard.RequestBody.StatisticDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

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

    @Query(value = "select SUM(unit_price*amount) from includes_bucket where user_email=?1 and bucket_id=?2", nativeQuery = true)
    double getTotalBucketPrice(String e_mail, int bucketId);
    // Total price of a bucket

    @Query(value = "UPDATE payment SET type=NULL WHERE user_email=?1 AND bucketId=?2", nativeQuery = true)
    void cancelPayment(String email, int bucket_id);
    // Cancel Payment but still hold old payment information

    @Query(value = "select p from payment p where p.paymentIden.user_email = ?1 order by p.payment_date desc")
    List<payment> findByEmail(String email);
    // Cancel Payment but still hold old payment information

    @Query(value = "select p from payment p order by p.payment_date DESC")
    List<payment> findOrderedAllPayment();

    @Query("select count(p) from payment p where p.payment_date > ?1")
    Integer findByStartDateAfter(Date date);

    @Query("select count(p) from payment p")
    Integer findAllPayment();

    @Query(value = "SELECT product_name,product_author,product_printer,product_volume,max(count) FROM \n" +
            "( SELECT product_author , product_name, product_printer , product_volume , count(*) as count\n" +
            "FROM payment LEFT JOIN includes_bucket ON payment.bucket_id = includes_bucket.bucket_id AND payment.user_email = includes_bucket.user_email\n" +
            "group by product_name , product_printer , product_author , product_volume ) as b order by count desc Limit 6", nativeQuery = true)
    List<String> getMostSoldBooks();
}
