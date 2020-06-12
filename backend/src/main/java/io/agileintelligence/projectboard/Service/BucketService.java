package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.BucketIdentifier;
import io.agileintelligence.projectboard.Entity.Bucket;
import io.agileintelligence.projectboard.Entity.Item;
import io.agileintelligence.projectboard.RequestBody.ItemDTO;
import io.agileintelligence.projectboard.RequestBody.OrderDTO;
import io.agileintelligence.projectboard.RequestBody.addProductToBucketDTO;

import java.util.List;
import java.util.Optional;

public interface BucketService {

    List<ItemDTO> getBucket(String email);

    List<ItemDTO> getBucket(String email,int i);

     List<OrderDTO> getPaidBuckets(String email);

    List<OrderDTO> getPaidBuckets();

    List<Bucket> getAllBuckets();

    int getTotal(String email);

    List<ItemDTO> addTbucket(addProductToBucketDTO product);

    List<ItemDTO> updateBucket(Item item);

    public List<ItemDTO> deleteProduct(Item item);

    int getTotalPrice(BucketIdentifier k);

    Integer getTotalPrice(String email);
}
