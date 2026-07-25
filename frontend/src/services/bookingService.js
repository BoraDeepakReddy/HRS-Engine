import { ApiError } from "./apiClient";
import { getRoom, updateRoom } from "./roomService";
import { reservations, nextReservationId, findReservation, upsertReservation } from "./mockDb";

/**
 * Reservation module is "Planned" per the readme — there's no /api/bookings/hold or
 * /api/reservations yet. Until then, "holding" a room does something real where it
 * can: it flips the actual Room's `available` flag to false via the real PUT /api/rooms/{id}
 * endpoint, then tracks the booking itself as a mock Reservation client-side.
 *
 * When the backend adds POST /api/bookings/hold and GET /api/reservations, swap the
 * body of createHold/listReservations for request() calls and delete mockDb.js.
 */
export async function createHold({ roomId, checkInDate, checkOutDate, guestName }) {
  const room = await getRoom(roomId);
  if (!room) throw new ApiError("Room not found", 404);
  if (!room.available) throw new ApiError("Room is no longer available", 409);

  // mark the real room as unavailable so other users' searches reflect it immediately
  await updateRoom(roomId, { ...room, available: false });

  const nights = Math.max(
    1,
    Math.round((new Date(checkOutDate) - new Date(checkInDate)) / 86400000)
  );
  const reservation = {
    id: nextReservationId(),
    roomId,
    roomNumber: room.roomNumber,
    roomType: room.roomType,
    pricePerNight: room.pricePerNight,
    checkInDate,
    checkOutDate,
    guestName,
    status: "HELD",
    totalAmount: nights * room.pricePerNight,
    createdAt: new Date().toISOString(),
  };
  upsertReservation(reservation);
  return reservation;
}

export async function listReservations({ guestName } = {}) {
  const results = guestName
    ? reservations.filter((r) => r.guestName.toLowerCase() === guestName.toLowerCase())
    : reservations;
  return [...results].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function cancelReservation(id) {
  const existing = findReservation(id);
  if (!existing) throw new ApiError("Reservation not found", 404);
  if (["RELEASED", "FAILED"].includes(existing.status)) {
    throw new ApiError("Reservation is already cancelled", 400);
  }

  // release the real room back to the available pool
  const room = await getRoom(existing.roomId);
  if (room) await updateRoom(existing.roomId, { ...room, available: true });

  const updated = { ...existing, status: "RELEASED" };
  upsertReservation(updated);
  return updated;
}