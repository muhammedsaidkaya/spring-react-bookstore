package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.EmbeddedPrimaryKey.BucketIdentifier;
import io.agileintelligence.projectboard.Entity.Bucket;
import io.agileintelligence.projectboard.Repository.BucketDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BucketServiceImpl implements BucketService {

    @Autowired
    BucketDAO bucketDAO;

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

    @Override
    public List<Bucket> getPaidBuckets(String email) {
        try{
            return bucketDAO.getPaidBuckets(email);
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public List<Bucket> getPaidBuckets() {
        return bucketDAO.getPaidBuckets();
    }

    @Override
    public List<Bucket> getAllBuckets(){
        return bucketDAO.findAll();
    }

}
