package io.agileintelligence.projectboard.Service;

import io.agileintelligence.projectboard.Entity.Bucket;

import java.util.List;
import java.util.Optional;

public interface BucketService {

    Optional<Bucket> getBucket(String email);

    List<Bucket> getPaidBuckets(String email);

    List<Bucket> getPaidBuckets();

    List<Bucket> getAllBuckets();
}
