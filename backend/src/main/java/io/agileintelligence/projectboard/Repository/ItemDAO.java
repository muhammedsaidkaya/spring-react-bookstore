package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ItemIdentifier;
import io.agileintelligence.projectboard.Entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemDAO extends JpaRepository<Item, ItemIdentifier> {

    @Query("select item FROM Item item WHERE item.itemIdentifier.bucket_id = ?2 and item.itemIdentifier.user_email = ?1")
    List<Item> findByEmailAndBucketId(String user_email, int id);

    @Query("select sum(item.amount) from Item item where item.itemIdentifier.bucket_id=?2 " +
            "and item.itemIdentifier.user_email=?1 ")
    Integer findtotalAmount(String user_email,int id);

    @Query("select sum(item.amount*item.unit_price) from Item item where item.itemIdentifier.bucket_id=?2 and item.itemIdentifier.user_email=?1 group by item.itemIdentifier.user_email,item.itemIdentifier.bucket_id")
    int findTotalPrice(String user_email,int bucket_id);
}
