package com.infotact.hrs.service;

import com.infotact.hrs.entity.Hotel;
import com.infotact.hrs.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    // Create Hotel
    public Hotel saveHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    // Get All Hotels
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    // Get Hotel By Id
    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    // Update Hotel
    public Hotel updateHotel(Long id, Hotel hotelDetails) {

        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        hotel.setHotelName(hotelDetails.getHotelName());
        hotel.setLocation(hotelDetails.getLocation());
        hotel.setTotalRooms(hotelDetails.getTotalRooms());

        return hotelRepository.save(hotel);
    }

    // Delete Hotel
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }

}