package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.cc;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ccDAO extends JpaRepository<cc, paymentIden> {

}
