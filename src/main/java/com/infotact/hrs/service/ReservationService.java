package com.infotact.hrs.service;

import com.infotact.hrs.dto.ReservationRequestDTO;
import com.infotact.hrs.dto.ReservationResponseDTO;
import com.infotact.hrs.entity.Reservation;
import com.infotact.hrs.entity.Room;
import com.infotact.hrs.enums.ReservationStatus;
import com.infotact.hrs.repository.ReservationRepository;
import com.infotact.hrs.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RoomRepository roomRepository;

    public ReservationResponseDTO createReservation(ReservationRequestDTO request) {

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Reservation reservation = new Reservation();

        reservation.setGuestName(request.getGuestName());
        reservation.setGuestEmail(request.getGuestEmail());
        reservation.setCheckInDate(request.getCheckInDate());
        reservation.setCheckOutDate(request.getCheckOutDate());
        reservation.setRoom(room);
        reservation.setStatus(ReservationStatus.PENDING);

        Reservation savedReservation = reservationRepository.save(reservation);

        ReservationResponseDTO response = new ReservationResponseDTO();

        response.setReservationId(savedReservation.getId());
        response.setGuestName(savedReservation.getGuestName());
        response.setGuestEmail(savedReservation.getGuestEmail());
        response.setCheckInDate(savedReservation.getCheckInDate());
        response.setCheckOutDate(savedReservation.getCheckOutDate());
        response.setReservationStatus(savedReservation.getStatus().name());
        response.setRoomNumber(room.getRoomNumber());

        return response;
    }
}