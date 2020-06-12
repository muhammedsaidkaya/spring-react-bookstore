package io.agileintelligence.projectboard.Controller;

import io.agileintelligence.projectboard.Service.CategoryService;
import io.agileintelligence.projectboard.Entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    /* http://localhost:8080/categories */
    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    /* http://localhost:8080/categories */
    @PostMapping("/add")
    public void addCategory(@RequestBody Category category) {
        categoryService.addCategory(category);
    }

    /* http://localhost:8080/categories/id=2 */
    @DeleteMapping(path = "/id={id}")
    public void deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
    }

}
