package com.infotact.hrs.controller;
import java.util.List;
import com.infotact.hrs.dto.ReservationRequestDTO;
import com.infotact.hrs.dto.ReservationResponseDTO;
import com.infotact.hrs.entity.Reservation;
import com.infotact.hrs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
public ReservationResponseDTO createReservation(
        @Valid @RequestBody ReservationRequestDTO requestDTO) {

    return reservationService.createReservation(requestDTO);
}
    @GetMapping
public List<Reservation> getAllReservations() {
    return reservationService.getAllReservations();
}

@GetMapping("/{id}")
public Reservation getReservationById(@PathVariable Long id) {
    return reservationService.getReservationById(id);
}
}