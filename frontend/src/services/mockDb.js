// Reservation is still MOCK — per the readme, the Reservation module is "Planned",
// not built on the backend yet. Once it exists, bookingService.js and paymentService.js
// are the only files that need to change (this file can be deleted).
//
// Reservations here reference a real room (fetched from roomService) by roomNumber/roomType,
// instead of the old made-up roomTypeId — so this now lines up with the actual Room entity.

// status: HELD | PAYMENT_PROCESSING | CONFIRMED | FAILED | RELEASED (client-side only for now)
export let reservations = [
  {
    id: "res-1001",
    roomId: 1,
    roomNumber: "101",
    roomType: "Deluxe",
    pricePerNight: 3500,
    checkInDate: "2026-08-02",
    checkOutDate: "2026-08-05",
    guestName: "Sahoo",
    status: "CONFIRMED",
    totalAmount: 10500,
    createdAt: "2026-07-15T10:22:00Z",
  },
];

let reservationSeq = 1002;
export function nextReservationId() {
  return `res-${reservationSeq++}`;
}

export function findReservation(id) {
  return reservations.find((r) => r.id === id);
}

export function upsertReservation(res) {
  const idx = reservations.findIndex((r) => r.id === res.id);
  if (idx >= 0) reservations[idx] = res;
  else reservations.unshift(res);
  return res;
}