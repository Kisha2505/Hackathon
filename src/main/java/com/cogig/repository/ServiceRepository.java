package com.cogig.repository;

import com.cogig.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByCategoryContainingIgnoreCase(String category);
}
