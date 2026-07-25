import { request } from "./apiClient";

/**
 * These endpoints are REAL and already built per the backend readme:
 *   POST   /api/hotels
 *   GET    /api/hotels
 *   GET    /api/hotels/{id}
 *   PUT    /api/hotels/{id}
 *   DELETE /api/hotels/{id}
 *
 * Hotel shape: { id, hotelName, location, totalRooms }
 * No mock branch here — the Hotel module is done, so we call the backend directly.
 */

export async function listHotels() {
  return request("/hotels");
}

export async function getHotel(id) {
  return request(`/hotels/${id}`);
}

export async function createHotel({ hotelName, location, totalRooms }) {
  return request("/hotels", {
    method: "POST",
    body: JSON.stringify({ hotelName, location, totalRooms }),
  });
}

export async function updateHotel(id, { hotelName, location, totalRooms }) {
  return request(`/hotels/${id}`, {
    method: "PUT",
    body: JSON.stringify({ hotelName, location, totalRooms }),
  });
}

export async function deleteHotel(id) {
  return request(`/hotels/${id}`, { method: "DELETE" });
}