package com.infotact.hrs.service;

import com.infotact.hrs.entity.Room;
import com.infotact.hrs.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    // Create
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    // Get All
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Get By Id
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    // Update
    public Room updateRoom(Long id, Room roomDetails) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setFloor(roomDetails.getFloor());
        room.setCapacity(roomDetails.getCapacity());
        room.setStatus(roomDetails.getStatus());
        room.setHotel(roomDetails.getHotel());
        room.setRoomType(roomDetails.getRoomType());

        return roomRepository.save(room);
    }

    // Delete
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}