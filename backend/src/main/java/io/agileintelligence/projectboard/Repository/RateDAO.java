package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ItemIdentifier;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import io.agileintelligence.projectboard.Entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RateDAO extends JpaRepository<Rate, ItemIdentifier> {

    @Query(value="select * from rate where product_author = ?3 " +
            "and product_name = ?1 " +
            "and product_printer = ?2 " +
            "and product_volume = ?4", nativeQuery = true)
    List<Rate> findByProduct(String name, String printer, String author, int volume);

}
