package com.infotact.hrs.controller;

import com.infotact.hrs.entity.Hotel;
import java.util.Optional;
import com.infotact.hrs.service.HotelService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @PostMapping
    public Hotel addHotel(@Valid @RequestBody Hotel hotel) {
        return hotelService.addHotel(hotel);
    }

    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

   @GetMapping("/{id}")
public Optional<Hotel> getHotelById(@PathVariable Long id) {
    return hotelService.getHotelById(id);
}

    @PutMapping("/{id}")
    public Hotel updateHotel(@PathVariable Long id,
                             @Valid @RequestBody Hotel hotel) {
        return hotelService.updateHotel(id, hotel);
    }

    @DeleteMapping("/{id}")
    public void deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
    }
}
