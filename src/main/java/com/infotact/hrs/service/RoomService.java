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

    // Create Room
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    // Get All Rooms
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Get Room By Id
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    // Update Room
    public Room updateRoom(Long id, Room room) {
        room.setId(id);
        return roomRepository.save(room);
    }

    // Delete Room
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}