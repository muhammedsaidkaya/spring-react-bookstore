package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.cc;
import io.agileintelligence.projectboard.Entity.payment;
import io.agileintelligence.projectboard.Entity.pp;

import java.util.List;
import java.util.Optional;

public interface paymentService {

    Optional<payment> getPayment(paymentIden paymentIden);

    List<payment> getPayments();

    List<payment> getPayments(int page);

    int getPaymentType(paymentIden paymentIden);

    //void makePayment(String e_mail, int bucketId, String paymeth, List<Integer> info);

    //void makePayment(paymentIden paymentIden, String paymeth, List<Integer> info);

    //Optional<payment> cancelPayment(String e_mail, int bucketId);

    //void makePayment(cc cc);

    void makePayment(payment payment);

    void makePaymentWCC(cc cc);

    void makePaymentWPP(pp pp);

    //void makePayment(pp pp);

    //void cancelPayment(cc cc);

    //void cancelPayment(pp pp);
}
