package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.AddressIdentifier;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.BucketIdentifier;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ItemIdentifier;
import io.agileintelligence.projectboard.EmbeddedPrimaryKey.ProductIDentifier;
import io.agileintelligence.projectboard.Repository.paymentDAO;
import io.agileintelligence.projectboard.Entity.*;
import io.agileintelligence.projectboard.Repository.*;
import io.agileintelligence.projectboard.RequestBody.ItemDTO;
import io.agileintelligence.projectboard.RequestBody.OrderDTO;
import io.agileintelligence.projectboard.RequestBody.addProductToBucketDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BucketServiceImpl implements BucketService {

    @Autowired
    BucketDAO bucketDAO;
    @Autowired
    ProductDAO productDAO;
    @Autowired
    ItemDAO itemDAO;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    paymentDAO paymentDAO;
    @Autowired
    AddressDAO addressDAO;
    @Autowired
    UserDAO userDAO;

    @Override
    public List<ItemDTO> getBucket(String email) {
        Optional<Bucket> bucket = bucketDAO.findNotPaidbucket(email);
        Bucket flag = bucket.orElse(null);
        if(flag==null){
            flag = bucketDAO.save(new Bucket(new BucketIdentifier(bucketDAO.getmaxBucketId(email)==null?1:bucketDAO.getmaxBucketId(email)+1,email)));
        }
        List<ItemDTO> itemDTOS = new ArrayList<>();
        for( Item item : itemDAO.findByEmailAndBucketId(flag.getBucketIdentifier().getUser_email(),flag.getBucketIdentifier().getId()) ){
            ItemDTO itemDTO = modelMapper.map(item, ItemDTO.class);
            itemDTO.setProduct_pic( productDAO.findById(new ProductIDentifier(
                    item.getItemIdentifier().getProduct_name(),
                    item.getItemIdentifier().getProduct_printer(),
                    item.getItemIdentifier().getProduct_author(),
                    item.getItemIdentifier().getProduct_volume()
            )).get().getProduct_pic());
            itemDTOS.add(itemDTO);
        }
        return itemDTOS;
    }

    @Override
    public int getTotal(String email){
        Optional<Bucket> bucket = bucketDAO.findNotPaidbucket(email);
        Bucket flag = bucket.orElse(null);
        if(flag==null){
            flag = bucketDAO.save(new Bucket(
                    new BucketIdentifier
                            (bucketDAO.getmaxBucketId(email)==null?1:bucketDAO.getmaxBucketId(email)+1,email)));
        }
        Integer result = itemDAO.findtotalAmount(flag.getBucketIdentifier().getUser_email(),
                flag.getBucketIdentifier().getId());
        if (result == null) {
            return 0;
        }
        return (int) result;
    }

    @Override
    public List<ItemDTO> getBucket(String email, int bucket_id){
        Optional<Bucket> bucket = bucketDAO.findById(new BucketIdentifier(bucket_id,email));
        Bucket flag = bucket.orElse(null);
        if(flag==null){
            return null;
        }
        List<ItemDTO> itemDTOS = new ArrayList<>();
        for( Item item : itemDAO.findByEmailAndBucketId(flag.getBucketIdentifier().getUser_email(),flag.getBucketIdentifier().getId()) ){
            ItemDTO itemDTO = modelMapper.map(item, ItemDTO.class);
            itemDTO.setProduct_pic( productDAO.findById(new ProductIDentifier(
                    item.getItemIdentifier().getProduct_name(),
                    item.getItemIdentifier().getProduct_printer(),
                    item.getItemIdentifier().getProduct_author(),
                    item.getItemIdentifier().getProduct_volume()
            )).get().getProduct_pic());
            itemDTOS.add(itemDTO);
        }
        return itemDTOS;
    }

    @Override
    public List<ItemDTO> addTbucket(addProductToBucketDTO product){
        Optional<Bucket> bucket = bucketDAO.findNotPaidbucket(product.getUser_email());
        Bucket flag = bucket.orElse(null);
        if(flag==null){
            flag = bucketDAO.save(new Bucket(new BucketIdentifier(bucketDAO.getmaxBucketId(product.getUser_email())==null?1:bucketDAO.getmaxBucketId(product.getUser_email())+1,product.getUser_email())));
        }
        Item item = new Item(new ItemIdentifier(product.getUser_email(),flag.getBucketIdentifier().getId(),product.getProduct_author(),product.getProduct_name(),product.getProduct_printer(),product.getProduct_volume()),product.getAmount(),product.getUnit_price());
        List<ItemDTO> bckt = getBucket(item.getItemIdentifier().getUser_email());
        Product pro= productDAO.findById(new ProductIDentifier(item.getItemIdentifier().getProduct_name(),item.getItemIdentifier().getProduct_printer(),item.getItemIdentifier().getProduct_author(),item.getItemIdentifier().getProduct_volume())).orElse(null);
        if(pro==null)
            return null;
        for( ItemDTO tem : bckt){
            if(tem.getItemIdentifier().equals(item.getItemIdentifier())){
                if(tem.getAmount()+item.getAmount()>pro.getStock()){
                    return null;
                }else {
                    item.setAmount(tem.getAmount()+item.getAmount());
                    itemDAO.save(item);
                    return getBucket(item.getItemIdentifier().getUser_email());
                }
            }
        }
        if(item.getAmount()>pro.getStock())
            return null;
        itemDAO.save(item);
        return getBucket(item.getItemIdentifier().getUser_email());
    }

    @Override
    public List<ItemDTO> updateBucket(Item item){
        Product pro= productDAO.findById(new ProductIDentifier(item.getItemIdentifier().getProduct_name(),item.getItemIdentifier().getProduct_printer(),item.getItemIdentifier().getProduct_author(),item.getItemIdentifier().getProduct_volume())).orElse(null);
        if(pro==null)
            return null;
        if(!itemDAO.findById(item.getItemIdentifier()).isPresent()){
            return null;
        }
        if(item.getAmount()<=0){
            deleteProduct(item);
            return getBucket(item.getItemIdentifier().getUser_email());
        }else if(item.getAmount()>pro.getStock()){
            return null;
        }else{
            itemDAO.save(item);
            return getBucket(item.getItemIdentifier().getUser_email());
        }
    }

    @Override
    public List<ItemDTO> deleteProduct(Item item){
        itemDAO.delete(item);
        return getBucket(item.getItemIdentifier().getUser_email());
    }
    /*
        @Override
        public Optional<Bucket> getBucket(String email) {
            try {
                Optional<Bucket> flag = bucketDAO.findNotPaidbucket(email);

                if (!flag.isPresent()) {
                    Integer flag2 = bucketDAO.getmaxBucketId(email);
                    if (flag2 == null) {
                        flag2 = 1;
                    } else {
                        flag2 += 1;
                    }
                    BucketIdentifier biden = new BucketIdentifier(flag2, email);
                    bucketDAO.save(new Bucket(biden));
                    return bucketDAO.findById(biden);
                }
                return flag;
            }
            catch (Exception e){
                return null;
            }
        }
    */
    @Override
    public List<OrderDTO> getPaidBuckets(String email) {
        List<OrderDTO> orderList = new ArrayList<>();
        for (payment payment : paymentDAO.findByEmail(email)) {
            int bucketId = payment.getPaymentIden().getBucket_id();
            String userEmail = payment.getPaymentIden().getUser_email();
            List<ItemDTO> temp = getBucket(userEmail, bucketId);
            int phoneFirst = userDAO.findByEmail(userEmail).get().getPhone_first3();
            int phoneRest = userDAO.findByEmail(userEmail).get().getPhone_rest();
            Address address = addressDAO.findById(new AddressIdentifier(userEmail, payment.getAddress_id())).get();
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setAddress(address);
            orderDTO.setItemList(temp);
            orderDTO.setPayment(payment);
            orderDTO.setPhoneFirst(phoneFirst);
            orderDTO.setPhoneRest(phoneRest);
            orderList.add(orderDTO);
        }
        return orderList;
    }

    @Override
    public List<OrderDTO> getPaidBuckets() {
        List<OrderDTO> orderList = new ArrayList<>();
        for (payment payment : paymentDAO.findOrderedAllPayment()) {
            int bucketId = payment.getPaymentIden().getBucket_id();
            String userEmail = payment.getPaymentIden().getUser_email();
            List<ItemDTO> temp = getBucket(userEmail, bucketId);
            int phoneFirst = userDAO.findByEmail(userEmail).get().getPhone_first3();
            int phoneRest = userDAO.findByEmail(userEmail).get().getPhone_rest();
            String username = userDAO.findByEmail(userEmail).get().getName();
            String profile_pic = userDAO.findByEmail(userEmail).get().getProfil_pic();
            Address address = addressDAO.findById(new AddressIdentifier(userEmail, payment.getAddress_id())).get();
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setAddress(address);
            orderDTO.setItemList(temp);
            orderDTO.setPayment(payment);
            orderDTO.setPhoneFirst(phoneFirst);
            orderDTO.setPhoneRest(phoneRest);
            orderDTO.setProfile_pic(profile_pic);
            orderDTO.setUsername(username);
            orderList.add(orderDTO);
        }
        return orderList;
    }

    @Override
    public List<Bucket> getAllBuckets(){
        return bucketDAO.findAll();
    }

    @Override
    public int getTotalPrice(BucketIdentifier k){
        return itemDAO.findTotalPrice(k.getUser_email(),k.getId());
    }

    @Override
    public Integer getTotalPrice(String email){
        Bucket p=bucketDAO.findNotPaidbucket(email).orElse(null);
        return  p==null?null:itemDAO.findTotalPrice(p.getBucketIdentifier().getUser_email(),p.getBucketIdentifier().getId());
    }

}
