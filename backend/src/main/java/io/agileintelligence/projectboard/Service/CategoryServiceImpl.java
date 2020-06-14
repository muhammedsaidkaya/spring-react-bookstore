package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Entity.Product;
import io.agileintelligence.projectboard.Repository.CategoryDAO;
import io.agileintelligence.projectboard.Entity.Category;
import io.agileintelligence.projectboard.Repository.ProductDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryDAO categoryDAO;
    @Autowired
    ProductDAO productDAO;

    @Override
    public List<Category> getCategories() {
        return categoryDAO.findAll();
    }

    @Override
    public void addCategory(Category category) {
        categoryDAO.save(category);
    }

    @Override
    public void deleteCategory(int id) {
        List<Product> products=productDAO.findByCategoryId(id);
        if(products.size()!=0){
            for(Product i : products){
                i.setCategory_id(-1);
            }
        }
        productDAO.saveAll(products);
        categoryDAO.delete(categoryDAO.getOne(id));
    }

}
