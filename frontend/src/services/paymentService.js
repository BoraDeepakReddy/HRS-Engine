import { ApiError } from "./apiClient";
import { getRoom, updateRoom } from "./roomService";
import { findReservation, upsertReservation } from "./mockDb";

/**
 * Payment module is "Planned" per the readme — mocked here the same way bookingService
 * mocks reservations. Mock rule: card number ending in an even digit succeeds, odd fails,
 * so you can build/test both the CONFIRMED and FAILED paths without a real gateway.
 *
 * On FAILED, the real room is released back to available: true — this is the
 * "payment failure handling" piece from the original Week 3 roadmap.
 */
export async function submitPayment({ reservationId, cardNumber }) {
  const reservation = findReservation(reservationId);
  if (!reservation) throw new ApiError("Reservation not found", 404);

  upsertReservation({ ...reservation, status: "PAYMENT_PROCESSING" });
  await new Promise((resolve) => setTimeout(resolve, 700));

  const lastDigit = Number(cardNumber?.replace(/\D/g, "").slice(-1) || "0");
  const success = lastDigit % 2 === 0;

  if (!success) {
    const room = await getRoom(reservation.roomId);
    if (room) await updateRoom(reservation.roomId, { ...room, available: true });
    const failed = { ...reservation, status: "FAILED" };
    upsertReservation(failed);
    throw new ApiError("Payment declined by mock gateway — room released", 402, failed);
  }

  const confirmed = { ...reservation, status: "CONFIRMED" };
  upsertReservation(confirmed);
  return confirmed;
}