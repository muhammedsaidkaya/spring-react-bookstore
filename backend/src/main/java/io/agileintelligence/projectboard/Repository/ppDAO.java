package io.agileintelligence.projectboard.Repository;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.pp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ppDAO extends JpaRepository<pp, paymentIden> {

}
