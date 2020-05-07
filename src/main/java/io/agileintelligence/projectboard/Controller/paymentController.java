package io.agileintelligence.projectboard.Controller;


import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.cc;
import io.agileintelligence.projectboard.Entity.payment;
import io.agileintelligence.projectboard.Entity.pp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/pymnt")
public class paymentController {

    @Autowired
    io.agileintelligence.projectboard.Service.paymentService paymentService;

    @GetMapping
    public List<payment> getPayments() {
        return paymentService.getPayments();
    }

    @GetMapping(path = "/my")
    public Optional<payment> getPayment(@RequestBody paymentIden paymentIden) {
        return paymentService.getPayment(paymentIden);
    }

    @GetMapping(path = "/page={pageNum}")
    public List<payment> getPayments(@PathVariable int pageNum) {
        return paymentService.getPayments(pageNum);
    }

    @PostMapping(path = "/PM")
    public int getPayMethod(@RequestBody paymentIden paymentIden) {
        return paymentService.getPaymentType(paymentIden);
    }

    @PostMapping("/pay")
    public void makePayment(@RequestBody payment payment) {
        paymentService.makePayment(payment);
    }

    @PostMapping("pay/c")
    public void makePayment(@RequestBody cc cc){
        paymentService.makePaymentWCC(cc);
    }

    @PostMapping("pay/p")
    public void makePayment(@RequestBody pp pp){
        paymentService.makePaymentWPP(pp);
    }
}

