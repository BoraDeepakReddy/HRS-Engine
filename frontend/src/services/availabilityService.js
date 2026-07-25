import { listRooms } from "./roomService";

/**
 * There is no dedicated /api/availability endpoint yet (Reservation module is
 * "Planned" per the readme). For now, "availability" just means: real rooms from
 * /api/rooms where available === true. Once the backend adds date-aware search,
 * replace the body of this function with a single request() call to that endpoint —
 * BookingPage.jsx won't need to change since it just consumes whatever this returns.
 */
export async function searchAvailability({ roomType } = {}) {
  const rooms = await listRooms();
  const availableRooms = rooms.filter((r) => r.available);
  if (!roomType) return availableRooms;
  return availableRooms.filter((r) => r.roomType.toLowerCase() === roomType.toLowerCase());
}