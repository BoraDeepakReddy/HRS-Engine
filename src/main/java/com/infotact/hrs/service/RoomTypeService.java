package com.infotact.hrs.service;

import com.infotact.hrs.entity.RoomType;
import com.infotact.hrs.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    // Create
    public RoomType saveRoomType(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    // Get All
    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    // Get By Id
    public Optional<RoomType> getRoomTypeById(Long id) {
        return roomTypeRepository.findById(id);
    }

    // Update
    public RoomType updateRoomType(Long id, RoomType roomTypeDetails) {

        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room Type not found"));

        roomType.setRoomTypeName(roomTypeDetails.getRoomTypeName());
        roomType.setPricePerNight(roomTypeDetails.getPricePerNight());
        roomType.setHotel(roomTypeDetails.getHotel());

        return roomTypeRepository.save(roomType);
    }

    // Delete
    public void deleteRoomType(Long id) {
        roomTypeRepository.deleteById(id);
    }
}