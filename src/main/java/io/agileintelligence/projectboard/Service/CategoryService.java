package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Entity.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getCategories();

    void addCategory(Category category);

    void deleteCategory(int id);
}
