package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.cc;

import java.util.List;
import java.util.Optional;

public interface ccService {
    List<cc> getAllCCPayments();

    // Get credit card information with separated composite primary keys
    Optional<cc> getCCInfo(String e_mail, int bucketId);

    // Get credit card information with merged composite primary keys
    Optional<cc> getCCInfo(paymentIden ccIden);

    // Add new record to cc table with separate composite primary keys
    cc payWithCreditCard(String e_mail, int bucketId, String cardNum, int cvc);

    // Add new record to cc table with merged composite primary keys
    void payWithCreditCard(cc cc);
}
