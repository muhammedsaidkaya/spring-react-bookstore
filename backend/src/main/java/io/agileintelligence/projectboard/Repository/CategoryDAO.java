package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryDAO extends JpaRepository<Category, Integer> {

}
