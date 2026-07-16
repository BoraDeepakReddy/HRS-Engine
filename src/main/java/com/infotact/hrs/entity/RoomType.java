package com.infotact.hrs.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "room_types")
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomTypeName;

    private double pricePerNight;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL)
private List<Room> rooms;

    public RoomType() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomTypeName() {
        return roomTypeName;
    }

    public void setRoomTypeName(String roomTypeName) {
        this.roomTypeName = roomTypeName;
    }

    public double getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
    public List<Room> getRooms() {
    return rooms;
}

public void setRooms(List<Room> rooms) {
    this.rooms = rooms;
}
}