package com.cogig.repository;

import com.cogig.model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkerRepository extends JpaRepository<Worker, Long> {
    List<Worker> findBySkillContainingIgnoreCase(String skill);
    List<Worker> findByLocationContainingIgnoreCase(String location);
}
