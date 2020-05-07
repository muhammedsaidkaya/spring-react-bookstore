package io.agileintelligence.projectboard.Service;


import io.agileintelligence.projectboard.Entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Product> getProducts();

    List<Product> getProducts(int cat_id, int page);

    List<Product> getProducts(int cat_id, int page, String parameter, Boolean is_increase);

    Optional<Product> getProduct(String name, String printingOffice, String writter, int volume);

    void addProduct(Product product);

    void updateProduct(Product product);

    void deleteProduct(String name, String printingOffice, String writter, int volume);

    List<Product> searchProduct(String search, int page);
}
