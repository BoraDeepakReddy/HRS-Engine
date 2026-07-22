package com.infotact.hrs.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
public class ReservationRequestDTO {
@NotBlank(message = "Guest name is required")
private String guestName;

@Email(message = "Invalid email")
@NotBlank(message = "Email is required")
private String guestEmail;

@NotNull(message = "Check-in date is required")
@Future(message = "Check-in date must be in the future")
private LocalDate checkInDate;

@NotNull(message = "Check-out date is required")
@Future(message = "Check-out date must be in the future")
private LocalDate checkOutDate;

@NotNull(message = "Room ID is required")
private Long roomId;
    public ReservationRequestDTO() {
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getGuestEmail() {
        return guestEmail;
    }

    public void setGuestEmail(String guestEmail) {
        this.guestEmail = guestEmail;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }
}