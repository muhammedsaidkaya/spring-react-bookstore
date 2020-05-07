package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Repository.CategoryDAO;
import io.agileintelligence.projectboard.Entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryDAO categoryDAO;

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
        categoryDAO.delete(categoryDAO.getOne(id));
    }

}
