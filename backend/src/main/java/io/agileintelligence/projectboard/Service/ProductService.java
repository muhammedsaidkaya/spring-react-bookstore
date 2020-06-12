package io.agileintelligence.projectboard.Service;


import io.agileintelligence.projectboard.Entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Product> getProducts();

    Boolean addProduct(Product product);

    Boolean updateProduct(Product product);

    Boolean deleteProduct(String name, String printingOffice, String writter, int volume);

    List<Product> searchProduct(String search);

    List<Product> getProductsByCategory(int id);

    /*
    List<Product> getProducts(int cat_id, int page);

    List<Product> getProducts(int cat_id, int page, String parameter, Boolean is_increase);
    */

}
