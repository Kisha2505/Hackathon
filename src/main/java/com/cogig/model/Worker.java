package com.cogig.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workers")
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String skill;
    private String location;
    private Double rating = 0.0;
    private Integer jobsCompleted = 0;
    private Double price;
    private String availability = "AVAILABLE";

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getJobsCompleted() { return jobsCompleted; }
    public void setJobsCompleted(Integer jobsCompleted) { this.jobsCompleted = jobsCompleted; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }
}
