package com.infotact.hrs.controller;

import com.infotact.hrs.entity.RoomType;
import com.infotact.hrs.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roomtypes")
public class RoomTypeController {

    @Autowired
    private RoomTypeService roomTypeService;

    // Create
    @PostMapping
    public RoomType createRoomType(@RequestBody RoomType roomType) {
        return roomTypeService.saveRoomType(roomType);
    }

    // Get All
    @GetMapping
    public List<RoomType> getAllRoomTypes() {
        return roomTypeService.getAllRoomTypes();
    }

    // Get By Id
    @GetMapping("/{id}")
    public Optional<RoomType> getRoomTypeById(@PathVariable Long id) {
        return roomTypeService.getRoomTypeById(id);
    }

    // Update
    @PutMapping("/{id}")
    public RoomType updateRoomType(@PathVariable Long id,
                                   @RequestBody RoomType roomType) {
        return roomTypeService.updateRoomType(id, roomType);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteRoomType(@PathVariable Long id) {
        roomTypeService.deleteRoomType(id);
        return "Room Type deleted successfully.";
    }
}
