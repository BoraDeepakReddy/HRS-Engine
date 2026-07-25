import { request } from "./apiClient";

/**
 * These endpoints are REAL and already built per the backend readme:
 *   POST   /api/rooms
 *   GET    /api/rooms
 *   GET    /api/rooms/{id}
 *   PUT    /api/rooms/{id}
 *   DELETE /api/rooms/{id}
 *
 * Room shape: { id, roomNumber, roomType, pricePerNight, available }
 * Note: there is no date/hotelId field on Room yet per the readme — that arrives
 * with the Reservation module (currently "Planned").
 */

export async function listRooms() {
  return request("/rooms");
}

export async function getRoom(id) {
  return request(`/rooms/${id}`);
}

export async function createRoom({ roomNumber, roomType, pricePerNight, available }) {
  return request("/rooms", {
    method: "POST",
    body: JSON.stringify({ roomNumber, roomType, pricePerNight, available }),
  });
}

export async function updateRoom(id, { roomNumber, roomType, pricePerNight, available }) {
  return request(`/rooms/${id}`, {
    method: "PUT",
    body: JSON.stringify({ roomNumber, roomType, pricePerNight, available }),
  });
}

export async function deleteRoom(id) {
  return request(`/rooms/${id}`, { method: "DELETE" });
}