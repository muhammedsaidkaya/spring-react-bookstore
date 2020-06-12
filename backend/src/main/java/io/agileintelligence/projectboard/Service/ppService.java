package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.pp;

import java.util.List;
import java.util.Optional;

public interface ppService {


    List<pp> getAllPays();

    // Get PayPal information with separated composite primary keys
    Optional<pp> getPPInfo(String e_mail, int bucketId);

    // Get PayPal information with merged composite primary keys
    Optional<pp> getPPInfo(paymentIden paymentIden);

    // Add new record to pp table with separate composite primary keys
    pp payWithPayPal(String e_mail, int bucketId, String accNum);

    // Add new record to pp table with merged composite primary keys
    void payWithPayPal(pp pp);
}
