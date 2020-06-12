package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.BucketIdentifier;
import io.agileintelligence.projectboard.Entity.Bucket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BucketDAO extends JpaRepository<Bucket, BucketIdentifier> {

    @Query(value = "SELECT MAX(bucket.id) FROM bucket GROUP BY bucket.user_email HAVING bucket.user_email = ?1", nativeQuery=true)
    Integer getmaxBucketId(String email);

    @Query(value= "SELECT *" +
            "From bucket LEFT JOIN payment ON (bucket.user_email = payment.user_email " +
            "AND payment.bucket_id=bucket.id)" +
            "WHERE payment.bucket_id IS NULL AND bucket.user_email=?1", nativeQuery = true)
    Optional<Bucket> findNotPaidbucket(String email);

    @Query(value = "SELECT user_email,bucket_id     \n" +
            "FROM payment\n" +
            "WHERE user_email = ?1 ORDER BY payment_date desc,payment_time desc",nativeQuery =true)
    List<Bucket> getPaidBuckets(String email);

    @Query(value = "SELECT user_email,bucket_id     \n" +
            "FROM payment\n" +
            "ORDER BY payment_date desc,payment_time desc ",nativeQuery =true)
    List<Bucket> getPaidBuckets();

}
