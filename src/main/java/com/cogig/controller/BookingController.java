package com.cogig.controller;

import com.cogig.model.Booking;
import com.cogig.repository.BookingRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    private final BookingRepository repository;

    public BookingController(BookingRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        booking.setStatus("PENDING");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(repository.save(booking));
    }

    @GetMapping
    public List<Booking> getBookings(
            @RequestParam(required = false) String customerName) {
        if (customerName != null && !customerName.isBlank()) {
            return repository.findByCustomerNameIgnoreCase(customerName);
        }
        return repository.findAll();
    }

    @PatchMapping("/{id}/status")
    public Booking updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Booking booking = repository.findById(id).orElseThrow();
        booking.setStatus(status.toUpperCase());
        return repository.save(booking);
    }
}
