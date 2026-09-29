package com.cogig.controller;

import com.cogig.model.Worker;
import com.cogig.repository.WorkerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin(origins = "*")
public class WorkerController {
    private final WorkerRepository repository;

    public WorkerController(WorkerRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Worker> getWorkers(
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String location) {

        if (skill != null && !skill.isBlank()) {
            return repository.findBySkillContainingIgnoreCase(skill);
        }
        if (location != null && !location.isBlank()) {
            return repository.findByLocationContainingIgnoreCase(location);
        }
        return repository.findAll();
    }

    @PostMapping
    public Worker createWorker(@RequestBody Worker worker) {
        return repository.save(worker);
    }

    @GetMapping("/{id}")
    public Worker getWorker(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }
}
