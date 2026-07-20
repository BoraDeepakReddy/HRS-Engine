package com.infotact.hrs.controller;

import com.infotact.hrs.dto.ReservationRequestDTO;
import com.infotact.hrs.dto.ReservationResponseDTO;
import com.infotact.hrs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ReservationResponseDTO createReservation(
            @RequestBody ReservationRequestDTO request) {

        return reservationService.createReservation(request);
    }
}