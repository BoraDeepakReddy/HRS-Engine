package com.infotact.hrs.repository;

import com.infotact.hrs.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("""
            SELECT r
            FROM Reservation r
            WHERE r.room.id = :roomId
            AND r.checkInDate < :checkOut
            AND r.checkOutDate > :checkIn
            """)
    List<Reservation> findOverlappingReservations(
            Long roomId,
            LocalDate checkIn,
            LocalDate checkOut
    );
}