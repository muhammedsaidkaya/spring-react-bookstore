package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import io.agileintelligence.projectboard.Entity.Log;
import io.agileintelligence.projectboard.Entity.Product;
import io.agileintelligence.projectboard.Entity.Rate;
import io.agileintelligence.projectboard.Repository.*;
import io.agileintelligence.projectboard.RequestBody.BookCountDTO;
import io.agileintelligence.projectboard.RequestBody.LogDTO;
import io.agileintelligence.projectboard.RequestBody.StatisticDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class LogServiceImpl implements LogService {

    @Autowired
    LogDAO logDAO;
    @Autowired
    UserDAO userDAO;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    ProductDAO productDAO;
    @Autowired
    RateDAO rateDAO;
    @Autowired
    paymentDAO paymentDAO;

    @Override
    public Boolean add(Log log) {
        if(userDAO.findByEmail(log.getLogIdentifier().getUser_email()).isPresent()){
            logDAO.save(log);
            return true;
        }
        return false;
    }

    @Override
    public List<LogDTO> list() {
        List<LogDTO> logDTOS = new ArrayList<>();
        for(Log log: logDAO.findAll()){
            LogDTO temp = new LogDTO();
            modelMapper.map(log,temp);
            temp.setName(userDAO.findByEmail(log.getLogIdentifier().getUser_email()).get().getName());
            logDTOS.add(temp);
        }
        return logDTOS;
    }

    @Override
    public HashMap<String,ResponseEntity> statistics() throws ParseException {
        HashMap<String,ResponseEntity> map = new HashMap<>();
        map.put("todayLogCount",ResponseEntity.ok(todayCount()));
        map.put("allLogCount",ResponseEntity.ok(allCount()));
        map.put("highestRateProducts", ResponseEntity.ok(findHighestRateProducts()));
        map.put("mostCommentedProducts", ResponseEntity.ok(findMostCommentedProducts()));
        map.put("mostSoldBook", ResponseEntity.ok(findMostSoldBook()));
        map.put("todayPaymentCount", ResponseEntity.ok(todayPaymentCount()));
        map.put("allPaymentCount", ResponseEntity.ok(allPaymentCount()));
        return map;
    }

    private List<BookCountDTO> findMostSoldBook() {
        List<BookCountDTO> bookCountList = new ArrayList<>();
        List<String> bookRowArray = paymentDAO.getMostSoldBooks();
        for (String row: bookRowArray){
            String[] resultArray = row.split(",");
            for (int i=0; i<resultArray.length; i++){
                if(resultArray[i] == null){
                    resultArray[i] = "null";
                }
            }
            String bookName = resultArray[0];
            String author = resultArray[1];
            String printer = resultArray[2];
            int volume = 0;
            int count = 0;
            if (!resultArray[3].equals("null")){
                volume = Integer.parseInt(resultArray[3]);
            }
            if (!resultArray[4].equals("null")) {
                count = Integer.parseInt(resultArray[4]);
            }

            Product product = productDAO.findById(
                    new ProductIDentifier(bookName, printer, author, volume)).orElse(null);

            bookCountList.add(new BookCountDTO(product, count));
        }
        return bookCountList;
    }

    private List<StatisticDTO> findMostCommentedProducts() {
        List<StatisticDTO> commentedProductList = new ArrayList<>();
        List<Product> productList = productDAO.findAll();
        for (Product product: productList) {
            int commentCount = 0;
            ProductIDentifier temp = product.getProductIDentifier();
            List<Rate> rateList = rateDAO.findByProduct(temp.getName(), temp.getPrinter(),
                    temp.getWritter(), temp.getVolume());
            for (Rate rate: rateList) {
                if (!rate.getExplanation().equals("")){
                    commentCount++;
                }
            }
            if (commentCount > 0 && commentedProductList.size()<7){
                commentedProductList.add(new StatisticDTO(product, commentCount));
            }
        }
        return commentedProductList;
    }

    private List<StatisticDTO> findHighestRateProducts() {
        List<StatisticDTO> ratedProductList = new ArrayList<>();
        List<Product> productList = productDAO.findAll();
        for (Product product: productList) {
            float totalRate = 0;
            float averageRate = 0;
            ProductIDentifier temp = product.getProductIDentifier();
            List<Rate> rateList = rateDAO.findByProduct(temp.getName(), temp.getPrinter(),
                    temp.getWritter(), temp.getVolume());
            for (Rate rate: rateList){
                totalRate += rate.getRate();
            }
            averageRate = totalRate / rateList.size();
            if (averageRate>0 && ratedProductList.size()<7) {
                ratedProductList.add(new StatisticDTO(product, averageRate));
            }
        }
        ratedProductList.sort(Comparator.comparing(StatisticDTO::getAverageRate).reversed());
        return ratedProductList;
    }

    @Override
    public Integer todayCount() throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date date = new Date();
        return logDAO.findByStartDateAfter(dateFormat.parse(dateFormat.format(date)));
    }

    @Override
    public Integer allCount() throws ParseException {
        return logDAO.findAllLog();
    }

    private Integer todayPaymentCount() throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date date = new Date();
        return paymentDAO.findByStartDateAfter(dateFormat.parse(dateFormat.format(date)));
    }

    private Integer allPaymentCount() throws ParseException {
        return paymentDAO.findAllPayment();
    }


        /*
    bugün ki giriş sayısı
    total giriş sayısı
    bugün ki order sayısı
    total order sayısı
    en çok satılan kitap
    en çok satın alan kişi
     */
}
