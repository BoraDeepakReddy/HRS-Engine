import { listHotels } from "./hotelService";
import { listRooms } from "./roomService";
import { reservations } from "./mockDb";

/**
 * Hotels and Rooms are real (pulled straight from the backend).
 * Reservations stay mock until that module exists.
 */
export async function loadAdminOverview() {
  const [hotels, rooms] = await Promise.all([listHotels(), listRooms()]);
  return {
    hotels,
    rooms,
    reservations: [...reservations],
  };
}