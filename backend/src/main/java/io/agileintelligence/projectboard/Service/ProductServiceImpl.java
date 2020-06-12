package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Repository.ProductDAO;
import io.agileintelligence.projectboard.Entity.Product;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {


    @Autowired
    private ProductDAO productDAO;

    @Override
    public List<Product> getProducts() {
        return productDAO.findAll();
    }

    @Override
    public Boolean addProduct(Product product) {
        if( getProduct(product.getProductIDentifier().getName(),
                product.getProductIDentifier().getPrinter(),
                product.getProductIDentifier().getWritter(),
                product.getProductIDentifier().getVolume()).isPresent() == false){
            productDAO.save(product);
            return true;
        }else{
            return false;
        }

    }

    @Override
    public Boolean updateProduct(Product product) {
        if( getProduct(product.getProductIDentifier().getName(),
                product.getProductIDentifier().getPrinter(),
                product.getProductIDentifier().getWritter(),
                product.getProductIDentifier().getVolume()).isPresent() == true){
            productDAO.save(product);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public Boolean deleteProduct(String name, String printingOffice, String writter, int volume) {
        try{
            productDAO.deleteById(new ProductIDentifier(name, printingOffice, writter, volume));
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Product> searchProduct(String search) {

        Hashtable<String, Product> products = new Hashtable<String, Product>();
        for (String temp : search.split(" ")) {

            productDAO.searchProduct(temp);

            for (Product temp2 : productDAO.searchProduct(temp)) {
                String x = temp2.getProductIDentifier().getName() + " " +
                        temp2.getProductIDentifier().getPrinter() + " " +
                        temp2.getProductIDentifier().getWritter() + " " +
                        temp2.getProductIDentifier().getVolume();
                if (!products.containsKey(x)) {
                    products.put(x, temp2);
                }
            }
        }

        return new ArrayList<Product>(products.values());

    }

    @Override
    public List<Product> getProductsByCategory(int id) {
        return productDAO.findByCategoryId(id);
    }

    /*
    private List<Product> getSliceOfList(List<Product> products, int page) {
        if (page < 1) page = 1;
        try {
            return products.subList((page - 1) * 10, page * 10);
        } catch (Exception e) {
            try {
                return products.subList((page - 1) * 10, products.size());
            } catch (Exception e2) {
                return products.subList((products.size() / 10) * 10, products.size());
            }
        }
    }*/

    private Optional<Product> getProduct(String name, String printingOffice, String writter, int volume) {
        return productDAO.findById(new ProductIDentifier(name,printingOffice,writter,volume));
    }

     /*
    @Override
    public List<Product> getProducts(int cat_id, int page) {
        if (page < 1) page = 1;
        Pageable paging = PageRequest.of(page - 1, 10);
        Slice<Product> pagedResult;
        if (cat_id < 1) {
            pagedResult = productDAO.findLastProduct(paging);
        } else {
            pagedResult = productDAO.findLastProduct(cat_id, paging);
        }
        return pagedResult.getContent();
    }

    @Override
    public List<Product> getProducts(int cat_id, int page, String sortBy, Boolean is_increase) {
        if (page < 1) page = 1;
        Pageable paging;
        if (is_increase == true) {
            paging = PageRequest.of(page - 1, 10, Sort.by(sortBy).descending());
        } else {
            paging = PageRequest.of(page - 1, 10, Sort.by(sortBy).ascending());
        }
        Slice<Product> pagedResult;
        if (cat_id < 1) {
            pagedResult = productDAO.findLastProduct(paging);
        } else {
            pagedResult = productDAO.findLastProduct(cat_id, paging);
        }
        return pagedResult.getContent();
    }

    */
}
