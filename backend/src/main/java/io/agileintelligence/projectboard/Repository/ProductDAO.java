package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.Entity.Product;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDAO extends JpaRepository<Product, ProductIDentifier> {

    @Query(value = "select product from Product product WHERE product.cat_id = ?1 ")
    Slice<Product> findLastProduct(int category_id, Pageable paging);

    @Query(value = "select product from Product product  ")
    Slice<Product> findLastProduct(Pageable paging);

    @Query(value = "select product from Product product WHERE product.productIDentifier.name LIKE %?1% OR product.productIDentifier.printer LIKE %?1% OR product.productIDentifier.writter LIKE %?1%")
    List<Product> searchProduct(String x);

    @Query(value = "select product FROM Product product WHERE product.cat_id = ?1")
    List<Product> findByCategoryId(int id);


}

