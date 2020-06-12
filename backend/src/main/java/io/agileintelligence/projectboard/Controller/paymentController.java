package io.agileintelligence.projectboard.Controller;


import io.agileintelligence.projectboard.EmbeddedPrimaryKey.paymentIden;
import io.agileintelligence.projectboard.Entity.payment;
import io.agileintelligence.projectboard.RequestBody.PaymentDTO;
import io.agileintelligence.projectboard.RequestBody.ccDTO;
import io.agileintelligence.projectboard.RequestBody.ppDTO;
import io.agileintelligence.projectboard.RequestBody.statDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity makePayment(@RequestBody ccDTO cc)
    {
        PaymentDTO pay =paymentService.makePaymentWCC(cc);
        if(pay==null){
            return ResponseEntity.badRequest().build();
        }else{
            return ResponseEntity.ok().body(pay);
        }
    }

    @PostMapping("pay/p")
    public ResponseEntity makePayment(@RequestBody ppDTO pp){
        PaymentDTO pay =paymentService.makePaymentWPP(pp);
        if(pay==null){
            return ResponseEntity.badRequest().build();
        }else{
            return ResponseEntity.ok().body(pay);
        }
    }
    @PutMapping("/statUP")
    public ResponseEntity updateShipStat(@RequestBody statDTO stat ){
        payment pay = paymentService.updateStat(stat);
        if(pay==null){
            return ResponseEntity.notFound().build();
        }else {
            return ResponseEntity.ok().body(pay);
        }
    }
}

